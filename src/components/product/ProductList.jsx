import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import ProductListItem from "./ProductListItem";
import { useSetRecoilState } from "recoil";
import { brandState, modelState, productDataState } from "../../atom";
import { Pagination } from "@mui/material";

const ProductList = ({ filteredProductData, setFilteredProductData }) => {
  const pageLimit = 12;

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const setProductData = useSetRecoilState(productDataState);
  const setBrand = useSetRecoilState(brandState);
  const setModel = useSetRecoilState(modelState);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const getData = useCallback(() => {
    fetch(api)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((jsonData) => {
        setProductData(jsonData);
        setFilteredProductData(jsonData);

        setBrand(Array.from(new Set(jsonData?.map((item) => item?.brand))));
        setModel(Array.from(new Set(jsonData?.map((item) => item?.model))));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setFilteredProductData, setBrand, setModel, setProductData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <>
      <div className="product-list">
        {filteredProductData?.slice((page - 1) * pageLimit, page * pageLimit)?.map((item) => (
          <ProductListItem key={item?.id} item={item} />
        ))}
      </div>
      <div className="product-pagination">
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(filteredProductData?.length / pageLimit)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default ProductList;
