import BasketList from "./BasketList";
import BasketPrice from "./BasketPrice";

const Basket = () => {
  return (
    <div className="basket">
      <BasketList />
      <BasketPrice />
    </div>
  );
};

export default Basket;
