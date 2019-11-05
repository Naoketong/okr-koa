const Todo = require('./../models/todo.js');
const { formatTime } = require('./../utils/date.js');
const todocontroller = {
	show: async function(ctx, next){
		let todo = await Todo.all();
		todo.map(data=>{
			console.log(data.start_at)
			data.start_at = formatTime(data.start_at)
		})
		ctx.state.code = 200;
		ctx.state.data.todos = todo;
	},
	insert: async function(ctx, next){
		let content = ctx.request.body.content;
		let start_at = new Date();
		console.log(ctx.state)
		if(!content){
			ctx.state.data.message = '缺少必要参数'
			return
		}
		
		let todo = await Todo.insert({content, start_at})
		ctx.state.code = 200;
		ctx.state.data.message = '添加成功';
	},
	delete: async function(ctx, next){
		let id = ctx.params.id;
		await Todo.delete(id)
		ctx.state.code = 200;
		ctx.state.data.message = '删除成功';
	},
	update: async function(ctx, next){
		let id = ctx.params.id;
		let content = ctx.request.body.content;
		let state = ctx.request.body.state;
		let end_at = formatTime(new Date());
		let params = {content, state,end_at}
		let todo = await Todo.update(id,params)
		ctx.state.code = 200;
		ctx.state.data.message = '修改成功';

	}

}
module.exports = todocontroller;