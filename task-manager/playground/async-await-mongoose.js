const mongoose = require('mongoose');

require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

const deleteTaskAndCount = async (id) => {
    let count = await Task.countDocuments({});
    console.log('Count before task-delete', count);
    let task = await Task.findByIdAndDelete(id);
    console.log('task deleted', task);
    count = await Task.countDocuments({});
    return count;
}

const updateUserAndCount = async (id, age) => {
    let count = await User.countDocuments({age});
    console.log('Count before user-update', count);
    let user = await User.findByIdAndUpdate(id, {age});
    console.log('user updated', user);
    count = await User.countDocuments({age});
    return count;
}

deleteTaskAndCount("5ce0f0b88f11c17cd4fdba11").then((result) => {
    console.log(result);
}).catch(e => {
    console.log(e);
});

updateUserAndCount("5ce10e5fccf2d94469d46536", 20).then((result) => {
    console.log(result);
}).catch(e => {
    console.log(e);
}).finally(()=>mongoose.disconnect());