const { Thoughts, User } = require ('../models/thoughts')
// the first function is the get all thoughts function. It selects all thoughts. 
const thoughtController = {
    getThoughts(req, res) {
        Thoughts.find({}).populate({
            path:'reactions', 
            select:'-__v'
        })
        .select('-__v')
        .sort({ _id: 1 })
        .then((dbThoughts) => res.json(dbThoughts))
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        });
    }, 
// This will select a single thought based on the ID of the thought itself. It search's for all thoughts and then find the single one with a matching ID.
    getThoughtByID ({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate ({
            path: 'reactions',
            select:'-__v'
        })
        .select('-__v')
        .then ((dbThoughts) => {
            if (!dbThoughts) {
                return res.status(404).json({message: 'No thought with that id!'})
            }
            res.json(dbThoughts);
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        });
    },
// with this you can post a thought and it will append the thought ID to the posted thought via the $push command. 
    postThought({ params, body}, res ){
        Thoughts.create(body)
        .then(({ _id }) =>{
            return User.findOneAndUpdate(
                { _id: body.userId }, 
                { $push: { thoughts: _id }}, 
                { new: true }
            )
        })
        .then ((dbThoughts => {
            if (!dbThoughts) {
                return res.status(404).json({ message: 'Error something went wrong, please try again'})
            }
            res.json({ message: "Thought created!" })
        })
        
        ) .catch((err) => res.json(err))
    }, 
//updates a thought based on the id value. 
    putThought({ params, body}, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, {
            new:true, 
            runValidators: true,
        } )
        .then ((dbThoughts => {
            if (!dbThoughts) {
                return res.status(404).json({ message: 'Error something went wrong, please try again'})
            }
            res.json({ message: "Thought updated!" })
        })
        
        ) .catch((err) => res.json(err))
    }, 
// deletes a thought based on the thought ID. 
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then((dbThoughts) => {
            if (!dbThoughts){
                return res.status(404).json({ message: 'Error something went wrong, please try again'})
            }
            return User.findOneAndUpdate(
                { thoughts: params.id},
                { $pull: {thoughts: params.id}}, 
                 {new: true}
            );
            })
            .then((dbUser) => {
                if (!dbUser) {
                    return res.status(404).json({ message: 'Error something went wrong'})
                }
                res.json({ message: "Thought was deleted!"})
            })
            .catch((err) => res.json(err));
    },
// with the $addtoSet command, you can post a reaction based on the thoughts ID. 
    postReaction ({ params }, res ){
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then((dbThoughts) => {
            if (!dbThoughts) {
                return res.status(404).json({ message: 'Error something went wrong'})
            }
            res.json(dbThoughts)
            res.json({ message: "Reaction added!"})
        })
        .catch ((err) => {
            res.json(err)
        })
    }, 
// $pull will remove a specific value, in this case based on the thought ID. 
    deleteReaction({ params}, res ){
        Thoughts.findOneAndUpdate (
            { _id: params.thoughtId }, 
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then((dbThoughts) => {
            if (!dbThoughts) {
                return res.status(404).json({ message: 'Error something went wrong'})
            }
            res.json({ message: "Reaction deleted. What is done cannot be undone."})
        })
        .catch ((err) => {
            res.json(err)
        })
    }

}

module.exports = thoughtController;