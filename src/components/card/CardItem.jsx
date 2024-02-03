import { useRecoilState, useRecoilValue } from "recoil";
import { basketState, cardState } from "../../atom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const CardItem = () => {
  const navigate = useNavigate();

  const card = useRecoilValue(cardState);
  const [basket, setBasket] = useRecoilState(basketState);

  const isExist = basket.find((e) => e.id === card.id);

  const handleAddCard = () => {
    setBasket((prevBasket) => {
      // Ürünün basket içinde olup olmadığını kontrol et
      const existingItemIndex = prevBasket.findIndex((basketItem) => basketItem.id === card.id);

      if (existingItemIndex > -1) {
        // Ürün zaten varsa, miktarını 1 artır
        const newBasket = [...prevBasket];
        newBasket[existingItemIndex].quantity = (newBasket[existingItemIndex].quantity || 0) + 1;
        return newBasket;
      } else {
        // Ürün yoksa, yeni bir nesne olarak ekle
        return [...prevBasket, { ...card, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    if (Object.keys(card).length === 0) {
      navigate("/");
    }
  }, [card, navigate]);

  return (
    <div className="card-item">
      <figure>
        <img src={card?.image} alt={card?.name} />
      </figure>
      <div className="card-item-text">
        <article className="item-text-headline">
          <h1>{card?.name}</h1>
          <p>${card?.price}</p>
        </article>
        <article className="item-text-article">
          <Button disabled={isExist} onClick={handleAddCard} className="button">
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
          <p>{card?.description}</p>
        </article>
      </div>
    </div>
  );
};

export default CardItem;
