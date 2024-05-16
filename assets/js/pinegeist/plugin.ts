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

const getLiveHelper = (el: Element) => {
  return el.closest<HTMLElement>("pinegeist-island")?._lv_helper ?? uninitialized
}

export const plugin: PluginCallback = (Alpine) => {
  Alpine.magic("live", (el) => getLiveHelper(el))

  Alpine.magic("js", (el) => {
    const lv = getLiveHelper(el)
    return lv === uninitialized ? lv : createCommands(el, lv)
  })

  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const lv = getLiveHelper(el)
    lv.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })
}
