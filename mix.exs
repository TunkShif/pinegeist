defmodule Pinegeist.MixProject do
  use Mix.Project

  @version "0.1.1-alpha"
  @source_url "https://github.com/TunkShif/pinegeist"

  def project do
    [
      app: :pinegeist,
      version: @version,
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
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
      {:ex_doc, "~> 0.31", only: :dev, runtime: false}
    ]
  end

  defp aliases do
    [
      "assets.build": ["cmd --cd assets pnpm run build"]
    ]
  end

  defp docs do
    [main: "readme", extras: ["README.md"]]
  end
end
