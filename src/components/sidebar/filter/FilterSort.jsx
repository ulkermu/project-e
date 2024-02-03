import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";

const FilterSort = ({ filteredProductData, setFilteredProductData }) => {
  const [sortType, setSortType] = useState("otn");

  const handleSortType = (e) => {
    const value = e.target.value;
    setSortType(value);

    let sortedData = [];
    switch (value) {
      case "otn":
        sortedData = [...filteredProductData].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "nto":
        sortedData = [...filteredProductData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "htl":
        sortedData = [...filteredProductData].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      case "lth":
        sortedData = [...filteredProductData].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      default:
        break;
    }

    setFilteredProductData(sortedData);
  };

  return (
    <FormControl component="fieldset" className="filter-item sort">
      <RadioGroup name="sortType" value={sortType} onChange={handleSortType}>
        <FormControlLabel
          value="otn"
          control={<Radio sx={{ color: "var(--ocean)" }} />}
          label="Old to new"
        />
        <FormControlLabel
          value="nto"
          control={<Radio sx={{ color: "var(--ocean)" }} />}
          label="New to old"
        />
        <FormControlLabel
          value="htl"
          control={<Radio sx={{ color: "var(--ocean)" }} />}
          label="Price high to low"
        />
        <FormControlLabel
          value="lth"
          control={<Radio sx={{ color: "var(--ocean)" }} />}
          label="Price low to high"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FilterSort;
