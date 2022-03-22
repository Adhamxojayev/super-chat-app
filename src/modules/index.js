const authModule = require('./auth/router.js')
const userModule = require('./user/router.js')



module.exports = [
    authModule,
    userModule
]