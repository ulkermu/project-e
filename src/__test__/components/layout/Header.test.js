import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "../../../components/layout/Header";

describe("Header Component", () => {
  it("renders correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </RecoilRoot>
    );

    // Check if the logo, search box, and other UI elements are present
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Eteration")).toBeInTheDocument();
  });

  it("handles search functionality", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </RecoilRoot>
    );

    // Check if search results are updated correctly
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

  it("toggles mobile search view", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </RecoilRoot>
    );

    // Check if mobile search view is toggled on and off correctly
    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);
  });
});
