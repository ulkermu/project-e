import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import SidebarButtons from "../../../components/sidebar/SidebarButtons";

describe("SidebarButtons Component Tests", () => {
  it("should render without crashing", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <SidebarButtons />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("Open Filter")).toBeInTheDocument();
    expect(screen.getByText("Open Basket")).toBeInTheDocument();
  });

  it("should toggle filter and basket on button click", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <SidebarButtons />
        </BrowserRouter>
      </RecoilRoot>
    );

    const filterButton = screen.getByText("Open Filter");
    const basketButton = screen.getByText("Open Basket");

    fireEvent.click(filterButton);
    expect(screen.getByText("Close Filter")).toBeInTheDocument();

    fireEvent.click(basketButton);
    expect(screen.getByText("Close Basket")).toBeInTheDocument();
  });
});
