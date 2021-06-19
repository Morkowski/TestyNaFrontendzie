import userEvent from "@testing-library/user-event";
import { getTestStore, render, screen } from "test-utils";
import React from "react";

import { addDiscount, CartItem } from "../../../state/cart";
import { Currency } from "../../../types/Currency";
import CartList from "../CartList";

const product: CartItem = {
  id: "123",
  brand: "Szkoła testów",
  name: {
    pl: "Kurs Testy na Frontendzie",
    en: "Frontend tests",
  },
  price: [{ currency: Currency.USD, price: 15000 }],
  quantity: 1,
};

describe("<CartList/>", () => {
  it("displays empty cart message when cart is empty", () => {
    render(<CartList />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("display contents of the cart when it is NOT empty", () => {
    const store = getTestStore({
      cart: { items: [product], appliedDiscount: null },
    });
    render(<CartList />, { store });

    expect(
      screen.getByText("Frontend tests - Szkoła testów")
    ).toBeInTheDocument();
    expect(screen.getByTestId("summary-price")).toHaveTextContent("150 $");
  });
});
