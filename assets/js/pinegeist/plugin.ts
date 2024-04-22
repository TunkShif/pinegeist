import type { PluginCallback } from "alpinejs"
import { createCommands } from "./command"
import type { LiveHelper } from "./live"

// an object that always return a noop function when accessed
// the lv helper is initialized only after LiveView has mounted
// returns a noop object when LiveView is not ready
const noop = () => {}
const uninitialized = new Proxy(
  {},
  {
    get() {
      return noop
    }
  }
) as LiveHelper

export const plugin: PluginCallback = (Alpine) => {
  Alpine.magic("live", (el) => {
    const root = Alpine.closestRoot(el)
    return root?._lv_helper ?? uninitialized
  })

  Alpine.magic("js", (el) => {
    const root = Alpine.closestRoot(el)
    const lv = root?._lv_helper ?? uninitialized
    return lv === uninitialized ? lv : createCommands(el, lv)
  })

  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const root = Alpine.closestRoot(el)
    if (!root || !root._lv_helper) return
    root._lv_helper.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })
}
