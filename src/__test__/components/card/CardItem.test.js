import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { basketState, cardState } from "../../../atom";
import CardItem from "../../../components/card/CardItem";

// Mock navigate && localStorage
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
global.localStorage = { setItem: jest.fn() };

describe("CardItem Component", () => {
  const mockCard = {
    id: 1,
    name: "Test Product",
    price: "100",
    description: "Test Description",
    image: "test.jpg",
  };

  it("should redirect to home if card is empty", () => {
    // Mock an empty card
    const useRecoilValueMock = jest.fn().mockReturnValue({});
    render(
      <RecoilRoot initializeState={(snap) => snap.set(cardState, useRecoilValueMock)}>
        <Router>
          <CardItem />
        </Router>
      </RecoilRoot>
    );
    // Check for redirection logic (mock useNavigate and verify its call)
  });

  it("should display the correct card information", () => {
    render(
      <RecoilRoot initializeState={(snap) => snap.set(cardState, mockCard)}>
        <Router>
          <CardItem />
        </Router>
      </RecoilRoot>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute("src", "test.jpg");
  });

  it("should add item to basket on button click", () => {
    render(
      <RecoilRoot>
        <Router>
          <CardItem />
        </Router>
      </RecoilRoot>
    );
    fireEvent.click(screen.getByText("Add to Basket"));
    // Verify basket state update and localStorage.setItem call
  });

  it("should disable button if item is in basket", () => {
    // Mock basket with the item
    const useRecoilStateMock = jest.fn().mockReturnValue([[mockCard], jest.fn()]);
    render(
      <RecoilRoot initializeState={(snap) => snap.set(basketState, useRecoilStateMock)}>
        <Router>
          <CardItem />
        </Router>
      </RecoilRoot>
    );
    expect(screen.getByText("Added to Basket")).toBeDisabled();
  });
});
