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
        .sort({ _id: 1 })
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    // get a single user by their ID. api/users/:id
  getUserById({params}, res) {
    User.findOne({ _id: params.id })
    .populate({
      select:"'-__v'",
      path: 'thoughts'
    })
      .populate({
          select:"'-__v'",
          path: 'friends'
      })
      .select("-__v")
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  postUser(req, res) {
    User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(500).json(err));
  },
  //updates a user
  putUser({ req, body }, res) {
    User.fineOneAndUpdate({ _id: req._id}, body, {
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
  //this will delete a user based on their id. 
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then((dbUser) => {
        if (!dbUser) {
            res.status(404).json({ message: "No user with that ID."})
            return
        }
        res.json(dbUser)
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
        res.json(dbUser)
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
        res.json(dbUser)
        res.json({ message: "Friend removed. Good riddance."})
    })
    .catch((err) => res.status(500).json(err))
  }

}

module.exports = userController;