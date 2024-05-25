defmodule Pinegeist do
  @moduledoc """
  Documentation for `Pinegeist`. To get started, check the [Overview Guide](overview.html).
  """

  use Phoenix.Component

  @doc """
  Renders an Alpine component.

  [INSERT LVATTRDOCS]

  ## Examples

  A simple counter which has a `count` property lives in Alpine reactive data and is synchronized with the server side LiveView state.

  ```heex
  <.island id="counter-example">
    <:prop name="count" value={@count} />
    <div>
      count: <span x-text="$props.count"><%= @count %></span>
    </div>
  </.island>
  ```
  """
  @doc type: :component

  attr :id, :string, required: true, doc: "Unique identifier for the island component."

  slot :prop,
    doc:
      "Declare a reactive data in Alpine. The value will be synchronized with the server side LiveView state." do
    attr :name, :string,
      required: true,
      doc: "The property name of the reactive data. You can access it via `$props` Alpine magic."

    attr :value, :any,
      required: true,
      doc: "The value of the reactive data. It must be a JSON serializable value."
  end

  slot :inner_block,
    required: true,
    doc:
      "The content rendered inside the island. It will ignore LiveView DOM updates and should be managed by Alpine."

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
