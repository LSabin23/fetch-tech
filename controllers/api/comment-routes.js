const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text',
      'user_id',
      'post_id'
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// POST /
// create comment
// authguard
router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  }
})

// PLACEHOLDER
// DELETE /:id
// delete comments
// authguard

module.exports = router
