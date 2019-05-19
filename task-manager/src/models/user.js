const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User;