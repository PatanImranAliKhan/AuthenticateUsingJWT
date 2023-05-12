const express = require('express')

const userModel = require('../Model/UserModel')

const router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const secret = "who are you";


async function comparePassword(hash, password) {
    console.log(hash, password);
    const status = await bcrypt.compare(password, hash);
    return status;
}

router.route('/').get((req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send({ auth: true, message: 'Active' });
    });
})

router.post('/register', function (req, res) {
    console.log(req.body);
    req.body.Password = bcrypt.hashSync(req.body.Password, 8);
    userModel.create(req.body)
        .then((resp) => {
            var token = jwt.sign({ id: resp._id }, secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            res.status(500).send({auth: false});
        })
});

router.get('/login/:email/:password', function (req, res) {
    email = req.params.email;
    password = req.params.password;
    userModel.findOne({ Email: email })
        .then(async (resp) => {

            if(resp==null) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            const cmp = await comparePassword(resp.Password, password);

            if(!cmp) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            var token = jwt.sign({ id: resp._id }, secret, {
                expiresIn: 3600 // expires in 1 hours
            });

            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            res.status(500).send({ auth: false, Message: "Invalid Credentials" });
        })
});

router.get('/getall', function (req, res) {
    userModel.find()
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            res.send("Error: ",err)
        })
});

module.exports = router;