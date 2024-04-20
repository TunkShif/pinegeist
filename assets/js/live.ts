type Dict = Record<string, unknown>

interface ViewHookInstance {
  el: HTMLElement
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

  exec() {
    // TODO: implement this later
  }
}

export const Hook = {
  mounted() {
    this.el._lv_helper = new LiveHelper(this)
  }
} satisfies ViewHook
