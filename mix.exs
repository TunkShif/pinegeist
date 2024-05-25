defmodule Pinegeist.MixProject do
  use Mix.Project

  @version "0.2.1-alpha"
  @source_url "https://github.com/TunkShif/pinegeist"

  def project do
    [
      app: :pinegeist,
      version: @version,
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      description: description(),
      package: package(),
      deps: deps(),
      aliases: aliases(),
      source_url: @source_url,
      homepage_url: @source_url,
      docs: docs()
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
      {:phoenix_live_view, "~> 0.20.2"},
      {:makeup_eex, "~> 0.1.0", only: :dev, runtime: false},
      {:ex_doc, "~> 0.31", only: :dev, runtime: false}
    ]
  end

  defp description do
    "Alpine integration for Phoenix LiveView."
  end

  defp package do
    [
      name: "pinegeist",
      licenses: ["MIT"],
      links: %{"GitHub" => @source_url},
      files: ~w(assets/js lib priv LICENSE mix.exs package.json README.md .formatter.exs)
    ]
  end

  defp aliases do
    [
      "assets.setup": ["cmd --cd assets pnpm install"],
      "assets.build": ["cmd --cd assets pnpm run build"]
    ]
  end

  defp docs do
    [
      main: "overview",
      extras: extras(),
      groups_for_docs: [
        Components: &(&1[:type] == :component)
      ]
    ]
  end

  defp extras do
    [
      "guides/overview.md",
      "guides/alpine-integration.md"
    ]
  end
end
