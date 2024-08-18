import React, { useState } from "react";
import Header from "../../components/Layout/Header.js";
import styles from "../../styles/styles.js";
import ProfileSidebar from "../../components/Profile/ProfileSidebar.js";
import ProfileContent from "../../components/Profile/ProfileContent.js";
import { useSelector } from "react-redux";
const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {user && <Header />}
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[70px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
