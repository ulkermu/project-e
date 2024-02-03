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

  const isExist = basket.find((e) => e.id === item.id) ? true : false;

  const handleNavigateToDetail = () => {
    setCard(item);
    navigate("/product");
  };

  const handleAddCard = () => {
    setBasket((prevBasket) => {
      // Sepetteki ürünü bul
      const existingProduct = prevBasket.find((prev) => prev.id === item.id);

      let newBasket;
      if (existingProduct) {
        // Ürün zaten sepette varsa, miktarını artır
        newBasket = prevBasket.map((prev) =>
          prev.id === item.id ? { ...prev, quantity: prev.quantity + 1 } : prev
        );
      } else {
        // Ürün sepette yoksa, yeni ürünü ekleyerek miktarını 1 yap
        newBasket = [...prevBasket, { ...item, quantity: 1 }];
      }

      // localStorage'a yeni sepeti kaydet
      localStorage.setItem("basket", JSON.stringify(newBasket));

      return newBasket;
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
