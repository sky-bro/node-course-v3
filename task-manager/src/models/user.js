const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user){
        throw new Error('Unable to login!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('match!');
    if (!isMatch){
        throw new Error('Unable to login!');
    }

    return user;
}

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;