import { render, screen, fireEvent } from "@testing-library/react";
import ProductListItem from "./ProductListItem";

describe("ProductListItem", () => {
  test("Pick Function renders correctly", () => {
    const pickHandler = jest.fn();
    const product = {
      name: "test",
      sku: "123",
      qty_total: 1,
      qty_picked: 0,
      image: "",
    };

    render(
      <table>
        <tbody>
          <ProductListItem
            type="unpicked"
            onPick={pickHandler}
            product={product}
          />
        </tbody>
      </table>
    );

    const pickButton = screen.getByRole("button", { name: "Pick" });

    fireEvent.click(pickButton);

    expect(pickHandler).toHaveBeenCalledTimes(1);
  });
});
