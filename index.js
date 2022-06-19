// Importiert das ExpressJS Module
const express = require('express');

// Erstellt eine Express Anwendung
const app = express();

// Importiert das ExpressJS Path Module um mit Files und Directory Paths arbeiten zu können
const path = require('path');

// Wenn auf dem Server eine Get Request auf das Root Verzeichnis geschickt wird, wird mit der Infoseite vom Server geantwortert
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/index.html'))
});

// Wenn auf dem Server eine Get Request auf die Webgame Index.html geschickt wird, wird mit dieser vom Server geantwortert
app.get('/webgame/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/webgame/index.html'))
});

// Wenn auf dem Server eine Get Request auf die Infoseite Index.html geschickt wird, wird mit dieser vom Server geantwortert
app.get('/infoseite/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/infoseite/index.html'))
});

// app.use ladet die Ressourcen vom mitgegeben Directory durch path.join. Diese sind die NodeJS Modules und die JS Skripte welche für das Spiel benötigt werden
app.use('/webgame/pictures', express.static(path.join(__dirname, '/webgame/pictures')));
app.use('/webgame/audio', express.static(path.join(__dirname, '/webgame/audio')));
app.use('/webgame/JS', express.static(path.join(__dirname, '/webgame/JS/Coing Logic')));
app.use('/webgame/JS', express.static(path.join(__dirname, '/webgame/JS/Production')));
app.use('/webgame/JS', express.static(path.join(__dirname, '/webgame/JS/Shop')));
app.use('/webgame/JS', express.static(path.join(__dirname, '/webgame/JS')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// Definiert den Port auf dem der Server über localhost abrufbar ist
let PORT = 80;

// Gibt an auf welchen Port unsere Anwendung "hört"
app.listen(PORT, () => {});

// Zum starten --> npm run start:dev