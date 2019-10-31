const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')



router.get('/test', testController.test)
router.get('/user',userController.all)




module.exports = router