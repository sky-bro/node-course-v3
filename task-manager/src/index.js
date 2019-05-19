const express = require('express');

require('./db/mongoose');
const User = require('./models/user');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/users/add", (req, res) => {
    console.log(req.body);
    let user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch(e => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log('server listening at port '+port);
})