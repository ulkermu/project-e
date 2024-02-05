import { render, screen } from "@testing-library/react";
import ProductList from "../../components/product/ProductList";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Filter from "../../components/sidebar/filter/Filter";
import Basket from "../../components/sidebar/basket/Basket";
import Product from "../../pages/Product";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import SidebarButtons from "../../components/sidebar/SidebarButtons";

jest.mock("../../components/layout/Header");
jest.mock("../../components/layout/Footer");
jest.mock("../../components/product/ProductList");
jest.mock("../../components/sidebar/filter/Filter");
jest.mock("../../components/sidebar/basket/Basket");
jest.mock("../../components/sidebar/SidebarButtons");

describe("Product Component Tests", () => {
  beforeEach(() => {
    Header.mockImplementation(() => <div>HeaderMock</div>);
    Footer.mockImplementation(() => <div>FooterMock</div>);
    Filter.mockImplementation(() => <div>FilterMock</div>);
    Basket.mockImplementation(() => <div>BasketMock</div>);
    ProductList.mockImplementation(() => <div>ProductListMock</div>);
    SidebarButtons.mockImplementation(() => <div>SidebarButtonsMock</div>);
  });

  it("should render", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText("HeaderMock")).toBeInTheDocument();
    expect(screen.getByText("FooterMock")).toBeInTheDocument();
    expect(screen.getByText("FilterMock")).toBeInTheDocument();
    expect(screen.getByText("BasketMock")).toBeInTheDocument();
    expect(screen.getByText("ProductListMock")).toBeInTheDocument();
  });
});
