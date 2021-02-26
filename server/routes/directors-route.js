const express = require('express')

const directorsRoutes = require('../controllers/directors-controller.js')

const router = express.Router()

router.get('/all', directorsRoutes.directorsAll)
router.post('/create', directorsRoutes.directorCreate)
router.post('/find', directorsRoutes.directorFind)
router.post('/deleteAll', directorsRoutes.directorsClear)
router.post('/addprogram', directorsRoutes.programAdd)
router.post('/addalias', directorsRoutes.aliasAdd)

module.exports = router