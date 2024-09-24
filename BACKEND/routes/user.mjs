import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";
import chalk from "chalk";

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

//Sign up
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newDocument = {
            username: req.body.username,
            password: hashedPassword
        };
        const collection = await db.collection("users");
        const result = await collection.insertOne(newDocument);
        console.log("\nPassword:" + chalk.green(hashedPassword));
        res.status(201).send(result);
    } catch (e) {
        console.error(chalk.red("\nSignup error:"), e);
        res.status(500).json({ message: "Signup failed" });
    }
});

//Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(chalk.blue("\nCredentials:"), username + "|" + password);

    try {
        const collection = await db.collection("users");
        const user = await collection.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed - Username not found" });
        }

        //Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed - Password mismatch" });
        }
        else {
            //Authentiction successful
            const token = jwt.sign(
                { username: username},
                "this_secret_should_be_longer_than_it_is",
                { expiresIn: "1h" }
            );
            res.status(200).json({ 
                message: "Authentication successful", 
                token: token, 
                username: username 
            });
            console.log("Your new token is", chalk.green(token));     
        }
    } catch (e) {
        console.error(chalk.red("Login error:"), e);
        res.status(500).json({ message: "Login failed" });
    }
});

export default router