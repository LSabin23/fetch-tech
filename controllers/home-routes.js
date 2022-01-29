const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
  console.log('Called home GET route')
})

// GET /login
// redirect to login/homepage

// GET /post/:id
// get post by id to render single-post page

module.exports = router
