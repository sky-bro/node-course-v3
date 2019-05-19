const express = require('express');
const Task = require('../models/task');

const route = new express.Router()

route.post("/tasks/add", async (req, res) => {
    console.log(req.body);
    let task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch(e){
        res.status(400).send(e);
    }
});

route.delete("/tasks/:id", async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        if (!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
})

route.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: "invalid updates"});
    }

    try {
        let task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch(e){
        res.status(400).send(e);
    }
})

route.get("/tasks", async (req, res) => {
    try {
        let tasks = await Task.find();
        res.send(tasks);
    } catch(e){
        res.status(500).send();
    }
})

route.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let task = await Task.findById(_id);
        if (!task){
            res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(400).send();
    }
})


module.exports = route;