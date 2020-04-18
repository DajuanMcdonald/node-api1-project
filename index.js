// implement your API here
const express = require('express');
const dataBase = require('./data/db');
const server = express();

server.use(express.json());


//Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    dataBase.find()
    .then( user => {
        res.status(200).json(user);

    })
    .catch(err => {
        res.status(500).json({message: "The users information could not be retrieved."})
    })

})

// Returns the user object with the specified id
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

//Creates a user using the information sent inside the `request body`.
server.post('/api/users', (req, res) => {
    dataBase.insert(req.params.body)
    .then( user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

// Updates the user with the specified `id` using data from the `request body`.
server.put('/api/users/:id', (req, res) => {
    dataBase.update(req.params.body)
})

//Removes the user with the specified `id`
server.delete('/api/users/:id', (req, res) => {
    dataBase.remove(req.params.id)
})

// The server is configured to restart automatically as you make changes.
server.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})