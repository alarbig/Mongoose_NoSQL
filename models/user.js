const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, trimmed: true},
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
    thoughts: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Thoughts"
        }
    ], 
    friends: [
        {
            type: Schema.Types.ObjectId, 
            ref: "User"
        }
    ]
})

UserSchema.virtual("friendCount").get(function(){
    return this.friends.length
}) 

const User = model("User", UserSchema)
module.exports = {User};