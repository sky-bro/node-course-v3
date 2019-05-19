const express = require('express');
const User = require('../models/user');

const route = new express.Router();

route.post("/users/add", async (req, res) => {
    console.log(req.body);
    let user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch(e){
        res.status(400).send(e);
    }
});

route.delete("/users/:id", async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
})

route.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: "invalid updates"});
    }

    try {
        let user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).send();
        }
        Object.assign(user, req.body);
        await user.save();
        res.send(user);
    } catch(e){
        res.status(400).send(e);
    }
})

route.get("/users", async (req, res) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch(e){
        res.status(500).send();
    }
})

route.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let user = await User.findById(_id);
        if (!user){
            res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(400).send();
    }
})

module.exports = route;