import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Layout/Header.js";
import Footer from "../../components/Layout/Footer.js";
import ProductDetails from "../../components/Products/ProductDetails.js";
import { useParams } from "react-router-dom";
import RelatedProduct from "../../components/Products/RelatedProduct.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server.js";
import NotFoundPage from "./NotFoundPage.jsx";
const ProductDetailPage = () => {
  const { id } = useParams();
  const ref = useRef([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/get-product/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (data.length > 0) {
    ref.current = [...ref.current, data[0].category];
    const history = new Set(ref.current);
    localStorage.setItem("history", JSON.stringify([...history]));
  }

  return (
    <div>
      <Header />
      {data.length > 0 ? <ProductDetails data={data} /> : <NotFoundPage />}
      {data.length > 0 ? <RelatedProduct data={data} /> : <NotFoundPage />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
