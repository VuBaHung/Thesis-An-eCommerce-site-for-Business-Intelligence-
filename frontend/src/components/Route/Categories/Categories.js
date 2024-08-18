import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div classsme="flex items-center text-center" key={index}>
                <div>{i.icon}</div>
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="text-[27px] !text-start font-[400] font-Roboto pb-[20px]">
          Product Catalogs
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden border-[1px] shadow-xl"
                  key={i.id}
                  onClick={() =>
                    handleSubmit(i) ||
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  <h5 className={`text-[20px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[110px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
