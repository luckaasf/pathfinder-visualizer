import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MyContextProvider from "../components/MyContextProvider";
import Header from "../components/Header";
import '../assets/stylesheets/Signup.css';

function Signup() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        console.log(email);
        console.log(username);
        console.log(password);
        console.log(confirmPassword);

        fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                confirm_password: confirmPassword
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Successful Signup", response.statusText);
                alert("Account created");
                navigate('/login');
            } else {
                console.log("Error on registration", response.statusText);
                alert("There was an error in one of the fields, try again.");
            }
        })
        .catch(error => console.log("Error: ", error))
    }
    
    return (   
        <MyContextProvider>
            <Header></Header>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className="input-box">
                        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="confirm_password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    </div>
                    <button type="submit" className="submit-register-button">Sign Up</button>
                </form>
                <div className="login-box">Already have an account? <a href="/login">Log in</a></div>
            </div>     
        </MyContextProvider>
    );
}

export default Signup;