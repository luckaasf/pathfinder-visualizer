import React from "react";
import MyContextProvider from "../components/MyContextProvider";
import Header from "../components/Header";
import '../assets/stylesheets/Signup.css';

function Signup() {
    return (   
        <MyContextProvider>
            <Header></Header>
            <div className="signup-container">
                <form className="signup-form">
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" name="email" placeholder="Email" required></input>
                    </div>
                    <div className="input-box">
                        <input type="text" name="username" placeholder="Username" required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="confirm-password" placeholder="Confirm Password" required></input>
                    </div>
                    <button type="submit" className="submit-register-button">Sign Up</button>
                </form>
                <div className="login-box">Already have an account? <a href="/login">Log in</a></div>
            </div>     
        </MyContextProvider>
    );
}

export default Signup;