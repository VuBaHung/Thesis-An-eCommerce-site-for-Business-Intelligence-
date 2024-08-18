import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";

function RelatedProduct({ data }) {
  const dispatch = useDispatch();

  const { allProducts, isLoading } = useSelector((state) => state.product);
  const [moreItem, setMoreItem] = useState([]);
  const history = localStorage.getItem("history");
  useEffect(() => {
    const x =
      allProducts &&
      allProducts.filter(
        (item) => history.includes(item.category) && data[0]._id !== item._id
      );
    setMoreItem(x);
  }, [history, data, allProducts]);
  useCallback(() => {
    dispatch(getAllProducts(20));
  }, [dispatch]);
  const dataArr = Object.values(data);

  return (
    <div>
      {dataArr[0] ? (
        <div className={`${styles.section} `}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related products
          </h2>
          <div className="grid gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 overflow-x-auto">
            {moreItem &&
              moreItem.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RelatedProduct;
