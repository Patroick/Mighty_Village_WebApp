const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/index.html'))
});

app.get('/webgame/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/webgame/index.html'))
})

app.get('/webgame/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/webgame/css/style.css'))
})

app.get('/infoseite/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/index.html'))
});

app.get('/webgame/test.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/webgame/test.html'))
});


app.use('/webgame/pictures', express.static(path.join(__dirname, '/webgame/pictures')));

let PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`My REST API running on port ${PORT}`);
})

// Zum starten --> npm run dev 