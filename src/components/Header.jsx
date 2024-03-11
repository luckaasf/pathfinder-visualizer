import React, { useContext } from "react";
import '../assets/stylesheets/Header.css';
import MyContext from "./MyContext";

function Header() {

    const { isAlgorithmRunning, startAlgorithm } = useContext(MyContext);

    function handleClick() {
        startAlgorithm();
    }

    return(
        <header className="header-container">
            <button className="visualize-button" onClick={handleClick}><span>Visualize</span></button>
        </header>
    );
}

export default Header;