import { useRecoilValue } from "recoil";
import BasketList from "./BasketList";
import BasketPrice from "./BasketPrice";
import { openBasketState } from "../../../atom";

const Basket = () => {
  const openBasket = useRecoilValue(openBasketState);

  return (
    <div className="basket-container">
      <div className={`basket${openBasket ? "" : " close"}`}>
        <BasketList />
        <BasketPrice />
      </div>
    </div>
  );
};

export default Basket;
