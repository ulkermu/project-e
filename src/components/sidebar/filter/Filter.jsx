import { ThemeProvider, createTheme } from "@mui/material";
import FilterBrand from "./FilterBrand";
import FilterModel from "./FilterModel";
import FilterSort from "./FilterSort";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  filteredProductDataState,
  productDataState,
  selectedBrandsState,
  selectedModelsState,
} from "../../../atom";
import { useEffect } from "react";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

const Filter = () => {
  const productData = useRecoilValue(productDataState);
  const selectedBrands = useRecoilValue(selectedBrandsState);
  const selectedModels = useRecoilValue(selectedModelsState);

  const setFilteredProductData = useSetRecoilState(filteredProductDataState);

  useEffect(() => {
    // Filtreleme işlemi
    let newFilteredProducts = productData;

    if (selectedBrands.length > 0) {
      newFilteredProducts = newFilteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedModels.length > 0) {
      newFilteredProducts = newFilteredProducts.filter((product) =>
        selectedModels.includes(product.model)
      );
    }

    setFilteredProductData(newFilteredProducts);
  }, [selectedBrands, selectedModels, productData, setFilteredProductData]);

  return (
    <ThemeProvider theme={theme}>
      <div className="filter">
        <FilterSort />
        <FilterBrand />
        <FilterModel />
      </div>
    </ThemeProvider>
  );
};

export default Filter;
