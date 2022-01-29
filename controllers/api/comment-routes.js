const router = require('express').Router()
const { Comment } = require('../../models')
// const withAuth = require('../../utils/auth')

// GET all comments
router.get('/', (req, res) => {
  console.log('Called GET all comments route.')
})

// POST /
// create comment
// authguard

module.exports = router
