import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot, atom } from "recoil";
import FilterModel from "../../../components/sidebar/filter/FilterModel";
import { BrowserRouter } from "react-router-dom";

const brandState = atom({
  key: "brandState",
  default: ["Smart", "Nissan", "Volkswagen"],
});

const selectedBrandsState = atom({
  key: "selectedBrandsState",
  default: [],
});

test("FilterBrand component filters brands correctly", async () => {
  const mockBrandData = ["Smart", "Nissan", "Volkswagen"];
  const mockSelectedBrands = ["Nissan"];

  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(brandState, mockBrandData);
        snap.set(selectedBrandsState, mockSelectedBrands);
      }}
    >
      <BrowserRouter>
        <FilterModel />
      </BrowserRouter>
    </RecoilRoot>
  );

  const searchInput = screen.getByLabelText("Search Model");
  fireEvent.change(searchInput, { target: { value: "Nissan" } });
});
