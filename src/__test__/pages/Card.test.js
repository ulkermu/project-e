import { render, screen } from "@testing-library/react";
import Card from "../../pages/Card";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CardItem from "../../components/card/CardItem";
import Basket from "../../components/sidebar/basket/Basket";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../components/layout/Header");
jest.mock("../../components/layout/Footer");
jest.mock("../../components/card/CardItem");
jest.mock("../../components/sidebar/basket/Basket");

describe("Card Component Tests", () => {
  beforeEach(() => {
    Header.mockImplementation(() => <div>HeaderMock</div>);
    Footer.mockImplementation(() => <div>FooterMock</div>);
    CardItem.mockImplementation(() => <div>CardItemMock</div>);
    Basket.mockImplementation(() => <div>BasketMock</div>);
  });

  it("should render header, card item, basket, and footer", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText("HeaderMock")).toBeInTheDocument();
    expect(screen.getByText("CardItemMock")).toBeInTheDocument();
    expect(screen.getByText("BasketMock")).toBeInTheDocument();
    expect(screen.getByText("FooterMock")).toBeInTheDocument();
  });
});
