import { render, screen, fireEvent } from "@testing-library/react";
import BasketList from "../../../components/sidebar/basket/BasketList";
import { RecoilRoot } from "recoil";
import { basketState } from "../../../atom"; // Basket state'i import edin
import { BrowserRouter } from "react-router-dom";

describe("BasketList Component Tests", () => {
  // Render Testi
  it("should render without crashing", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <BasketList />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("Your basket is currently empty.")).toBeInTheDocument();
  });

  it("should allow items to be added and removed from the basket", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) =>
          set(basketState, [{ id: "test-product", name: "Test Product", price: "10", quantity: 1 }])
        }
      >
        <BrowserRouter>
          <BasketList />
        </BrowserRouter>
      </RecoilRoot>
    );

    const addButton = screen.getByRole("button", { name: "Add" });
    const removeButton = screen.getByRole("button", { name: "Remove" });

    fireEvent.click(addButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
