import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { basketState, productDataState } from "../../atom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "@mui/material";

const Header = ({ setFilteredProductData }) => {
  // setFilteredProductData fonksiyonunun tanımlı olup olmadığını kontrol et
  const isSetFilteredProductDataDefined = typeof setFilteredProductData === "function";

  const productData = useRecoilValue(productDataState);
  const basket = useRecoilValue(basketState);

  const [search, setSearch] = useState("");

  const totalPrice = basket?.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
  }, 0);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      if (isSetFilteredProductDataDefined) {
        setFilteredProductData(productData);
      }
    } else {
      const newFilteredData = productData.filter(
        (item) =>
          item.brand.toLowerCase().includes(value) ||
          item.name.toLowerCase().includes(value) ||
          item.model.toLowerCase().includes(value) ||
          item.price.toString().includes(value) // price sayıysa, içermesi için stringe dönüştürülür
      );
      if (isSetFilteredProductDataDefined) {
        setFilteredProductData(newFilteredData);
      }
    }
  };

  return (
    <header>
      <div className="nav-wrapper">
        <div className="nav-container">
          <nav>
            <NavLink to={"/"}>Eteration</NavLink>
          </nav>
          <div className="search-wrapper">
            <input
              className="search"
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
              autoComplete="off"
            />
            <SearchIcon className="search-icon" />
          </div>
        </div>
        <div className="profile">
          <div className="profile-name">
            <ShoppingCartOutlinedIcon /> ${totalPrice}
          </div>
          <Button className="profile-name">
            <PersonOutlineOutlinedIcon /> Murat
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
