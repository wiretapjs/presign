const express = require('express')
const router = express.Router()

router.use('/ceremonies', require('./ceremonies'))
router.use('/authentication', require('./authentication'))
router.use('/registration', require('./registration'))
router.use('/policies', require('./policies'))
router.use('/esign', require('./esign'))
router.use('/documents', require('./documents'))

module.exports = router
