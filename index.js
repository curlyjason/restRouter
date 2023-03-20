'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

console.log('Running');

app.get('/:file', (req, res) => {
    let render = require(`./output/${req.params.file}`);
    // console.log('--------------new request');
    // console.log(render());
    let output = render();
    // render = null
    // console.log(render);
    // console.log('--------------end request');

    res.status(200).send(output);
})

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});