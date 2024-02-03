import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { brandState, productDataState, selectedBrandsState } from "../../../atom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const FilterBrand = ({ setFilteredProductData }) => {
  const productData = useRecoilValue(productDataState);
  const brand = useRecoilValue(brandState);
  const [selectedBrands, setSelectedBrands] = useRecoilState(selectedBrandsState);

  const [search, setSearch] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(brand);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setFilteredBrands(brand);
    } else {
      const filtered = brand.filter((item) => item.toLowerCase().includes(value));
      setFilteredBrands(filtered);
    }
  };

  const handleSearchClear = () => {
    setSearch("");
    setFilteredBrands(brand);
  };

  const handleFilterBrandChange = (item) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(item)) {
        return prevSelectedBrands.filter((brand) => brand !== item);
      } else {
        return [...prevSelectedBrands, item];
      }
    });
  };

  useEffect(() => {
    if (selectedBrands.length > 0) {
      const newFilteredData = productData.filter((product) =>
        selectedBrands.includes(product.brand)
      );
      setFilteredProductData(newFilteredData);
    } else {
      setFilteredProductData(productData);
    }
  }, [selectedBrands, productData, setFilteredProductData, setSelectedBrands]);

  useEffect(() => {
    setFilteredBrands(brand);
  }, [brand]);

  return (
    <div className="filter-item">
      <TextField
        value={search}
        onChange={handleSearchChange}
        size="small"
        label="Search Brand"
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {search !== "" && (
                <IconButton onClick={handleSearchClear}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      <FormGroup className="filter-item-group">
        {filteredBrands.map((item, key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                sx={{ color: "var(--ocean)" }}
                onChange={() => handleFilterBrandChange(item)}
                checked={selectedBrands.includes(item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default FilterBrand;
