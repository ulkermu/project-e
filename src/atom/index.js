import { atom } from "recoil";

export const productDataState = atom({
  key: "productData",
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
  default: [],
});
