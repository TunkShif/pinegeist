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
export {
  createHooks,
  plugin
};
//# sourceMappingURL=index.js.map