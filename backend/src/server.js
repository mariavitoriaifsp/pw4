const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

app.use(routes);

app.listen(3000, ()=> {
    console.log("conectando na porta padrão 3000")
});