const express = require('express');
const adminModel = require('../models/AdminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validation');

//Register admin
router.post('/register', async (req, res) => {
    //VALIDATE DATA BEFORE CREATE ACC
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if the user is already in the database
    const emailExist = await adminModel.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    const userExist = await adminModel.findOne({username: req.body.username});
    if(userExist) return res.status(400).send('This username alread exist');
    
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create admin account
    const adUser = new adminModel({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    try {
        const savedUser = await adUser.save();
        res.send({ adUser: adUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

//Admin login
router.post('/login', async (req, res) => {
    //Validation data before login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Check the existing user
    const user = await adminModel.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Username or password is wrong');
    // Check password if correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged in!');
});

module.exports = router;