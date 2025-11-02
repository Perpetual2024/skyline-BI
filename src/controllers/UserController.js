const User = require('../model/user');

exports.createUser = async(req, res) => {
    try{
        const { username, phone, email, password } = req.body;
        const newUser = await User.create({username, email, phone, password});
        res.status( 201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getAllUsers = async(req, res) => {
    try{
    const users = User.findAll();
    res.status(200).json(users)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}