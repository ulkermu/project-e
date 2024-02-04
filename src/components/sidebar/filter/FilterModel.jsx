import { useRecoilState, useRecoilValue } from "recoil";
import {
  modelState,
  productDataState,
  selectedBrandsState,
  selectedModelsState,
} from "../../../atom";
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

const FilterModel = () => {
  const productData = useRecoilValue(productDataState);
  const model = useRecoilValue(modelState);
  const selectedBrands = useRecoilValue(selectedBrandsState);

  const [selectedModels, setSelectedModels] = useRecoilState(selectedModelsState);
  const [filteredModels, setFilteredModels] = useState(model);

  const [search, setSearch] = useState("");

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

  const handleModelSelection = (model) => {
    setSelectedModels((prevSelectedModels) =>
      prevSelectedModels.includes(model)
        ? prevSelectedModels.filter((m) => m !== model)
        : [...prevSelectedModels, model]
    );
  };

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
        {filteredModels
          .filter(
            (model) =>
              selectedBrands.length === 0 ||
              productData.some(
                (product) => product.model === model && selectedBrands.includes(product.brand)
              )
          )
          .map((model, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedModels.includes(model)}
                  onChange={() => handleModelSelection(model)}
                />
              }
              label={model}
            />
          ))}
      </FormGroup>
    </div>
  );
};

export default FilterModel;
