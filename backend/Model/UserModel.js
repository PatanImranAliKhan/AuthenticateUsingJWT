const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Username: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Mobile: {
        type: String,
        require: true
    },
    Password: {
        type: String
    }
});

module.exports = new mongoose.model('User',schema);