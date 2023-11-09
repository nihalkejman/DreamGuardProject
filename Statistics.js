import React from 'react';
import './layouttest.css'; // Make sure to import your CSS file

const MyComponent = () => {
  return (
    <>
      <section className="entry">
        <div className="date">
          <div className="day">31st October</div>
          <div className="time">13:00-13:55</div>
        </div>
        <div className="distance">
          <span className="km_readout">16km</span> ride
        </div>
        <div className="details">
          <div>Top speed: 28mph</div>
          <div>Average speed: 15mph</div>
          <div>Ride time: 55 mins</div>
        </div>
      </section>

      {/* Repeat the above section for additional entries */}
    </>
  );
};

export default MyComponent;