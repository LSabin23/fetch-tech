const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
  console.log('Called GET all users route.')
})

// GET /api/users/:id

// POST /api/users
// create a new user

// POST /login
// allow user to login with username
// validate provided password
// save to session

// POST /logout
// destroy the session if a user is logged in to log them out

module.exports = router
