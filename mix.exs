defmodule Pinegeist.MixProject do
  use Mix.Project

  def project do
    [
      app: :pinegeist,
      version: "0.1.0-alpha",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      aliases: aliases(),
      source_url: "https://github.com/TunkShif/pinegeist"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:jason, "~> 1.2"},
      {:phoenix_live_view, "~> 0.20.2"}
    ]
  end

  defp aliases do
    [
      "assets.build": ["cmd --cd assets bun run build"]
    ]
  end
end
