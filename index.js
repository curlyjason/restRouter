'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

console.log('Running');

app.get('/', (req, res) => {
    const rootRoutes = require('./working/rootRoutes');
    res.status(200).send(rootRoutes());
})

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});