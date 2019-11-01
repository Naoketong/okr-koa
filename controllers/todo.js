const Todo = require('./../models/todo.js');
const todocontroller = {
	all: async function(ctx, next){
	},
	insert: async function(ctx, next){
		let content = ctx.request.body.content;
		let start_at = new Date();
		console.log(ctx.state)
		if(!content){
			ctx.response.error = "请输入待办事项";
			// ctx.state.data.message = '缺少必要参数'
			return
		}
		
		// let todo = await Todo.insert({content, start_at})
		// ctx.state.code = 200;
		// console.log(status_at)
	},

}
module.exports = todocontroller;