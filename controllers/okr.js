const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const formate = require('./../utils/date.js');
// const TodoKeyresult = require('./../models/todoKeyresult.js');
const okrController = {
	show: async function(ctx, next){
		let objectives = await Objective.all();
		objectives.map(data=>{
			data.start_at = formate.formatTime(data.start_at)
			if(data.end_at){
				data.end_at = formate.formatTime(data.end_at)
			}
			return data
			// console.log(data)
		})
		ctx.state.code = 200;
    ctx.state.data.objectives = objectives;
	},
	person:async function(ctx, next){
		let id = ctx.params.id;
    let objectives = await Objective.select({ id });
    let objective = objectives[0];
    let keyresults = await Keyresult.select({ content_id: id });
    ctx.state.code = 200;
    ctx.state.data = {objective,keyresults}
    // console.log(keyresults)
	},
	arr: async function(ctx, next) {
    // let id = ctx.params.id;
    // let objectives = await Objective.select({ id });
    // let objective = objectives[0];
    // let keyresults = await Keyresult.select({ objective_id: id });
    // objective.start_at = formate.formatTime(objective.start_at);
    // if(objective.end_at){
    //   objective.end_at = formate.formatTime(objective.end_at);
    // }
    let keyresult_ids = keyresults.map( data => data.id);
    let todoKeyresults = await TodoKeyresult.knex()
      .whereIn('keyresult_id', keyresult_ids)
      .leftJoin('todo','todo_keyresult.todo_id','todo.id')
      .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')

    let keyresultTmp = {}
    keyresults.forEach(data => {
      data.todos = []
      keyresultTmp[data.id] = data;
    })
    todoKeyresults.forEach(data =>{
      keyresultTmp[data.keyresult_id].todos.push(data);
    })
    objective.keyresults = Object.values(keyresults);
    ctx.state.code = 200;
    ctx.state.data.okr = objective;
  },
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
	update: async function(ctx, next){
		let id = ctx.params.id;
		let title = ctx.request.body.title;	
		let content = ctx.request.body.content;
		let start_at = new Date();
		await Objective.update(id, {title})
		content.forEach(async(data)=>{
			let content = data;
			if(data.id){
				await Keyresult.update(data.id,{content:content})
			} else{
				await Keyresult.insert({ content_id: id, content: data.content, state: 0, start_at })
			}
			// await Keyresult.update(id,{content:content})
			// await Keyresult.insert({content_id: id, content:content,state:0,start_at})
		})
		ctx.state.code = 200;
    ctx.state.data.message = 'success'
	},

	te: async function(ctx, next) {
    let id = ctx.params.id;
    let title = ctx.request.body.title;
    let keyresults = ctx.request.body.keyresults;
    console.log(id,title,keyresults)
    let created_time = new Date();
    await Objective.update(id, {title});
    keyresults.forEach(async(data)=>{
      if(data.id){
        await Keyresult.update(data.id, { title: data.title })
      }else{
        await Keyresult.insert({ objective_id: id, title: data.title, status: 0, created_time })
      }
    })

    ctx.state.code = 200;
    ctx.state.data.message = 'success'
  },
	

	
}

module.exports = okrController;





// const Objective = require('./../models/objective.js');
// const Keyresult = require('./../models/keyresult.js');
// const formate = require('./../utils/date.js');
// const TodoKeyresult = require('./../models/todoKeyresult.js');

// const okrController = {
//   update: async function(ctx, next) {
//     let id = ctx.params.id;
//     let title = ctx.request.body.title;
//     let keyresults = ctx.request.body.keyresults;
//     console.log(id,title,keyresults)
//     let created_time = new Date();
//     await Objective.update(id, {title});
//     keyresults.forEach(async(data)=>{
//       if(data.id){
//         await Keyresult.update(data.id, { title: data.title })
//       }else{
//         await Keyresult.insert({ objective_id: id, title: data.title, status: 0, created_time })
//       }
//     })

//     ctx.state.code = 200;
//     ctx.state.data.message = 'success'
//   },
//   show: async function(ctx, next) {
//     let id = ctx.params.id;
//     let user_id = ctx.state.user_id;
//     if(!user_id){
//       ctx.state.code = 403;
//       ctx.state.data.message = '没有登录'
//       return
//     }

//     let objectives = await Objective.select({ id });
//     let objective = objectives[0];
//     let keyresults = await Keyresult.select({ objective_id: id });
//     objective.created_time = formate.formatTime(objective.created_time);
//     if(objective.finished_time){
//       objective.finished_time = formate.formatTime(objective.finished_time);
//     }
//     let keyresult_ids = keyresults.map( data => data.id);
//     let todoKeyresults = await TodoKeyresult.knex()
//       .whereIn('keyresult_id', keyresult_ids)
//       .leftJoin('todo','todo_keyresult.todo_id','todo.id')
//       .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')

//     let keyresultTmp = {}
//     keyresults.forEach(data => {
//       data.todos = []
//       keyresultTmp[data.id] = data;
//     })
//     todoKeyresults.forEach(data =>{
//       keyresultTmp[data.keyresult_id].todos.push(data);
//     })
//     objective.keyresults = Object.values(keyresults);
//     ctx.state.code = 200;
//     ctx.state.data.okr = objective;
//   },
//   index: async function(ctx, next) {
//     let status = ctx.request.query.status;
//     let user_id = ctx.state.user_id;
//     if(!user_id){
//       ctx.state.code = 403;
//       ctx.state.data.message = '没有登录'
//       return
//     }
//     let params = { user_id };
//     if(status){
//       params.status = status
//     }
//     let objectives = await Objective.select(params)
//     objectives = objectives.map( data => {
//       data.created_time = formate.formatTime(data.created_time)
//       if(data.finished_time) {
//         data.finished_time = formate.formatTime(data.finished_time)
//       }
//       return data
//     })
//     ctx.state.code = 200;
//     ctx.state.data.objectives = objectives;
//   },
//   insert: async (ctx, next) => {
//     let title = ctx.request.body.objective;
//     let keyresults = ctx.request.body.keyresults;
//     let user_id = ctx.state.user_id;
//     let status = 0;
//     let created_time = new Date();
//     if(!title || !keyresults.length || !user_id){
//       ctx.state.data.message = '缺少必要参数'
//       return
//     }

//     let objectives = await Objective.insert({
//       title,
//       status,
//       created_time,
//       user_id
//     })

//     let objective_id = objectives[0];
//     keyresults.forEach(async (data)=>{
//       let title = data.title;
//       await Keyresult.insert({
//         objective_id,
//         title, 
//         status,
//         created_time
//       })
//     })

//     ctx.state.code = 200;
//     ctx.state.data.message = 'success'
//   } 
// }

// module.exports = okrController;