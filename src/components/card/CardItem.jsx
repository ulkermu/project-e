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

  const isExist = basket.find((e) => e.id === card.id) ? true : false;

  const handleAddCard = () => {
    setBasket((prevBasket) => {
      let newBasket;

      // Sepetteki ürünü bul
      const existingProduct = prevBasket.find((item) => item.id === card.id);

      if (existingProduct) {
        // Ürün zaten sepette varsa, miktarını artır
        newBasket = prevBasket.map((item) =>
          item.id === card.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Ürün sepette yoksa, yeni ürünü ekleyerek miktarını 1 yap
        newBasket = [...prevBasket, { ...card, quantity: 1 }];
      }

      // Yeni sepeti localStorage'a kaydet
      localStorage.setItem("basket", JSON.stringify(newBasket));

      return newBasket;
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
