import React from 'react';
// import './layouttest.css'; // Make sure to import your CSS file

const stats = () => {
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

const styles = StyleSheet.create{    // JavaScript code to apply styles

  document.addEventListener('DOMContentLoaded', function() {
    var entrySection = document.querySelector('.entry');
    entrySection.style.paddingBottom = '20px';
    entrySection.style.paddingLeft = '15px';
    entrySection.style.paddingTop = '10px';
    entrySection.style.width = '50%';
    entrySection.style.backgroundColor = 'white';
    entrySection.style.border = '2px solid black';
    entrySection.style.borderRadius = '10px';
    entrySection.style.margin = '10px';
    entrySection.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

    var innerDiv = entrySection.querySelector('.inner');
    innerDiv.style.padding = '5px';

    var distanceParagraph = innerDiv.querySelector('.distance');
    distanceParagraph.style.fontSize = '2em';

    var kmReadoutParagraph = innerDiv.querySelector('.km_readout');
    kmReadoutParagraph.style.fontWeight = 'bold';

    var dateParagraph = innerDiv.querySelector('.date');
    dateParagraph.style.float = 'right';
    dateParagraph.style.paddingLeft = '20px';
    dateParagraph.style.paddingBottom = '10px';
    dateParagraph.style.paddingRight = '10px';

    var detailsDiv = innerDiv.querySelector('.details');
    detailsDiv.style.paddingTop = '10px';
  })
};


    </>
  );
};

export default stats;