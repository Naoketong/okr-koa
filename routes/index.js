const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')
const todoController = require('./../controllers/todo.js')
const objController = require('./../controllers/objective.js')
const okrController = require('./../controllers/okr.js')
const keyresultController = require('./../controllers/keyresult.js')
const todoKeyresultController = require('./../controllers/todoKeyresult.js')

router.post('/login', userController.login)

router.get('/test', testController.test)
router.get('/todo',todoController.show)
router.post('/todo',todoController.insert)
router.put('/todo/:id',todoController.update)
router.delete('/todo/:id',todoController.delete)

router.get('/okr', okrController.show)
router.post('/okr', okrController.insert)
router.get('/okr/:id', okrController.person)
router.put('/okr/:id', okrController.update)

router.put('/keyresult/:id', keyresultController.update)
router.delete('/keyresult/:id', keyresultController.delete)

router.put('/objective/:id', objController.update)
router.delete('/objective/:id', objController.delete)
router.get('/okr', okrController.show)
router.put('/okr/:id', okrController.update)



router.get('/todo/:id/keyresult', todoKeyresultController.index)
router.post('/todo/:id/keyresult', todoKeyresultController.insert)
router.delete('/todo/:id/keyresult', todoKeyresultController.delete)


module.exports = router