const { Schema, Types } = require('mongoose');
const mongoose = require('mongoose');
const thoughtsSchema = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    }, 
    thoughtText: {
        type: String, 
        required: true, 
        maxLength: 280
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
        getters: true,
    }, 
    username: {
        type: String, 
        required: true,
    }, 
    reactions: [reactionSchema]
    
})

module.exports = thoughtsSchema;