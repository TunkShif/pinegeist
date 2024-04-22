import type { LiveSocket } from "phoenix_live_view";
import { type CommandMap } from "./command";
type Dict = Record<string, unknown>;
interface ViewHookInstance {
    el: HTMLElement;
    liveSocket: LiveSocket;
    handleEvent<T extends Dict>(event: string, onEvent: (payload: T) => void): () => void;
    pushEvent<T extends Dict, R extends Dict>(event: string, payload: T, onReply?: (reply: R) => void): void;
}
export declare class LiveHelper {
    #private;
    constructor(viewHook: ViewHookInstance);
    on<T extends Dict = Dict>(event: string, onEvent: (payload: T) => void): void;
    push<T extends Dict = Dict, R extends Dict = Dict>(event: string, payload: T, onReply?: (reply: R) => void): void;
    exec<TName extends keyof CommandMap>(el: HTMLElement, name: TName, params: CommandMap[TName]): void;
}
export declare const Hook: {
    mounted(this: ViewHookInstance): void;
};
export {};
