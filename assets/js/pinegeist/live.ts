import type { LiveSocket } from "phoenix_live_view"
import { encode, type CommandMap } from "./command"

type Dict = Record<string, unknown>

interface ViewHookInstance {
  el: HTMLElement
  liveSocket: LiveSocket
  handleEvent<T extends Dict>(event: string, onEvent: (payload: T) => void): () => void
  pushEvent<T extends Dict, R extends Dict>(
    event: string,
    payload: T,
    onReply?: (reply: R) => void
  ): void
}

interface ViewHook {
  mounted(this: ViewHookInstance): void
}

const markRaw = <T>(value: T) => {
  if (Object.isExtensible(value)) {
    Object.defineProperty(value, "__v_skip", { configurable: true, enumerable: false, value: true })
  }
  return value
}

export class LiveHelper {
  #viewHook: ViewHookInstance

  constructor(viewHook: ViewHookInstance) {
    this.#viewHook = viewHook
  }

  on<T extends Dict = Dict>(event: string, onEvent: (payload: T) => void) {
    this.#viewHook.handleEvent(event, onEvent)
  }

  push<T extends Dict = Dict, R extends Dict = Dict>(
    event: string,
    payload: T,
    onReply?: (reply: R) => void
  ) {
    this.#viewHook.pushEvent(event, payload, onReply)
  }

  exec<TName extends keyof CommandMap>(el: HTMLElement, name: TName, params: CommandMap[TName]) {
    this.#viewHook.liveSocket.execJS(el, encode(name, params))
  }
}

export const Hook = {
  mounted() {
    this.el._lv_helper = markRaw(new LiveHelper(this))
  }
} satisfies ViewHook
