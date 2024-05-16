# Pinegeist

Pinegeist provides [Alpine](https://alpinejs.dev/) integration for [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/welcome.html).
It took inspiration from [Astro Islands](https://docs.astro.build/en/concepts/islands/).
Your client-side interactive Alpine component lives inside an isolated "island" that won't be affected by LiveView updates.
And pinegeist provides helpers for island component to communicate with LiveView via events.

## Installation

The package can be installed by adding `pinegeist` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:pinegeist, "~> 0.1.0"}
  ]
end
```