import { useRecoilValue } from "recoil";
import { basketState } from "../../../atom";
import { Button } from "@mui/material";

const BasketPrice = () => {
  const basket = useRecoilValue(basketState);

  const totalPrice = basket.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity, 10);
  }, 0);

  return (
    <div className="basket-item price">
      <div className="price-item">Total Price: <span>${totalPrice}</span></div>
      <Button className="button">Checkout</Button>
    </div>
  );
};

export default BasketPrice;
