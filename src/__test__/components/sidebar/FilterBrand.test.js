import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot, atom } from "recoil";
import FilterBrand from "../../../components/sidebar/filter/FilterBrand";
import { BrowserRouter } from "react-router-dom";

// Recoil state'lerini ve atomlarını oluşturun
const brandState = atom({
  key: "brandState",
  default: ["Smart", "Nissan", "Volkswagen"],
});

const selectedBrandsState = atom({
  key: "selectedBrandsState",
  default: [],
});

test("FilterBrand component filters brands correctly", async () => {
  // Test verileri
  const mockBrandData = ["Smart", "Nissan", "Volkswagen"];
  const mockSelectedBrands = ["Nissan"];

  // Test bileşenini oluşturun
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(brandState, mockBrandData);
        snap.set(selectedBrandsState, mockSelectedBrands);
      }}
    >
      <BrowserRouter>
        <FilterBrand />
      </BrowserRouter>
    </RecoilRoot>
  );

  // "Search Brand" giriş alanı ve checkboxleri bulun
  const searchInput = screen.getByLabelText("Search Brand");

  // Giriş alanına bir değer girin
  fireEvent.change(searchInput, { target: { value: "Nissan" } });
});
