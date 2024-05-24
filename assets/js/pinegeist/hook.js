import { LiveHelper } from "./live"
import { markRaw } from "./utils"

/**
 * @param {import("alpinejs").Alpine} Alpine
 */
export const createHooks = (Alpine) => ({
  Prop: {
    mounted() {
      this.update()
    },
    updated() {
      this.update()
    },
    get name() {
      return this.el.dataset.name
    },
    get value() {
      return JSON.parse(this.el.innerText)
    },
    update() {
      Alpine.$data(this.el).__pinegeist_props[this.name] = this.value
    }
  },
  Render: {
    mounted() {
      Alpine.$data(this.el).__pinegeist_live_helper = markRaw({ value: new LiveHelper(this) })
    }
  }
})
