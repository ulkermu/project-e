import "../style/layout/Header.css";
import "../style/product/Product.css";
import "../style/sidebar/Basket.css";
import "../style/sidebar/Filter.css";
import ProductList from "../components/product/ProductList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Basket from "../components/sidebar/basket/Basket";
import Filter from "../components/sidebar/filter/Filter";
import { useRecoilValue } from "recoil";
import { productDataState } from "../atom";
import { useState } from "react";

const Product = () => {
  const productData = useRecoilValue(productDataState);
  const [filteredProductData, setFilteredProductData] = useState(productData);

  return (
    <>
      <Header setFilteredProductData={setFilteredProductData} />
      <main className="main">
        <div className="product-wrapper">
          <aside className="filter-wrapper">
            <Filter
              setFilteredProductData={setFilteredProductData}
              filteredProductData={filteredProductData}
            />
          </aside>
          <section className="product">
            <ProductList
              filteredProductData={filteredProductData}
              setFilteredProductData={setFilteredProductData}
            />
          </section>
          <aside className="basket-wrapper">
            <Basket />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Product;
