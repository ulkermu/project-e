import "../style/layout/Header.css";
import "../style/product/Product.css";
import "../style/sidebar/Basket.css";
import "../style/sidebar/Filter.css";
import "../style/sidebar/Drawer.css";
import ProductList from "../components/product/ProductList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Basket from "../components/sidebar/basket/Basket";
import Filter from "../components/sidebar/filter/Filter";
import SidebarButtons from "../components/sidebar/SidebarButtons";
import { Drawer } from "@mui/material";
import { useRecoilState } from "recoil";
import { openBasketState, openFilterState } from "../atom";

const Product = () => {
  const [openFilter, setOpenFilter] = useRecoilState(openFilterState);
  const [openBasket, setOpenBasket] = useRecoilState(openBasketState);

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  const handleBasketClose = () => {
    setOpenBasket(false);
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="product-wrapper">
          <aside className="filter-wrapper">
            <Drawer anchor="left" open={openFilter} onClose={handleFilterClose} className="drawer">
              <Filter />
            </Drawer>
            <Filter />
          </aside>
          <section className="product">
            <SidebarButtons />
            <ProductList />
          </section>
          <aside className="basket-wrapper">
            <Drawer anchor="right" open={openBasket} onClose={handleBasketClose} className="drawer">
              <Basket />
            </Drawer>
            <Basket />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Product;
