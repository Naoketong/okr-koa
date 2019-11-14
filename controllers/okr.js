const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const formate = require('./../utils/date.js');
// const TodoKeyresult = require('./../models/todoKeyresult.js');
const okrController = {
	// show: async function(ctx, next) {
 //    let id = ctx.params.id;
 //    let user_id = ctx.state.user_id;
 //    if(!user_id){
 //      ctx.state.code = 403;
 //      ctx.state.data.message = '没有登录'
 //      return
 //    }

 //    let objectives = await Objective.select({ id });
 //    let objective = objectives[0];
 //    let keyresults = await Keyresult.select({ objective_id: id });
 //    objective.created_time = formate.formatTime(objective.created_time);
 //    if(objective.finished_time){
 //      objective.finished_time = formate.formatTime(objective.finished_time);
 //    }
 //    let keyresult_ids = keyresults.map( data => data.id);
 //    let todoKeyresults = await TodoKeyresult.knex()
 //      .whereIn('keyresult_id', keyresult_ids)
 //      .leftJoin('todo','todo_keyresult.todo_id','todo.id')
 //      .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')

 //    let keyresultTmp = {}
 //    keyresults.forEach(data => {
 //      data.todos = []
 //      keyresultTmp[data.id] = data;
 //    })
 //    todoKeyresults.forEach(data =>{
 //      keyresultTmp[data.keyresult_id].todos.push(data);
 //    })
 //    objective.keyresults = Object.values(keyresults);
 //    ctx.state.code = 200;
 //    ctx.state.data.okr = objective;
 //  },
	insert: async function(ctx, next){
		let title = ctx.request.body.title;	
		let content = ctx.request.body.content;
		let state = 0;
		let start_at = new Date();
		let obj = await Objective.insert({title,start_at,state})
		let content_id = obj[0];
	
		content.forEach(async(data)=>{
			let content = data.content;
			await Keyresult.insert({
				content_id,
				content,
				start_at,
				state
			})
		})
		ctx.state.code = 200;
    ctx.state.data.message = 'success'
	},
	// update: async function(ctx, next){
	// 	ctx.body="456"
	// 	let id = ctx.params.id;
	// 	let title = ctx.request.body.title;	
	// 	let content = ctx.request.body.content;
	// 	console.log(id,title,content)
	// 	let start_at = new Date();
	// 	await Objective.update(id,{title})
	// 	content.forEach(async(data)=>{
	// 		let content = data;
	// 		if(data.id){
	// 			await Keyresult.update(id:data.id,{content:content})
	// 		} else{
	// 			await Keyresult.insert({content_id: id, content:content,state:0,start_at})
	// 		}
	// 		// await Keyresult.update(id,{content:content})
	// 		// await Keyresult.insert({content_id: id, content:content,state:0,start_at})
	// 	})
	// 	ctx.state.code = 200;
 //    ctx.state.data.message = 'success'
	// },
	

	
}

module.exports = okrController;