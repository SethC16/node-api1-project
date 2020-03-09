const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [];

server.use(express.json());

// Get - get all users
server.get("/api/users", (req, res) => {
    res.status(200).json(users);

    // res.status(500).json({errorMessage: "The users information could not be retrieved."})
})

// Post - to add users
server.post("/api/users", (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({error: "Please provide name and bio for the user."})  
    } else {
       user.id = shortid.generate();
       res.status(201).json(users)
       users.push(user)
    } 
        
        // res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    
})

// Get user by user-Id
server.get("/api/users/:id", (req, res) => {
    if (!req.params.id)
        res.status(404).json({message: "The user with the specified ID does not exist."});
    
    res.status(500).json({errorMessage: "The user information could not be retrieved."})

    res.status(200).json(users)
})

// Delete user by user-Id
server.delete("/api/users/:id", (req, res) => {
    res.status(404).json({message: "The user with the specified ID does not exist."})

    res.status(500).json({errorMessage: "The user could not be removed."})

    res.status(200).json(users)
})

// Patch - update user with the specificed ID
server.patch("/api/users/:id", (req, res) => {

    res.status(404).json({message: "The user with the specified ID does not exist."})

    res.status(400).json({errorMessage: "Please provide a name and bio for the user."})

    res.status(500).json({errorMessage: "The user information could not be modified."})

    res.status(200).json(users)

})

const PORT = 5000;
server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} **\n`))