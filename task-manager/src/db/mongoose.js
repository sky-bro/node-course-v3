const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log('connected!');
}).catch((error) => {
    console.log(error);
})

