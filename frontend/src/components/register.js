import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        console.log("Registration Attempted!");

        const newUser = { ...form };

        try {
            const response = await fetch("https://localhost:3001/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            })
    
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            console.log("Account Created Successfully!");

            setForm({ username: "", password: "" });
            navigate("/");
            
        } catch (error) {
            window.alert("Failed to create account. PLease try again.");
        }
    } 

    return(
        <div>
            <h3>Register</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={form.name}
                            onChange={(e) => updateForm({ username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            value={form.position}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        value="Create user"
                        className="btn btn-primary"
                        />
                    </div>
                </form>
        </div>
    );
}