var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/pinegeist/index.js
var pinegeist_exports = {};
__export(pinegeist_exports, {
  createHooks: () => createHooks,
  plugin: () => plugin
});
module.exports = __toCommonJS(pinegeist_exports);

// js/pinegeist/live.js
var LiveHelper = class {
  #viewHook;
  #command;
  constructor(viewHook) {
    this.#viewHook = viewHook;
    this.#command = new Proxy(
      {},
      {
        get(_target, name) {
          return (params) => viewHook.liveSocket.execJS(viewHook.el, JSON.stringy([[name, params]]));
        }
      }
    );
  }
  get js() {
    return this.#command;
  }
  on(event, onEvent) {
    this.#viewHook.handleEvent(event, onEvent);
  }
  push(event, payload, onReply) {
    this.#viewHook.pushEvent(event, payload, onReply);
  }
};

// js/pinegeist/utils.js
var noop = () => {
};
var markRaw = (value) => {
  if (Object.isExtensible(value)) {
    Object.defineProperty(value, "__v_skip", { configurable: true, enumerable: false, value: true });
  }
  return value;
};

// js/pinegeist/hook.js
var createHooks = (Alpine) => ({
  Prop: {
    mounted() {
      this.update();
    },
    updated() {
      this.update();
    },
    get name() {
      return this.el.dataset.name;
    },
    get value() {
      return JSON.parse(this.el.innerText);
    },
    update() {
      Alpine.$data(this.el).__pinegeist_props[this.name] = this.value;
    }
  },
  Render: {
    mounted() {
      Alpine.$data(this.el).__pinegeist_live_helper = markRaw({ value: new LiveHelper(this) });
    }
  }
});

// js/pinegeist/plugin.js
var dummy = new Proxy(
  {},
  {
    get() {
      return noop;
    }
  }
);
var plugin = (Alpine) => {
  Alpine.directive("pinegeist", (el) => {
    Alpine.bind(el, {
      "x-data"() {
        return {
          __pinegeist_props: {},
          __pinegeist_live_helper: markRaw({ value: dummy })
        };
      }
    });
  });
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    Alpine.$data(el).__pinegeist_live_helper.value.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } });
    });
  });
  Alpine.magic("props", (el) => Alpine.$data(el).__pinegeist_props);
  Alpine.magic("live", (el) => Alpine.$data(el).__pinegeist_live_helper.value);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createHooks,
  plugin
});
//# sourceMappingURL=index.cjs.map