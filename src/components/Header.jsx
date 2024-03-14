import React, { useContext, useState } from "react";
import '../assets/stylesheets/Header.css';
import MyContext from "./MyContext";

function Header() {

    const { startAlgorithm } = useContext(MyContext);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

    function handleAlgorithmChange(event) {
        setSelectedAlgorithm(event.target.value);
    }

    function handleClick() {
        if (selectedAlgorithm)
            startAlgorithm(true, selectedAlgorithm);
    }

    return(
        <header className="header-container">
            <div className="visualize-container">
            <select className="dropdown"value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                <option value="">Choose an algorithm</option>
                <option value="dijkstra">Dijkstra</option>
                <option value="astar">A*</option>
            </select>  
            <button className="visualize-button" onClick={handleClick}><span>Visualize</span></button>
            </div>
        </header>
    );
}

export default Header;