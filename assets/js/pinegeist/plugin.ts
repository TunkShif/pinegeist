import type { AlpineComponent, PluginCallback } from "alpinejs"
import { createCommands } from "./command"
import type { LiveHelper } from "./live"

type Component = {
  _lv_helper: LiveHelper
}

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
  Alpine.directive("pinegeist", (el) => {
    Alpine.bind(el, {
      "x-data"() {
        return {
          get _lv_helper(): LiveHelper {
            return this.$el._lv_helper ?? uninitialized
          }
        } as AlpineComponent<Component>
      }
    })
  })

  Alpine.magic("live", (el) => (Alpine.$data(el) as Component)._lv_helper)

  Alpine.magic("js", (el) => {
    const lv = (Alpine.$data(el) as Component)._lv_helper
    return lv === uninitialized ? lv : createCommands(el, lv)
  })

  Alpine.directive("live-on", (el, { value, expression }, { evaluate }) => {
    const lv = (Alpine.$data(el) as Component)._lv_helper
    console.log(lv)
    lv.on(value, (payload) => {
      evaluate(expression, { scope: { $payload: payload, params: [payload] } })
    })
  })
}
