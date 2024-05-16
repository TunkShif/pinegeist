import type { LiveHelper } from "./live";
type TransitionClasses = string | [transition: string[], start: string[], end: string[]];
export interface CommandMap {
    add_class: {
        names: string;
        to?: string;
        transition?: TransitionClasses;
        time?: number;
    };
    exec: {
        attr: string;
        to?: string;
    };
    focus: {
        to: string;
    };
    focus_first: {
        to: string;
    };
    hide: {
        to: string;
        transition?: TransitionClasses;
        time?: number;
    };
    navigate: {
        href: string;
        replace?: boolean;
    };
    patch: {
        href: string;
        replace?: boolean;
    };
    pop_focus: {
        [x: string]: never;
    };
    push: {
        event: string;
        value?: Record<string, unknown>;
        loading?: string;
        page_loading?: boolean;
    };
    push_focus: {
        to?: string;
    };
    remove_attr: {
        attr: string;
        to?: string;
    };
    remove_class: {
        names: string;
        to?: string;
        transition?: TransitionClasses;
        time?: number;
    };
    set_attr: {
        attr: [name: string, value: string];
        to?: string;
    };
    show: {
        to?: string;
        transition?: TransitionClasses;
        time?: number;
        display?: string;
    };
    toggle: {
        to?: string;
        in?: TransitionClasses;
        out?: TransitionClasses;
        time?: number;
        display?: string;
    };
    toggle_attr: {
        attr: [name: string, val1: string, val2?: string];
        to?: string;
    };
    toggle_class: {
        names: string;
        to?: string;
        transition?: TransitionClasses;
        time?: number;
    };
    transition: {
        transition: TransitionClasses;
        to?: string;
        time?: number;
    };
}
export declare const encode: (name: string, params: Record<string, unknown>) => string;
export declare const createCommands: (el: HTMLElement, lv: LiveHelper) => Record<string, (...args: unknown[]) => void>;
export {};
