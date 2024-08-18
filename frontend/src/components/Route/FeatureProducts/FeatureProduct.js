import React, { useMemo, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

import Store from "../../../redux/store";
import { getAllProducts } from "../../../redux/actions/product";

const FeatureProduct = () => {
  const [limit, setLimit] = useState(100);

  const { allProducts } = useSelector((state) => state.product);
  useMemo(() => {
    return Store.dispatch(getAllProducts(limit));
  }, [limit]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="text-[27px] !text-start font-[400] font-Roboto pb-[20px]">
          Feature Products
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts &&
            allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>

      {/* <div
        className={`w-[150px] bg-[#73a7af] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ml-[50%]`}
        onClick={() => setLimit((pre) => (pre += 10))}
      >
        Show More
      </div> */}
    </div>
  );
};

export default FeatureProduct;
