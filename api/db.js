const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const JSON_PATH = '../json/vdo.json'; // ផ្លូវទៅកាន់ file json របស់អ្នក

// --- មុខងារទាញយកទិន្នន័យ (Read) ---
app.get('/videos', (req, res) => {
    const data = fs.readFileSync(JSON_PATH);
    res.json(JSON.parse(data));
});

// --- មុខងារបន្ថែមថ្មី (Insert) ---
app.post('/videos', (req, res) => {
    const data = JSON.parse(fs.readFileSync(JSON_PATH));
    const newVideo = { 
        id: Date.now(), 
        title: req.body.title, 
        description: req.body.description 
    };
    data.push(newVideo);
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
    res.json(newVideo);
});

// --- មុខងារលុប (Delete) ---
app.delete('/videos/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(JSON_PATH));
    data = data.filter(v => v.id != req.params.id);
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
    res.json({ message: "Deleted!" });
});

app.listen(5000, () => console.log('Server running on port 5000'));