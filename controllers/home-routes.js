const router = require('express').Router()
// const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }))
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// GET /login
// redirect to login/homepage
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

// GET /post/:id
// get post by id to render single-post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return
      }

      // serialize the data
      const post = dbPostData.get({ plain: true })

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
