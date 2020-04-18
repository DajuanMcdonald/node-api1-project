// implement your API here
const express = require('express');
const dataBase = require('./data/db');
const server = express();

const port = process.env.PORT || 3000;

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
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "There was an error."})
    })
    
})

//Creates a user using the information sent inside the `request body`.
server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    dataBase.insert({name: req.body.name, bio: req.body.bio})
    .then( user => {
        if(user) res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

// Updates the user with the specified `id` using data from the `request body`.
server.put('/api/users/:id', (req, res) => {
    dataBase.update(id, {name, bio})
    .then( user => {
        const id = req.params.id;
        const name = req.body.name;
        const bio = req.body.bio;

        
        if(!name) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
        
        if(!bio) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
        
        if(user) {
            res.status(200).json(user)
        }

    })
    .catch( err => {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

//Removes the user with the specified `id`
server.delete('/api/users/:id', (req, res) => {
    dataBase.remove(req.params.id)
    .then( user => {
        
        const id = req.params.id
        dataBase.findById(id)
        dataBase.remove(id)

        if(!user.name || !user.bio) {
            req.status(404).json({messge: "The user with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user could not be removed."})
    })
})

// The server is configured to restart automatically as you make changes.
server.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`)
})