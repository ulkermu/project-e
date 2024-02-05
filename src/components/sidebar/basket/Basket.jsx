import BasketList from "./BasketList";
import BasketPrice from "./BasketPrice";

const Basket = () => {
  return (
    <div className="basket-container">
      <div className="basket">
        <BasketList />
        <BasketPrice />
      </div>
    </div>
  );
};

export default Basket;
