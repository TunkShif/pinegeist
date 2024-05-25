# Overview

Pinegeist offers seamless integration of [Alpine.js](https://alpinejs.dev/) with [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/welcome.html), enhancing the client-side interactivity of LiveView applications.

Typically, the integration is achieved by tapping into LiveView's DOM patching lifecycle to reconcile Alpine changes with LiveView updates. However, Pinegeist takes a different approach by rendering Alpine component inside an "isolated island", which ignores any LiveView DOM updates and is completely managed by Alpine.

This allows you to use Alpine to implement interactive UI components with complex client-side states, rendering theme inside an island that won't be affected by LiveView. Additionally, Pinegeist provides utilities for Alpine components to communicate with LiveView, enabling interaction with server-side state when needed.

# Installation

The package can be installed by adding pinegeist to your list of dependencies in mix.exs:

```elixir
def deps do
  [
    {:pinegeist, "~> 0.2.1"}
  ]
end
```
