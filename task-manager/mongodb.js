// CRUD creat read update delete

const { MongoClient, ObjectID } = require('mongodb');

console.log(new Date());
// return console.log(new ObjectID().getTimestamp());

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error){
        return console.log(`Unable to connect ${databaseName}!`);
    }
    console.log(`Connected correctly to ${databaseName}!`);
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'sky',
    //     age: 20
    // }, (error, result) => {
    //     if (error){
    //         return console.log('unable to insert user');
    //     }
    //     console.log(result.ops);
    // });

    db.collection('tasks').insertMany([
        {
            description: 'buy apples',
            completed: true
        },
        {
            description: 'go to bed early',
            completed: false
        },
        {
            description: 'review compilers',
            completed: false
        }
    ], (error, result) => {
        if (error){
            return console.log('unable to insert tasks');
        }
        console.log(result.ops);
    });

    db.collection('tasks').findOne({completed: false}, (error, result) => {
        if (error){
            return console.log(error);
        }
        console.log(result);
    });

    db.collection('tasks').find({completed:false}).count((error, count) => {
        if (!error)
            console.log(`got ${count} result`);
    })

    db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
        if (!error)
            console.log(tasks);
    })



    client.close();
})