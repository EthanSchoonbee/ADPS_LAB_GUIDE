import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb"; 
import chalk from "chalk";
import checkauth from "../check_auth.mjs";

const router = express.Router();

//Middleware for async error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

//Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("\n" + chalk.red(err.stack));
    res.status(500).send({ error: err.message });
};

//Get all the records
router.get("/", checkauth, asyncHandler(async (req, res) => {
    const collection = await db.collection("posts");
    const result = await collection.find({}).toArray();
    res.status(200).send(result);
}));

//Get a specified record by id
router.get("/:id", checkauth,  asyncHandler(async (req, res) => {
    const collection = await db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
        return res.status(404).send("Not Found");
    }
    else res.status(200).send(result);
}));

//Create new record
router.post("/uploads", checkauth,  asyncHandler(async (req, res) => {
    const { user, content, image } = req.body;
    const newDocument = { user, content, image };
    const collection = await db.collection("posts");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
}));

//Update a specified record by id
router.patch("/:id", checkauth,  asyncHandler(async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            user: req.body.user,
            content: req.body.content,
            image: req.body.image
        }
    };

    const collection = await db.collection("posts");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
        return res.status(404).send("Not Found");
    }
    res.status(200).send(result);
}));

//Delete a specified record by id
router.delete("/:id", checkauth,  asyncHandler(async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("posts");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
        return res.status(404).send("Not Found");
    }
    res.status(200).send(result)
}));

router.use(errorHandler);

export default router;