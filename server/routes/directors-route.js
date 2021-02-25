const express = require('express')

const directorsRoutes = require('../controllers/directors-controller.js')

const router = express.Router()

router.get('/all', directorsRoutes.directorsAll)
router.post('/create', directorsRoutes.directorCreate)
router.post('/find', directorsRoutes.directorFind)
router.post('/deleteAll', directorsRoutes.directorsClear)

module.exports = router