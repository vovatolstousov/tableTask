const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const User = require("../models/userModel")

router.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['Authorization'];
    if (token) {
        jwt.verify(token, "Marina", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
router.get('/', (req, res) => {
    User.find({}, function (err, users) {
        res.json(users);
    });
});
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, function (err, users) {
        res.json(users);
    });
});


router.post('/', async (req, res) => {

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin || false
    });

    try {
        await user.save()

        console.log('User saved successfully');
        res.json({success: true});

    } catch (err) {
        throw err
    }

});

router.delete('/:id', async (req, res) => {

    try {
        User.remove({_id: req.params.id}).exec();

        console.log('User deleted successfully');
        res.json({success: true});

    } catch (err) {
        throw err
    }

});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)


module.exports = router