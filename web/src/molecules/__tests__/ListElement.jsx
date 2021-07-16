import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";

const product = {
  id: 1,
  name: "Christmas socks",
  price: 5000,
  quantity: 2,
};

const onAddMock = jest.fn();
const onRemoveMock = jest.fn();

describe("<ListElement />", () => {
  it("should render name, price and quantity", () => {
    render(
      <ListElement
        product={product}
        onRemove={onRemoveMock}
        onAdd={onAddMock}
      />
    );

    const productName = screen.getByText(product.name);
    const productPrice = screen.getAllByText("50zł");
    const totalPrice = screen.getAllByText("100zł");
    const productQuantity = screen.getByText(product.quantity);
    const productId = screen.queryByText(product.id);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toHaveLength(1);
    expect(totalPrice).toHaveLength(1);
    expect(productQuantity).toBeInTheDocument();
    expect(productId).not.toBeInTheDocument();
  });
  it("should successfully add and remove an item in cart", () => {
    render(
      <ListElement
        product={product}
        onRemove={onRemoveMock}
        onAdd={onAddMock}
      />
    );
    const addButton = screen.getByRole("button", { name: "+1" });
    const removeButton = screen.getByRole("button", { name: "-1" });

    user.click(addButton);
    expect(onAddMock).toBeCalled();
    expect(onAddMock).toBeCalledTimes(1);

    user.click(removeButton);
    expect(onAddMock).toBeCalled();
    expect(onAddMock).toBeCalledTimes(1);
  });

  it("should display the correct price after changing the number of items in the cart", () => {
    const { rerender } = render(
      <ListElement
        product={product}
        onRemove={onRemoveMock}
        onAdd={onAddMock}
      />
    );
    rerender(
      <ListElement
        product={{ ...product, quantity: 1 }}
        onRemove={onRemoveMock}
        onAdd={onAddMock}
      />
    );
    const price = screen.getAllByText("50zł");

    expect(price).toHaveLength(2);

    rerender(
      <ListElement
        product={{ ...product, quantity: 3 }}
        onRemove={onRemoveMock}
        onAdd={onAddMock}
      />
    );
    const productPrice = screen.getAllByText("50zł");
    const totalPrice = screen.getAllByText("150zł");

    expect(productPrice).toHaveLength(1);
    expect(totalPrice).toHaveLength(1);
  });

});
