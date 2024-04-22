// js/pinegeist/command.ts
var encode = (name, params) => JSON.stringify([[name, params]]);
var createCommands = (el, lv) => new Proxy(
  {},
  {
    get(_target, name) {
      return (params = {}) => lv.exec(el, name, params);
    }
  }
);

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
var plugin = (Alpine) => {
  Alpine.magic("live", (el) => {
    const root = Alpine.closestRoot(el);
    return root?._lv_helper ?? uninitialized;
  });
  Alpine.magic("js", (el) => {
    const root = Alpine.closestRoot(el);
    const lv = root?._lv_helper ?? uninitialized;
    return lv === uninitialized ? lv : createCommands(el, lv);
  });
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const root = Alpine.closestRoot(el);
    if (!root || !root._lv_helper)
      return;
    root._lv_helper.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } });
    });
  });
};
export {
  Hook,
  plugin
};
//# sourceMappingURL=pinegeist.esm.js.map
