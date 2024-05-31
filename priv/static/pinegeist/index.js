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
          return (params) => viewHook.liveSocket.execJS(viewHook.el, JSON.stringify([[name, params]]));
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

// js/pinegeist/hook.js
var started = false;
var createPinegeistHook = (Alpine) => ({
  mounted() {
    this.isProp = this.el.dataset.prop != null;
    const root = this.el.closest("pinegeist-island");
    if (!root.__live_helper) {
      root.__live_helper = new LiveHelper(this);
    }
    if (!started) {
      Alpine.start();
      started = true;
    }
    if (this.isProp) {
      this.propName = this.el.dataset.name;
      this.updatePropValue();
    }
  },
  updated() {
    if (!this.isProp)
      return;
    this.updatePropValue();
  },
  getPropValue() {
    return JSON.parse(this.el.innerText);
  },
  updatePropValue() {
    Alpine.$data(this.el).__pinegeist_props[this.propName] = this.getPropValue();
  }
});

// js/pinegeist/utils.js
var markRaw = (value) => {
  if (Object.isExtensible(value)) {
    Object.defineProperty(value, "__v_skip", { configurable: true, enumerable: false, value: true });
  }
  return value;
};

// js/pinegeist/plugin.js
var pinegeist = (Alpine) => {
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    Alpine.$data(el).__pinegeist_live_helper.value.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } });
    });
  });
  Alpine.directive("pinegeist", (el) => {
    const component = Alpine.$data(el);
    component.__pinegeist_props = {};
    component.__pinegeist_live_helper = markRaw({ value: el.__live_helper });
  }).before("live-on");
  Alpine.magic("props", (el) => Alpine.$data(el).__pinegeist_props);
  Alpine.magic("live", (el) => Alpine.$data(el).__pinegeist_live_helper.value);
};
export {
  createPinegeistHook,
  pinegeist
};
//# sourceMappingURL=index.js.map