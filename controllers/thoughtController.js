const { Thoughts, User } = require ('../models')

const thoughtcontroller = {
    getThoughts(req, res) {
        Thoughts.find({}).populate({
            path:'reactions', 
            select:'-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then((dbThoughts) => res.json(dbThoughts))
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        });
    }, 

    getThoughtByID ({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate ({
            path: 'reactions',
            select:'-__v'
        })
    }




}

module.exports = thoughtcontroller;