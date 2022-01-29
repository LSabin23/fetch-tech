const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
// const withAuth = require('../utils/auth')

// GET main dashboard page
// authguard
router.get('/', (req, res) => {
  console.log('Called dashboard GET route.')
})

// GET /edit/:id
// authguard
// get one post then render edit-post template

module.exports = router
