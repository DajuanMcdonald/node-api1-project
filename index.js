// implement your API here
const express = require('express');
const dataBase = require('./data/db');
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    dataBase.find()
    .then( user => {
        res.status(200).json(user);

    })
    .catch(err => {
        res.status(500).json({message: "The users information could not be retrieved."})
    })

})

server.get('/api/users/:id', (req, res) => {
    dataBase.findById(req.params.id)
    .then( user => {
        if(user) {
            res.status(200).json(user)

        } else {
            res.status(404).json({message: "user not found."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "There was an error."})
    })
    
})

server.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})