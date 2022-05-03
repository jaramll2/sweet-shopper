import React from 'react'
import CandyItem from "../CandyItem";

const Candies = ({candies, loading})=>{

    // if(loading){
    //     return;
    // }
    
    return (
        <div className="container-contents">
              {candies.map((candy) => (
                <CandyItem key={candy.id} candy={candy} />
              ))}
        </div>
    )
}

export default Candies;