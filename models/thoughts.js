const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    }, 
    reactionBody: {
        type: String, 
        required: true,
        maxLength: 280
    }, 
    username: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
    }
}, 
{
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

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
    reactions: [reactionSchema],

},
    {
        toJSON: {
          getters: true,
        },
        id: false,
      },
    
)

thoughtsSchema.virtual("reactionCount").get(function (){
    return this.reactions.length
})


const Thoughts = model("Thoughts", thoughtsSchema)
module.exports = {Thoughts};