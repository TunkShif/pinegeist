defmodule Pinegeist do
  @moduledoc """
  Documentation for `Pinegeist`.
  """

  use Phoenix.Component

  defp unique_id, do: "p-" <> Integer.to_string(36 ** 3 + :rand.uniform(36 ** 4), 36)

  slot :prop do
    attr :name, :string, required: true
    attr :value, :any, required: true
  end

  slot :inner_block, required: true

  def island(assigns) do
    assigns = assign(assigns, id: unique_id())

    ~H"""
    <pinegeist-island x-pinegeist style="display: contents;">
      <pinegeist-props style="display: none;">
        <script
          :for={prop <- @prop}
          id={"#{@id}:#{prop.name}"}
          phx-hook="Pinegeist.Prop"
          type="application/json"
          data-name={prop.name}
        >
          <%= Jason.encode!(prop.value) %>
        </script>
      </pinegeist-props>

      <div id={@id} phx-hook="Pinegeist.Render" style="display: contents;">
        <%= render_slot(@inner_block) %>
      </div>
    </pinegeist-island>
    """
  end
end
