import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ProductListItem from "../../../components/product/ProductListItem";
import { BrowserRouter } from "react-router-dom";
import { basketState } from "../../../atom";

const mockItem = {
  id: "1",
  name: "Test Product",
  price: "100",
  image: "test-image.jpg",
};

describe("ProductListItem Component Tests", () => {
  it("should render the component correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  });

  it("should handle button click to add item to the basket", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const addButton = screen.getByRole("button", { name: "Add to Basket" });
    fireEvent.click(addButton);
  });

  it("should navigate to product detail on figure click", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const figure = screen.getByRole("figure");
    fireEvent.click(figure);
  });

  it("should show 'Added to Basket' if the item is already in the basket", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(basketState, [{ ...mockItem, quantity: 1 }])}>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText("Added to Basket")).toBeInTheDocument();
  });
});
