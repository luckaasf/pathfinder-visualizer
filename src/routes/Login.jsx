import React from "react";
import MyContextProvider from "../components/MyContextProvider";
import Header from "../components/Header";
import '../assets/stylesheets/Login.css';

function Login() {
    return(
        <MyContextProvider>
            <Header></Header>
            <div className="login-container">
                <form className="login-form">
                    <h1>Log In</h1>
                    <div className="input-box">
                        <input type="text" name="username" placeholder="Username" required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" required></input>
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <div className="register-box">Don't have an account? <a href="/signup">Register</a></div>
            </div>
        </MyContextProvider>
    );
}

export default Login;