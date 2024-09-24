import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/api/data', (req, res) => {
    const { data } = req.body;
    console.log('Data:', data);
    res.json({message: 'Data Captured!'});
});

export default app;