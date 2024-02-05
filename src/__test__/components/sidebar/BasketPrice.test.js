import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import BasketPrice from "../../../components/sidebar/basket/BasketPrice";
import { basketState } from "../../../atom";

describe("BasketPrice Component Tests", () => {
  const mockBasket = [
    { id: "1", price: "10.00", quantity: 2 },
    { id: "2", price: "20.00", quantity: 1 },
  ];

  it("should render without crashing", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <BasketPrice />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("Total Price:")).toBeInTheDocument();
  });

  it("should correctly calculate the total price", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(basketState, mockBasket)}>
        <BrowserRouter>
          <BasketPrice />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("40.00")).toBeInTheDocument();
  });

  it("should render a checkout button", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <BasketPrice />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});
