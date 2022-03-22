const router = require('express').Router()
const { USER, MESSAGE, MESSAGE_GET } = require('./controller.js')

router.route('/users')
      .get( USER )
router.route('/message')
      .post( MESSAGE )    
      .get( MESSAGE_GET )  



module.exports = router