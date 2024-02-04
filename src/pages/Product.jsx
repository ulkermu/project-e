import "../style/layout/Header.css";
import "../style/product/Product.css";
import "../style/sidebar/Basket.css";
import "../style/sidebar/Filter.css";
import ProductList from "../components/product/ProductList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Basket from "../components/sidebar/basket/Basket";
import Filter from "../components/sidebar/filter/Filter";

const Product = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="product-wrapper">
          <aside className="filter-wrapper">
            <Filter />
          </aside>
          <section className="product">
            <ProductList />
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
