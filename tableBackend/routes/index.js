const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require("../models/userModel")

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name})


    if (!user) return res.json({
        success: false,
        message: 'Authentication failed. User not found.'
    })

    if (user.password !== req.body.password)
        return res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
        })

    return res.json({
        success: true,
        message: 'Enjoy your token!',
        token: jwt.sign({admin: user.admin}, "Marina")
    })

})

router.post('/register', async (req, res) => {

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


module.exports = router
