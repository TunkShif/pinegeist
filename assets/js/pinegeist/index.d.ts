import type { Alpine, PluginCallback } from "alpinejs"

declare const plugin: PluginCallback
declare function createHooks(Alpine: Alpine): Record<string, unknown>
