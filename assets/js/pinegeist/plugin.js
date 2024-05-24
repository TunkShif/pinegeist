import { markRaw, noop } from "./utils"

// an object that always return a noop function when accessed
// the lv helper is initialized only after LiveView has mounted
// returns a noop object when LiveView is not ready
const dummy = new Proxy(
  {},
  {
    get() {
      return noop
    }
  }
)

/**
 * @type {import("alpinejs").PluginCallback}
 */
export const plugin = (Alpine) => {
  Alpine.directive("pinegeist", (el) => {
    Alpine.bind(el, {
      "x-data"() {
        return {
          __pinegeist_props: {},
          __pinegeist_live_helper: markRaw({ value: dummy })
        }
      }
    })
  })

  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    Alpine.$data(el).__pinegeist_live_helper.value.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })

  Alpine.magic("props", (el) => Alpine.$data(el).__pinegeist_props)
  Alpine.magic("live", (el) => Alpine.$data(el).__pinegeist_live_helper.value)
}
