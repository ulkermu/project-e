import "../style/layout/Header.css";
import "../style/card/Card.css";
import "../style/sidebar/Basket.css";
import CardItem from "../components/card/CardItem";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Basket from "../components/sidebar/basket/Basket";

const Card = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="card-wrapper">
          <section className="card">
            <CardItem />
          </section>
          <aside className="card-basket-wrapper">
            <Basket />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Card;
