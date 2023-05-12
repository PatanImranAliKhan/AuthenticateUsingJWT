const cors = require('cors')

const express = require('express')

const mongoose = require('mongoose')

const app=express();
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://authentication:authentication@firstcluster.fcybv.mongodb.net/test")
.then(() => {
    console.log('mongodb connecteddd......');
});

const router = require('./Route/UserRoute')

app.use('/', router);

app.listen(5000, () => {
    console.log("port connected");
})
