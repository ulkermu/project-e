import { atom } from "recoil";
const isStoraged = JSON.parse(localStorage.getItem("basket")) !== null;

export const productDataState = atom({
  key: "productData",
  default: [],
});

export const filteredProductDataState = atom({
  key: "filteredProductData",
  default: [],
});

export const selectedBrandsState = atom({
  key: "selectedBrands",
  default: [],
});

export const selectedModelsState = atom({
  key: "selectedModels",
  default: [],
});

export const cardState = atom({
  key: "card",
  default: {},
});

export const brandState = atom({
  key: "brand",
  default: [],
});

export const modelState = atom({
  key: "model",
  default: [],
});

export const basketState = atom({
  key: "basket",
  default: isStoraged ? JSON.parse(localStorage.getItem("basket")) : [],
});

export const openBasketState = atom({
  key: "openBasket",
  default: false,
});

export const openFilterState = atom({
  key: "openFilter",
  default: false,
});
