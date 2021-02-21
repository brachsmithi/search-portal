const express = require('express')

const programsRoutes = require('./../controllers/programs-controller.js')

const router = express.Router()

router.get('/all', programsRoutes.programsAll)

module.exports = router