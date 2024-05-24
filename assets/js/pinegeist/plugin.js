import { markRaw } from "./utils"

/**
 * @type {import("alpinejs").PluginCallback}
 */
export const plugin = (Alpine) => {
  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    Alpine.$data(el).__pinegeist_live_helper.value.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })

  Alpine.directive("pinegeist", (el) => {
    const component = Alpine.$data(el)
    component.__pinegeist_props = {}
    component.__pinegeist_live_helper = markRaw({ value: el.__live_helper })
  }).before("live-on")

  Alpine.magic("props", (el) => Alpine.$data(el).__pinegeist_props)
  Alpine.magic("live", (el) => Alpine.$data(el).__pinegeist_live_helper.value)
}
