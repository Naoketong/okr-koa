const Todo = require('./../models/todo.js');
const { formatTime } = require('./../utils/date.js');
const todocontroller = {
	show: async function(ctx, next){
		let todo = await Todo.all();
		todo.map(data=>{
			// data.end_at = formatTime(data.end_at);
			data.start_at = formatTime(data.start_at);

			console.log(data)
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
		let id = todo[0];
		ctx.state.code = 200;
		ctx.state.data.message = '添加成功';
		ctx.state.data.id = id;
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
		console.log(end_at)
		let params = {content, state,end_at}
		let todo = await Todo.update(id,params)
		ctx.state.code = 200;
		ctx.state.data.message = '修改成功';
	},

}
module.exports = todocontroller;