import React, { useEffect, useState } from "react";

const CountDown = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    var countDownDate = new Date(endDate).getTime();

    var now = new Date().getTime();

    var difference = countDownDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
        {/* {console.log(timeLeft[interval])} */}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]" key={timeLeft.interval}>
          Time's Up
        </span>
      )}
    </div>
  );
};

export default CountDown;
