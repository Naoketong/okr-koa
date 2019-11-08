const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const { formatTime } = require('./../utils/date.js');
const objcontroller = {
	insert: async function(ctx, next){
		let target = ctx.request.body.target;
		console.log(target)
		let start_at = new Date();
		if(!target){
			ctx.state.data.message = '缺少必要参数'
			return
		}
		let obj = await Objective.insert({target, start_at});

		let content_id = obj[0];
		let content = ctx.request.body.content;
		let params = {content,content_id}
		let key = await Keyresult.insert(params);




		
		ctx.state.code = 200;
		ctx.state.data.message = '添加成功';
		ctx.state.data.id = content_id;
		


	},
	delete: async function(ctx, next){
		let id = ctx.params.id;
		await Objective.delete(id)
		ctx.state.code = 200;
		ctx.state.data.message = '删除成功';
	},
	// update: async function(ctx, next){
	// 	let id = ctx.params.id;
	// 	let target = ctx.request.body.target;
	// 	let state = ctx.request.body.state;
	// 	let end_at = formatTime(new Date());
	// 	let params = {target, state,end_at}
	// 	let todo = await Objective.update(id,params)
	// 	ctx.state.code = 200;
	// 	ctx.state.data.message = '修改成功';
	// },
}
module.exports = objcontroller;
