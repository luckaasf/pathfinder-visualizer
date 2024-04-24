import React from "react";
import "../assets/stylesheets/GridCard.css";

function GridCard({ algorithm, grid_name, image, maze, speed, user }) {

    return(
        <>
            <div className="grid-card">
                <div className="outer-card">
                    <img src={image} alt=""/>
                    <div className="card-details">
                        <h3>{grid_name}</h3>
                        <p>Algorithm: {algorithm}</p>
                        <p>Maze: {maze}</p>
                        <p>Speed: {speed}</p>
                        <button className="download-button">Download</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GridCard;