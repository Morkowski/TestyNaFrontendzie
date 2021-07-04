import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";

const product = {
  id: "1",
  name: "RedBull",
  price: 101,
  quantity: 2,
};

describe("<ListElement />", () => {
  it("renders all component elements - (product name, price per product, quantity, add/remove quantity buttons, summary product price)", () => {
    render(<ListElement product={product} />);

    const productNameElement = screen.getByText(product.name);
    expect(productNameElement).toBeDefined();

    const pricePerProduct = screen.getByText(`1.01zł`);
    expect(pricePerProduct).toBeDefined();

    const decreaseQuantityElement = screen.getByText("-1");
    expect(decreaseQuantityElement).toBeDefined();

    const quantityElement = screen.getByText("2");
    expect(quantityElement).toBeDefined();

    const increaseQuantityElement = screen.getByText("+1");
    expect(increaseQuantityElement).toBeDefined();

    const summaryProductPrice = screen.getByText("2.02zł");
    expect(summaryProductPrice).toBeDefined();
  });

  it("increases summary product price after increasing quantity", () => {
    const { rerender } = render(<ListElement product={product} />);

    const summaryProductPrice = screen.getByText("2.02zł");
    expect(summaryProductPrice).toBeDefined();

    const productWithIncreasedQuantity = {
      ...product,
      quantity: 3,
    };

    rerender(<ListElement product={productWithIncreasedQuantity} />);

    const summaryProductPriceAfterIncreasing = screen.getByText("3.03zł");
    expect(summaryProductPriceAfterIncreasing).toBeDefined();
  });

  it("blocks decreasing quantity for zero", () => {
    const onRemoveMock = jest.fn();
    render(
      <ListElement
        product={{ ...product, quantity: 0 }}
        onRemove={onRemoveMock}
      />
    );
    const decreaseButton = screen.getByText("-1");
    user.click(decreaseButton);

    expect(onRemoveMock).not.toBeCalled();
    expect(decreaseButton).toBeDisabled();
  });
});
