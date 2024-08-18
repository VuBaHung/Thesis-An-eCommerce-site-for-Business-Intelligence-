import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { loadSeller, updateShopInfor } from "../../redux/actions/user";

const EditShop = () => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller[0] && seller[0].name);
  const [email, setEmail] = useState(seller[0] && seller[0].email);
  const [phoneNumber, setPhoneNumber] = useState(
    seller[0] && seller[0].phoneNumber
  );
  const [address, setAddress] = useState(seller[0] && seller[0].address);
  const [description, setDescription] = useState(
    seller[0] && seller[0].description
  );
  const [zipcode, setZipcode] = useState("");
  const [images, setImages] = useState("");
  const dispatch = useDispatch();

  const onChangeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist");
      if (file.size > 1024 * 1024) return alert("Size too large");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${server}/user/uploadImgUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const avatar = images.url;
      const res = await axios
        .put(
          `${server}/shop/update-shop-infor`,
          {
            name,
            phoneNumber,
            address,
            zipcode,
            email,
            description,
            avatar,
          },
          { headers: { Authorization: seller[1] } }
        )
        .catch((err) => console.log(err));
      console.log({ res });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              className="w-[170px] h-[170px] rounded-full flex items-center object-cover border-[3px] border-[#3ad132]"
              src={images ? images.url : `${seller[0]?.avatar}`}
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={onChangeAvatar}
              />
              <label htmlFor="image">
                <AiOutlineCamera size={30} className="cursor-pointer" />
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full px-5">
          <form onSubmit={handleSubmit}>
            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Shop Name:</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Email Address:</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Phone Number:</label>
                <input
                  type="number"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Shop Address:</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Enter your description:</label>
                <textarea
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Zipcode:</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
            </div>

            <div className="!items-center !text-center  ">
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer items-center `}
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default EditShop;
