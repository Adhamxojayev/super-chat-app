const router = require('express').Router()
const { registerPOST, loginPOST } = require('./controller.js')

router.route('/register')
      .post( registerPOST )
router.route('/login')
      .post( loginPOST )


module.exports = router