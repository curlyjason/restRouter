const express = require('express');
const api_routes = require('./src/routes/ApiRoutes');

const app = express();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use('/api/', api_routes);

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

