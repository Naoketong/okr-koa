const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')
const todoController = require('./../controllers/todo.js')



router.get('/test', testController.test)
router.get('/todo',todoController.show)
router.post('/todo',todoController.insert)
router.put('/todo/:id',todoController.update)
router.delete('/todo/:id',todoController.delete)




module.exports = router