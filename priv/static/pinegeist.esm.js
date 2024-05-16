// js/pinegeist/command.ts
var encode = (name, params) => JSON.stringify([[name, params]]);
var createCommands = (el, lv) => {
  let memo;
  if (!memo) {
    memo = new Proxy(
      {},
      {
        get(_target, name) {
          return (params = {}) => lv.exec(el, name, params);
        }
      }
    );
  }
  return memo;
};

// js/pinegeist/live.ts
var markRaw = (value) => {
  if (Object.isExtensible(value)) {
    Object.defineProperty(value, "__v_skip", { configurable: true, enumerable: false, value: true });
  }
  return value;
};
var LiveHelper = class {
  #viewHook;
  constructor(viewHook) {
    this.#viewHook = viewHook;
  }
  on(event, onEvent) {
    this.#viewHook.handleEvent(event, onEvent);
  }
  push(event, payload, onReply) {
    this.#viewHook.pushEvent(event, payload, onReply);
  }
  exec(el, name, params) {
    this.#viewHook.liveSocket.execJS(el, encode(name, params));
  }
};
var Hook = {
  mounted() {
    this.el._lv_helper = markRaw(new LiveHelper(this));
  }
};

// js/pinegeist/plugin.ts
var noop = () => {
};
var uninitialized = new Proxy(
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
          get _lv_helper() {
            return this.$el._lv_helper ?? uninitialized;
          }
        };
      }
    });
  });
  Alpine.magic("live", (el) => Alpine.$data(el)._lv_helper);
  Alpine.magic("js", (el) => {
    const lv = Alpine.$data(el)._lv_helper;
    return lv === uninitialized ? lv : createCommands(el, lv);
  });
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const lv = Alpine.$data(el)._lv_helper;
    console.log(lv);
    lv.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } });
    });
  });
};
export {
  Hook,
  plugin
};
//# sourceMappingURL=pinegeist.esm.js.map
