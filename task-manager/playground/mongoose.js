const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, { 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log('connected!');
}).catch((error) => {
    console.log(error);
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        validate(val){
            // console.log(val);
            if (!validator.isEmail(val))
                throw new Error('please check your email format!');
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(val){
            if (!(val.indexOf('password') < 0)){
                throw new Error('password cannot contain "password" string');
            }
        },
        // default: "123456"
    },
    age: {
        type: Number,
        default: 0,
        validate(val){
            if (val < 0)
                throw new Error('age must be positive!');
        }
    }
});

const me = new User({
    name: 'sSky',
    email: 'my@sky.io',
    password: '123456'
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
}).finally(()=>{
    mongoose.disconnect();
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// let task = new Task({
//     description: "buy some apples!"
// });

// task.save().then(()=>{
//     console.log('task saved!');
// }).catch(e => {
//     console.log("task save failed!", e);
// }).finally(()=>{
//     mongoose.disconnect();
// })