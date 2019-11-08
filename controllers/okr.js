const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const formate = require('./../utils/date.js');
const okrController = {
	insert: async function(ctx, next){
		let title = ctx.request.body.title;
		let state = 0;
		let start_at = new Date();
		let obj = await Objective.insert({title,start_at,state})
		let content_id = obj[0];
		let content = ctx.request.body.content;
		content.forEach(async(data)=>{
			let content = data;
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
	
}

module.exports = okrController;