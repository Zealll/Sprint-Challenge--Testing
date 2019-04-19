const express = require('express')
const server = express()
const db = require('../games/helpers.js')

server.use(express.json())



server.get('/', (req,res) => {
    db
    .get()
    .then(intro => {
        res.status(200).json({message: 'Welcome to the Project'})
    })
})

server.get('/games', async (req, res) => {
    const games = await db.get();
    res.status(200).json(games);
});

server.post('/games', async (req, res) => {
    const body = req.body
    if (!body.title || !body.genre) { 
        return res.status(422).json({ 
            message:"PLease fill out the required fields: 'title', and/or 'genre'."
        })
    }
    try {
        const newGame = await db.insert(body);
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = server