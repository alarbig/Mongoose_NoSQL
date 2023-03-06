const router = require('express').Router();

const {
    getAllUsers, 
    getUserById, 
    postUser, 
    putUser, 
    deleteUser, 
    userAddFriend, 
    deleteFriend
} = require('../../controllers/userController');

router
    .route("/")
    .get(getAllUsers)
    .post(postUser)

router.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(userAddFriend).delete(deleteFriend);

module.exports = router;