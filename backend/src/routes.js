const express = require('express');

const routes = express.Router();

let players = [
    {username: "admin", password: "123"},
    {username: "maria", password: "1234"},
];

let pokemons = [];

routes.post('/login', (req, res) => {
    
    const {password , username} = req.body;
    const foundPlayer = players.find((player) => player.username === username && player.password === password);

    if (foundPlayer) 
        return res.status(200).send(foundPlayer);
    else
        return res.status(401).send({ message: "Credencial inválida" });

})

routes.post('/pokemon/', (req, res) => {
    
    const { nome, altura, peso, foto } = req.body;

    const findDuplicate = pokemons.find(pokemon => pokemon.nome.toLowerCase() === nome.toLowerCase());
    if (findDuplicate) 
        return res.status(401).json({ message: "Pokemon já foi cadastrado." });
    
    pokemons = [...pokemons, { nome, altura, peso, foto }];
    return res.status(200).json({ message: "Pokemon cadastrado com sucesso." });        

})

routes.get('/pokemon/', (req, res) => {
    return res.status(200).json(pokemons);
})

module.exports = routes;