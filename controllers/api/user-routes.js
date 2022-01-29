const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
  console.log('Called GET all users route.')
})

// GET /api/users/:id

// POST /api/users
// create a new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.loggedIn = true
        res.json(dbUserData)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// POST /login
// allow user to login with username
// validate provided password
// save to session
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'Could not find user with that username!' })
      return
    }

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true

      res.json({ user: dbUserData, message: 'You are now logged in!' })
    })
  })
})

// POST /logout
// destroy the session if a user is logged in to log them out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
