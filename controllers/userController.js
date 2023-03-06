const {Thoughts, User} = require('../models/user');


const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find()
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  postUser(req, res) {
    User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(500).json(err));
  },

  putUser({ params, body }, res) {
    User.fineOneAndUpdate({ _id: params.userId}, body, {
        new: true, 
        runValidators: true
    })
    .then((dbUser) => {
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID."})
            return
        }
        res.json(dbUser)
    })
    .catch((err) => res.status(500).json(err))
  },

  deleteUser({ params, body}, res) {
    User.findOneAndDelete({ _id: params.userId })
    .then((dbUser) => {
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID."})
            return
        }
        res.json({ message: "User was deleted. What is done, cannot be undone."})
    })
    .catch((err) => res.status(500).json(err))
  }, 

  userAddFriend ({ params, body}, res){
    User.findOneAndUpdate (
        { _id: params.userId },
        { $addToSet: {friends: params.friendId }},
        { new: true, runValidators: true } 
    )
    .then((dbUser) => {
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID."})
            return
        }
        res.json({ message: "Friend Added!"})
    })
    .catch((err) => res.status(500).json(err))
  },

  deleteFriend ({ params, body}, res) {
    User.findOneAndUpdate (
        { _id: params.userId }, 
        { $pull: { friends: params.friendId }}, 
        { new: true }
    )
    .then((dbUser) => {
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID."})
            return
        }
        res.json({ message: "Friend removed. Good riddance."})
    })
    .catch((err) => res.status(500).json(err))
  }

}

module.exports = userController;