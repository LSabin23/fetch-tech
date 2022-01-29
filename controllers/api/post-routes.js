const router = require('express').Router()
const { Post, User, Comment } = require('../../models')
const sequelize = require('../../config/connection')
// const withAuth = require('../../utils/auth')

// GET all posts
router.get('/', (req, res) => {
  console.log('Called GET all posts route.')
})

// GET individual post

// POST /api/posts
// create new post
// authguard

// PUT /:id
// update a post (dashboard route?)
// authguard

// DELETE /:id
// delete a post (dashboard route?)
// authguard

module.exports = router
