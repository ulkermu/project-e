import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { openBasketState, openFilterState } from "../../atom";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const SidebarButtons = () => {
  const [openFilter, setOpenFilter] = useRecoilState(openFilterState);
  const [openBasket, setOpenBasket] = useRecoilState(openBasketState);

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handleBasket = () => {
    setOpenBasket(!openBasket);
  };

  return (
    <div className="sidebar">
      <Button className="button sidebar-button" onClick={handleFilter}>
        <SortOutlinedIcon /> {openFilter ? "Close" : "Open"} Filter
      </Button>
      <Button className="button sidebar-button" onClick={handleBasket}>
        <ShoppingCartOutlinedIcon /> {openBasket ? "Close" : "Open"} Basket
      </Button>
    </div>
  );
};

export default SidebarButtons;
