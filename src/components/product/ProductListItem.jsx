import { useRecoilState, useSetRecoilState } from "recoil";
import { basketState, cardState } from "../../atom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const ProductListItem = ({ item }) => {
  const navigate = useNavigate();

  const [basket, setBasket] = useRecoilState(basketState);
  const setCard = useSetRecoilState(cardState);

  const isExist = basket.find((e) => e.id === item.id);

  const handleNavigateToDetail = () => {
    setCard(item);
    navigate("/product");
  };

  const handleAddCard = () => {
    setBasket((prevBasket) => {
      // Ürünün basket içinde olup olmadığını kontrol et
      const existingItemIndex = prevBasket.findIndex((basketItem) => basketItem.id === item.id);

      if (existingItemIndex > -1) {
        // Ürün zaten varsa, miktarını 1 artır
        const newBasket = [...prevBasket];
        newBasket[existingItemIndex].quantity = (newBasket[existingItemIndex].quantity || 0) + 1;
        return newBasket;
      } else {
        // Ürün yoksa, yeni bir nesne olarak ekle
        return [...prevBasket, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="product-list-item">
      <figure onClick={handleNavigateToDetail}>
        <img loading="lazy" src={item?.image} alt={item?.brand} />
        <figcaption>${item?.price}</figcaption>
        <p>{item?.name}</p>
      </figure>
      <Button disabled={isExist} className="button" onClick={handleAddCard}>
        {isExist ? (
          <>
            <CheckCircleOutlinedIcon /> Added to Basket
          </>
        ) : (
          <>
            <AddCircleOutlineOutlinedIcon /> Add to Basket
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductListItem;
