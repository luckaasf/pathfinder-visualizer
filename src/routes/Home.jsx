import React from "react";
import { useState } from "react";
import Grid from "../components/Grid";
import Header from "../components/Header";
import MyContextProvider from "../components/MyContextProvider";

function Home() {
    
    return (
        <MyContextProvider>
            <Header></Header>
            <Grid></Grid>
        </MyContextProvider>
    );
}

export default Home;