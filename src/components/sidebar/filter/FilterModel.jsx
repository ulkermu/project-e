import { useRecoilState, useRecoilValue } from "recoil";
import { modelState, productDataState, selectedModelsState } from "../../../atom";
import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const FilterModel = ({ setFilteredProductData }) => {
  const productData = useRecoilValue(productDataState);
  const model = useRecoilValue(modelState);
  const [selectedModels, setSelectedModels] = useRecoilState(selectedModelsState);

  const [search, setSearch] = useState("");
  const [filteredModels, setFilteredModels] = useState(model);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setFilteredModels(model);
    } else {
      const filtered = model.filter((item) => item.toLowerCase().includes(value));
      setFilteredModels(filtered);
    }
  };

  const handleSearchClear = () => {
    setSearch("");
    setFilteredModels(model);
  };

  const handleFilterModelChange = (item) => {
    setSelectedModels((prevSelectedBrands) => {
      if (prevSelectedBrands?.includes(item)) {
        return prevSelectedBrands?.filter((brand) => brand !== item);
      } else {
        return [...prevSelectedBrands, item];
      }
    });
  };

  useEffect(() => {
    if (selectedModels.length > 0) {
      const newFilteredData = productData.filter((product) =>
        selectedModels.includes(product.model)
      );
      setFilteredProductData(newFilteredData);
    } else {
      setFilteredProductData(productData);
    }
  }, [selectedModels, productData, setFilteredProductData]);

  useEffect(() => {
    setFilteredModels(model);
  }, [model]);

  return (
    <div className="filter-item">
      <TextField
        value={search}
        onChange={handleSearchChange}
        size="small"
        label="Search"
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
        {filteredModels?.map((item, key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                sx={{ color: "var(--ocean)" }}
                onChange={() => handleFilterModelChange(item)}
                checked={selectedModels.includes(item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default FilterModel;
