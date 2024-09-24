import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const connectionString = process.env.ATLAS_URI;

if (!connectionString) {
    throw new Error(chalk.red("\nATLAS_URI environment variable is not set."));
}

console.log(chalk.yellow("\nConnecting to MongoDB with connection string: "), connectionString);

let db;
const client = new MongoClient(connectionString);


async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            db = client.db("users");
            console.log(chalk.green('\nMongoDB is connected'));
        } catch (e) {
            console.error(chalk.red('\nFailed to connect to MongoDB', e));
            throw e;
        }
    }
    return db;
}

export default await connectToDatabase();