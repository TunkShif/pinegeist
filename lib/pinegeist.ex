defmodule Pinegeist do
  @moduledoc """
  Documentation for `Pinegeist`.
  """

  use Phoenix.Component

  defp unique_id, do: "p-" <> Integer.to_string(36 ** 3 + :rand.uniform(36 ** 4), 36)

  attr :rest, :global, default: %{"x-data" => true}
  slot :inner_block, required: true

  def island(assigns) do
    ~H"""
    <pinegeist-island
      id={unique_id()}
      phx-update="ignore"
      phx-hook="Pinegeist"
      style="display: contents;"
      x-pinegeist
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </pinegeist-island>
    """
  end
end
