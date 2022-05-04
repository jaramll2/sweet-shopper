import React from 'react';

import './Categories.scss';

export default () => {
  return (
    <>
      <div className="categories-container">
        <div className="categories">
          <div className="category pink-square">
            {/* <img src="./candy-img.jpeg" /> */}
          </div>
          <div className="category green-square" />
        </div>      
        <div className="categories">
          <div className="category dark-orange-square" />
          <div className="category beige-square" />
        </div>
        <div className="categories">
          <div className="category cream-square" />
          <div className="category orange-square">
            {/* <img src="./candy.webp" /> */}
          </div>

        </div>
      </div>
    </>

    
  );
};
