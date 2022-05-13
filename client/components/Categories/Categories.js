import React from 'react';
import { Link } from "react-router-dom";

import './Categories.scss';

export default () => {
  return (
    <>
      <div className="categories-container">
        <div className="categories">
          <div className="category pink-square">
            <Link to='/candy/page/1/filter/["Chocolate"]' className="text-container">
              <div className="text">chocolate</div>
            </Link>
          </div>
          <div className="category green-square">
            <Link to='/candy/page/1/filter/["Caramel"]' className="text-container">
              <div className="text">caramel</div>
            </Link>
          </div>
        </div>      
        <div className="categories">
          <div className="category dark-orange-square">
            <Link to='/candy/page/1/filter/["Hard%20Candy"]' className="text-container">
              <div className="text">candy</div>
            </Link>
          </div>
          <div className="category beige-square">
            <Link to='/candy/page/1/filter/["Lollipop"]' className="text-container">
              <div className="text">lollipop</div>
            </Link>
          </div>
        </div>
        <div className="categories">
          <div className="category cream-square">
            <Link to='/candy/page/1/filter/["Gummy"]' className="text-container">
              <div className="text">gummy</div>
            </Link>
          </div>
          <div className="category orange-square">
            <Link to='/candy/page/1/filter/["Chewing%20Gum"]' className="text-container">
              <div className="text">chewing gum</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
