const express = require('express');

const app = express();


const DEFAULT_PORT = 3000;

app .listen(DEFAULT_PORT, 'localhost', () => {
        console.log(`Listening on localhost:${DEFAULT_PORT}`);
});