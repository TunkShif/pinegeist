defmodule Pinegeist do
  @moduledoc """
  Documentation for `Pinegeist`.
  """

  use Phoenix.Component

  attr :id, :string, required: true

  slot :prop do
    attr :name, :string, required: true
    attr :value, :any, required: true
  end

  slot :inner_block, required: true

  def island(assigns) do
    ~H"""
    <pinegeist-island x-data x-pinegeist style="display: contents;">
      <pinegeist-props style="display: none;">
        <script
          :for={prop <- @prop}
          id={"p-#{@id}:#{prop.name}"}
          phx-hook="Pinegeist"
          type="application/json"
          data-name={prop.name}
          data-prop
        >
          <%= Jason.encode!(prop.value) %>
        </script>
      </pinegeist-props>

      <div
        id={"p-#{@id}"}
        phx-hook="Pinegeist"
        phx-update="ignore"
        style="display: contents;"
        data-render
      >
        <%= render_slot(@inner_block) %>
      </div>
    </pinegeist-island>
    """
  end
end
