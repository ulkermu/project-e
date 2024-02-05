import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { modelState, selectedModelsState } from "../../../atom";
import FilterModel from "../../../components/sidebar/filter/FilterModel";

const initialBrands = ["Apple", "Samsung", "Sony"];
const initialSelectedBrands = ["Samsung"];

describe("FilterBrand Component Tests", () => {
  it("should render without crashing", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(modelState, initialBrands);
          set(selectedModelsState, initialSelectedBrands);
        }}
      >
        <BrowserRouter>
          <FilterModel />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByLabelText("Search Model")).toBeInTheDocument();
  });

  it("should filter brands based on search input", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(modelState, initialBrands)}>
        <BrowserRouter>
          <FilterModel />
        </BrowserRouter>
      </RecoilRoot>
    );

    const searchInput = screen.getByLabelText("Search Model");
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Samsung")).toBeNull();
  });

  it("should clear the search input when clear button is clicked", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(modelState, initialBrands)}>
        <BrowserRouter>
          <FilterModel />
        </BrowserRouter>
      </RecoilRoot>
    );

    const searchInput = screen.getByLabelText("Search Model");
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(searchInput.value).toBe("");
  });

  it("should toggle brand selection on checkbox click", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(modelState, initialBrands);
          set(selectedModelsState, initialSelectedBrands);
        }}
      >
        <BrowserRouter>
          <FilterModel />
        </BrowserRouter>
      </RecoilRoot>
    );

    const samsungCheckbox = screen.getByLabelText("Samsung");
    fireEvent.click(samsungCheckbox);

    const appleCheckbox = screen.getByLabelText("Apple");
    fireEvent.click(appleCheckbox);

    expect(samsungCheckbox.checked).toBe(false);
    expect(appleCheckbox.checked).toBe(true);
  });
});
