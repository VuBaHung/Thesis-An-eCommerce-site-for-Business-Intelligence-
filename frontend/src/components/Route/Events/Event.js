import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Event = () => {
  const { allEvents } = useSelector((state) => state.event);

  return (
    <div>
      <div className={`${styles.section} `}>
        <div className="text-[27px] !text-start font-[400] font-Roboto pb-[20px]">
          Events
        </div>
        <div className="w-full grid">
          {allEvents ? (
            <EventCard data={allEvents[allEvents.length - 1]} active={true} />
          ) : (
            <p>There are no event now!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
