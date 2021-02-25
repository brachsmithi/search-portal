const express = require('express')

const programsRoutes = require('./../controllers/programs-controller.js')

const router = express.Router()

router.get('/all', programsRoutes.programsAll)
router.post('/create', programsRoutes.programCreate)
router.post('/find', programsRoutes.programFind)
router.post('/deleteAll', programsRoutes.programsClear)

module.exports = router