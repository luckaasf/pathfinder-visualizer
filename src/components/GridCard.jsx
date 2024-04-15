import React from "react";
import "../assets/stylesheets/GridCard.css";

function GridCard({ algorithm, grid_name, image, maze, speed, user }) {
        
    //<img src={img} alt="" width="230" height="140"></img>
    return(
        <>
            <div className="grid-card">
                <div className="outer-card">
                    <div className="inner-card">
                    <h2>{grid_name}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GridCard;