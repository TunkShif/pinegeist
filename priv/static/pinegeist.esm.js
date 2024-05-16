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
    this.el._lv_helper = new LiveHelper(this);
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
var getLiveHelper = (el) => {
  return el.closest("pinegeist-island")?._lv_helper ?? uninitialized;
};
var plugin = (Alpine) => {
  Alpine.magic("live", (el) => getLiveHelper(el));
  Alpine.magic("js", (el) => {
    const lv = getLiveHelper(el);
    return lv === uninitialized ? lv : createCommands(el, lv);
  });
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const lv = getLiveHelper(el);
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
