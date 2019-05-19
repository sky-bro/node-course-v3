const express = require('express');

require('./db/mongoose');

const taskRoute = require('./route/taskRoute');
const userRoute = require('./route/userRoute');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(taskRoute);
app.use(userRoute);

app.listen(port, () => {
    console.log('server listening at port '+port);
})