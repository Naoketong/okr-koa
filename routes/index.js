const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')
const todoController = require('./../controllers/todo.js')
const objController = require('./../controllers/objective.js')
const okrController = require('./../controllers/okr.js')



router.get('/test', testController.test)
router.get('/todo',todoController.show)
router.post('/todo',todoController.insert)
router.put('/todo/:id',todoController.update)
router.delete('/todo/:id',todoController.delete)

router.post('/obj',objController.insert)
router.delete('/obj/:id',objController.delete)

router.post('/okr', okrController.insert)




module.exports = router