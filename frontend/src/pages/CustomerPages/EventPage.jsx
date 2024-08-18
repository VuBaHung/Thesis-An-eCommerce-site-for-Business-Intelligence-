import React from "react";
import Header from "../../components/Layout/Header";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { allEvents } = useSelector((state) => state.event);
  return (
    <div>
      <Header activeHeading={4} />
      <div className="pt-[30px] py-[80px]">
        {allEvents ? (
          allEvents.map((event) => (
            <EventCard data={event} key={event._id} active={false} />
          ))
        ) : (
          <p>There are no event now!</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
