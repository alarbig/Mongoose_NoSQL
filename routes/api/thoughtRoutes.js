const router = require('express').Router();
const {
    getThoughts,
    getThoughtByID, 
    postThought, 
    putThought, 
    deleteThought, 
    postReaction, 
    deleteReaction, 
} = require('../controllers/thoughtRoutes')

router.route('/').get(getThoughts).post(postThought);

router
    .route('/:id')
    .get(getThoughtByID)
    .put(putThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions/:reactionId').post(postReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;