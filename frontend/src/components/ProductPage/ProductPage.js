import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Layout/Header";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Footer from "../Layout/Footer";
import { useSelector } from "react-redux";
import Store from "../../redux/store";
import { getAllProducts } from "../../redux/actions/product";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");
  const [limit, setLimit] = useState(100);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    Store.dispatch(getAllProducts(limit));
  }, [limit]);

  useEffect(() => {
    if (categoryData === null) {
      const d =
        allProducts &&
        allProducts.slice().sort((a, b) => b.sold_out - a.sold_out);
      setData(d);
    } else {
      const d =
        allProducts &&
        allProducts.filter((i) => i.category + "" === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData]);
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>

        {data && data.length === 0 ? (
          <h1 className="w-full justify-center items-center text-[30px] text-[bold]">
            No Product Founded!
          </h1>
        ) : null}
      </div>
      {/* <div
        className={`w-[150px] bg-[#73a7af] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ml-[50%]`}
        onClick={() => setLimit(limit + 10)}
      >
        Show More
      </div> */}
      <Footer />
    </div>
  );
};

export default ProductPage;
