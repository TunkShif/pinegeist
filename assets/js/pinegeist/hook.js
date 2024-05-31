import { LiveHelper } from "./live"

let started = false

/**
 * @param {import("alpinejs").Alpine} Alpine
 */
export const createPinegeistHook = (Alpine) => ({
  mounted() {
    this.isProp = this.el.dataset.prop != null

    const root = this.el.closest("pinegeist-island")
    if (!root.__live_helper) {
      root.__live_helper = new LiveHelper(this)
    }

    if (!started) {
      Alpine.start()
      started = true
    }

    if (this.isProp) {
      this.propName = this.el.dataset.name
      this.updatePropValue()
    }
  },
  updated() {
    if (!this.isProp) return
    this.updatePropValue()
  },
  getPropValue() {
    return JSON.parse(this.el.innerText)
  },
  updatePropValue() {
    Alpine.$data(this.el).__pinegeist_props[this.propName] = this.getPropValue()
  }
})
