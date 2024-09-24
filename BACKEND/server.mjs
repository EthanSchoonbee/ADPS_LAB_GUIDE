import https from 'https';
import http from 'http';
import fs from "fs";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import express from "express";
import cors from "cors";
import chalk from "chalk";


//Set the port
const PORT = process.env.PORT || 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE',],
    allowedHeaders: ['Content-Type', 'Authorization',]
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", users);
app.use("/post", posts);

let server = https.createServer(options, app);
console.log(chalk.yellow("PORT:"), chalk.blue(PORT));
server.listen(PORT, () => {
    console.log(chalk.blue(chalk.yellow(`Server is running on `), `https://localhost:${PORT}`));
});