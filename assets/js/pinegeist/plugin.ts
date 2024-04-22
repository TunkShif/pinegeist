import type { PluginCallback } from "alpinejs"

// an object that always return a noop function when accessed
const noop = () => {}
const uninitialized = new Proxy(
  {},
  {
    get() {
      return noop
    }
  }
)

export const plugin: PluginCallback = (Alpine) => {
  Alpine.magic("live", (el) => {
    // the lv helper is initialized only after LiveView has mounted
    // returns a noop object when LiveView is not ready
    const root = Alpine.closestRoot(el)
    return root?._lv_helper ?? uninitialized
  })

  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const root = Alpine.closestRoot(el)
    if (!root || !root._lv_helper) return
    root._lv_helper.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })
}
