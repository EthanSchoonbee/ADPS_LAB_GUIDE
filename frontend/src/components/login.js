import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        console.log(`Login Attempted!`);

        const newUser = { ...form };

        try {
            const response = await fetch("https://localhost:3001/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
    
            if (!response.ok) {
                const message = `Login failed: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const data = await response.json();
            const { token, username } = data;

            if (token && username) {
                localStorage.setItem("jwt", token);
                localStorage.setItem("username", username);

                console.log("Credentials Correct!");
                console.log(username + " " + token);

                setForm({ name: "", password: "" });
                navigate("/"); 
            } else {
                window.alert("Login failed: Invalid credentials!");
            }
        } catch (error) {
            window.alert("An error occured during login. Please try again.");
            console.error("Login error:", error);
        }    
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type= "text"
                        className= "form-control"
                        id= "username"
                        value= {form.username}
                        onChange= {(e) => updateForm({ username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type= "text"
                        className= "form-control"
                        id= "password"
                        value= {form.password}
                        onChange= {(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type= "submit"
                        value= "Login"
                        className= "btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}