import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import ProductListItem from "../../../components/product/ProductListItem";

const mockItem = {
  id: 1,
  name: "Bentley Focus",
  price: "51.00",
  image: "https://loremflickr.com/640/480/food",
  description: "Test Description",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));

describe("ProductListItem Component", () => {
  const mockNavigate = jest.fn();
  const setBasket = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.localStorage = { setItem: jest.fn() };
    jest.requireMock("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    useRecoilState.mockReturnValue([[], setBasket]);
  });

  it("renders correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText("Bentley Focus")).toBeInTheDocument();
    expect(screen.getByText("$51.00")).toBeInTheDocument();
  });

  it("navigates to product detail on click", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("Bentley Focus")); // `getByText` kullanın, çünkü `img`'de `alt` metni yok.
    expect(mockNavigate).toHaveBeenCalledWith("/product");
  });

  it("disables button if item is in basket", () => {
    useRecoilState.mockImplementation(() => [[mockItem], jest.fn()]);

    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProductListItem item={mockItem} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const addButton = screen.getByText("Added to Basket");
    expect(addButton).toBeDisabled();
  });
});
