const testController = {
  test: async (ctx, next) => {
    // ctx.body = '我是可以的'
    let user_id = ctx.state.user_id
    ctx.state.code = 200;
    ctx.state.data = { id: user_id }
  } 
}

module.exports = testController;