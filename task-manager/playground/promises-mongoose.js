const mongoose = require('mongoose');
require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndUpdate('5ce0f15bcceff77db03a42ff', {
    completed: true
}).then((task) => {
    console.log(task);
    return Task.countDocuments({completed: true});
}).then((completedCount) => {
    console.log(completedCount);
}).catch(e => {
    console.log(e);
}).finally(() => {
    mongoose.disconnect();
})