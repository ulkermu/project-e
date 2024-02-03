import { ThemeProvider, createTheme } from "@mui/material";
import FilterBrand from "./FilterBrand";
import FilterModel from "./FilterModel";
import FilterSort from "./FilterSort";

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

const Filter = ({ filteredProductData, setFilteredProductData }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="filter">
        <FilterSort
          filteredProductData={filteredProductData}
          setFilteredProductData={setFilteredProductData}
        />
        <FilterBrand setFilteredProductData={setFilteredProductData} />
        <FilterModel setFilteredProductData={setFilteredProductData} />
      </div>
    </ThemeProvider>
  );
};

export default Filter;
