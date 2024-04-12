import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContextProvider from "../components/MyContextProvider";
import Header from "../components/Header";
import '../assets/stylesheets/Login.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
    
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (response.ok){
                console.log("Successful Sign up")
                return response.json();
            } else {
                console.log("Error on log in", response.statusText);
                alert("Invalid credentials");
            }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", data.email);
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            navigate('/');
        })
        .catch(error => console.log("Error: ", error))
    }

    return(
        <MyContextProvider>
            <Header></Header>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div className="input-box">
                        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <div className="register-box">Don't have an account? <a href="/signup">Register</a></div>
            </div>
        </MyContextProvider>
    );
}

export default Login;