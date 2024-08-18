import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
  const listBanner = [
    "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
    "https://png.pngtree.com/thumb_back/fh260/back_pic/00/02/44/5056179b42b174f.jpg",
    "https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listBanner.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);
  return (
    <>
      {listBanner.map((image, index) => (
        <img
          key={index}
          className={`relative py-10 px-5 min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${
            index === currentImageIndex ? "block" : "hidden"
          } ${styles.noramlFlex}`}
          src={image}
          alt=""
        />
      ))}
      {/* <div className="text-center h-[15px] w-[15px] mx-1 bg-[#bbb] rounded-full inline-block items-center"></div>
      <div className="text-center h-[15px] w-[15px] mx-1 bg-[#bbb] rounded-full inline-block"></div>
      <div className="text-center h-[15px] w-[15px] mx-1 bg-[#bbb] rounded-full inline-block"></div> */}
    </>
  );
};

export default Hero;
