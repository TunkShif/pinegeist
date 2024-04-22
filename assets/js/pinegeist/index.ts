import type { LiveHelper } from "./live"

declare global {
  interface HTMLElement {
    _lv_helper?: LiveHelper
  }
}

export { Hook } from "./live"
export { plugin } from "./plugin"
