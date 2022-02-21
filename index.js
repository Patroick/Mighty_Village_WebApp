const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/public/index.html'))
});

app.get('/webgame/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/webgame/index.html'))
})

app.get('/infoseite/public/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/public/index.html'))
});

let PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`My REST API running on port ${PORT}`);
})

// Zum starten --> npm run dev 
// Für die GUI --> vue ui