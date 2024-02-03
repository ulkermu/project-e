import { useRecoilState } from "recoil";
import { basketState } from "../../../atom";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const BasketList = () => {
  const [basket, setBasket] = useRecoilState(basketState);

  const handleAddToBasket = (product) => {
    setBasket((prevBasket) => {
      let newBasket;

      // Sepetteki ürünü bul
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        // Ürün zaten sepette varsa, miktarını artır
        newBasket = prevBasket.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Ürün sepette yoksa, yeni ürünü ekleyerek miktarını 1 yap
        newBasket = [...prevBasket, { ...product, quantity: 1 }];
      }

      // Yeni sepeti localStorage'a kaydet
      localStorage.setItem("basket", JSON.stringify(newBasket));

      return newBasket;
    });
  };

  const handleDeleteFromBasket = (item) => {
    setBasket((prevBasket) => {
      const existingProductIndex = prevBasket.findIndex((basketItem) => basketItem.id === item.id);

      if (existingProductIndex !== -1) {
        // Sepetteki ürünün kopyasını oluşturun
        const newBasket = prevBasket
          .map((basketItem, index) => {
            if (index === existingProductIndex) {
              // Miktarı azaltın
              return { ...basketItem, quantity: basketItem.quantity - 1 };
            }
            return basketItem;
          })
          .filter((basketItem) => basketItem.quantity > 0); // Miktarı 0 veya daha az olan ürünleri filtreleyin

        // localStorage'a yeni sepeti kaydet
        localStorage.setItem("basket", JSON.stringify(newBasket));

        return newBasket;
      }

      return prevBasket;
    });
  };

  return (
    <div className="basket-item">
      <div className="basket-item-list">
        {basket?.map((item) => (
          <div key={item.id} className="basket-item-list-item">
            <div className="item-detail">
              <div className="item-detail-name">{item.name}</div>
              <div className="item-detail-price">${Number(item.price) * Number(item.quantity)}</div>
            </div>
            <div className="basket-item-list-item">
              <IconButton onClick={() => handleDeleteFromBasket(item)}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
              <div>{item.quantity}</div>
              <IconButton onClick={() => handleAddToBasket(item)}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </div>
          </div>
        ))}
        {basket?.length === 0 && (
          <div className="empty">
            <ShoppingCartOutlinedIcon />
            <p>Your basket is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketList;
