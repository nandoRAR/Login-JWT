const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidate, registerValidate} = require('./validate');


const userController = {
    register: async function (req, res) {

        const {error} = registerValidate(req.body);
        if(error) { return res.status(400).json({error: error.message})};

        const selectedUser = await User.findOne({email:req.body.email});
        if(selectedUser) return res.status(400).json({error: 'Email already exist'});

        const user = new User({
            name: req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try {
            const savedUser = await user.save();
            const token = jwt.sign({_id: savedUser._id, admin: savedUser.admin}, process.env.TOKEN_SECRET, {expiresIn: 300});
            res.json({user: savedUser, token});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    login: async function (req, res) {
        const {error} = loginValidate(req.body);
        if(error) { return res.status(400).json({error: error.message})}
        const selectedUser = await User.findOne({email:req.body.email});
        if(!selectedUser) return res.status(400).json({error: 'Email or Password incorrect'});
        
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if(!passwordAndUserMatch) return res.status(400).json({error:'Email or Password incorrect'});
        
        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET, {expiresIn: 300});

        /* res.header('authoriztion-token', token);
        res.send("User logged") */
        res.json({status: true, token});

    }
};

module.exports = userController;