"use strict";
var Pinegeist = (() => {
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

  // js/pinegeist/index.ts
  var pinegeist_exports = {};
  __export(pinegeist_exports, {
    Hook: () => Hook,
    plugin: () => plugin
  });

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
  return __toCommonJS(pinegeist_exports);
})();
