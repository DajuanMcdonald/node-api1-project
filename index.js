// implement your API here
/*
*           Introduction to Node.js and Express
On this lecture we will:

introduce node.js and Express.
what is node.js, what can it do? what can’t it do?
what is Express? why use it?
relationship between Express and node.js.
see a high level overview of the main features of Express.
learn how to manually test our Web API using a tool called Postman.
create our first CRUD Web API.
At the end of this module, you should be able to:
explain what Node.js is and its core features
explain what Express is and its core features
create an API that can respond to GET requests
use postman to manually test Web APIs

Heroku-APIAPI created
API added to current workspace

NEXT STEPS
[] Draft your schema
[] Add endpoints and operation methods to your schema. 
[] Once the schema is set, you can use it to validate all the API elements you 
added and keep them in sync going forward. Learn more about schema validation.
[] Build out your API
[] Create new documentation or write new test suites by generating collections 
directly from the schema.
[] Add API elements
[] Keep all the related mock servers, environments, monitors and test 
suites in one place for easier management and organization.
*
 */
const express = require('express');
const dataBase = require('./data/db');
const server = express();


server.use(express.json());

//Introduction
server.get('/', (req, res) => {
    res.status(200).send('<h1>Introduction to Node.js and Express</h1> <p>you should be able to:</p> <ul><li>explain what Express is</li><li>explain what Node.js is</li><li>create an API</li><li>use Postman to manually test</li></ul>');
})

//Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    // const name = req.body.name;
    dataBase.find()
    .then( user => {
        res.status(200).jsonp(
            {users : user});
        
    })
    .catch(err => {
        res.status(500).jsonp({message: "The users information could not be retrieved."})
    })
    
})

// Returns the user object with the specified id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    dataBase.findById(id)
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
        if(user) res.status(201).jsonp(
            {newuser: user})
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

// Updates the user with the specified `id` using data from the `request body`.
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;
    dataBase.update(id, {name, bio})
    .then( user => {
        
        if(!name || !bio ) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        } else {
            res.status(200).json(user)
        }

    })
    .catch( err => {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

//Removes the user with the specified `id`
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    if (!id) {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    } else {
        
        dataBase.remove(id)
        .then( user => {
            dataBase.findById(id)
            dataBase.remove(id)
            
            if(!user.name || !user.bio) {
                req.status(404).json({messge: "The user with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The user could not be removed."})
        })
    }
    
})

// The server is configured to restart automatically as you make changes.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`)
})