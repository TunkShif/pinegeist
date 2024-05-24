export class LiveHelper {
  #viewHook
  #command

  constructor(viewHook) {
    this.#viewHook = viewHook
    this.#command = new Proxy(
      {},
      {
        get(_target, name) {
          return (params) =>
            viewHook.liveSocket.execJS(viewHook.el, JSON.stringify([[name, params]]))
        }
      }
    )
  }

  get js() {
    return this.#command
  }

  on(event, onEvent) {
    this.#viewHook.handleEvent(event, onEvent)
  }

  push(event, payload, onReply) {
    this.#viewHook.pushEvent(event, payload, onReply)
  }
}
