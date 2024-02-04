import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { basketState, filteredProductDataState, productDataState } from "../../atom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Header = () => {
  const setFilteredProductData = useSetRecoilState(filteredProductDataState);

  const productData = useRecoilValue(productDataState);
  const basket = useRecoilValue(basketState);

  const [search, setSearch] = useState("");
  const [searchAppear, setSearchAppear] = useState(false);

  const totalPrice = basket?.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
  }, 0);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setFilteredProductData(productData);
    } else {
      const newFilteredData = productData.filter(
        (item) =>
          item.brand.toLowerCase().includes(value) ||
          item.name.toLowerCase().includes(value) ||
          item.model.toLowerCase().includes(value) ||
          item.price.toString().includes(value) // price sayıysa, içermesi için stringe dönüştürülür
      );
      setFilteredProductData(newFilteredData);
    }
  };

  const handleSearchAppear = () => {
    setSearchAppear(true);
  };

  const handleSearchAppearClose = () => {
    setSearchAppear(false);
  };

  return (
    <header>
      {searchAppear && (
        <div className="mobil-search-wrapper">
          <div className="mobil-search">
            <input
              className="search"
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
              autoComplete="off"
            />
            <SearchIcon className="search-icon" />
            <CancelOutlinedIcon onClick={handleSearchAppearClose} className="close-icon" />
          </div>
        </div>
      )}
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
          {!searchAppear && (
            <div className="search-wrapper-mobil">
              <Button onClick={handleSearchAppear} className="icon-button">
                <SearchIcon className="search-icon" />
                <span className="search-text">Search</span>
              </Button>
            </div>
          )}
        </div>
        <div className="profile">
          <div className="profile-name">
            <ShoppingCartOutlinedIcon /> ${totalPrice}
          </div>
          <Button className="profile-name settings">
            <PersonOutlineOutlinedIcon /> <span className="profile-text">Murat</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
