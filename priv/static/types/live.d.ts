type Dict = Record<string, unknown>;
interface ViewHookInstance {
    el: HTMLElement;
    handleEvent<T extends Dict>(event: string, onEvent: (payload: T) => void): () => void;
    pushEvent<T extends Dict, R extends Dict>(event: string, payload: T, onReply?: (reply: R) => void): void;
}
export declare class LiveHelper {
    #private;
    constructor(viewHook: ViewHookInstance);
    on<T extends Dict = Dict>(event: string, onEvent: (payload: T) => void): void;
    push<T extends Dict = Dict, R extends Dict = Dict>(event: string, payload: T, onReply?: (reply: R) => void): void;
    exec(): void;
}
export declare const Hook: {
    mounted(this: ViewHookInstance): void;
};
export {};
