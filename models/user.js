const mongoose = require('mongoose');
const Thoughts = require('./thoughts')
const Users = require('./user')
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, trimmed: true},
    email: { 
        type: String,  
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email address"
        }, 
        required: [true, "Email Required"]
    }, 
    thoughts: [Thoughts], 
    friends: [Users]
})

module.exports = userSchema;