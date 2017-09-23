export default class Answer{

	constructor() {
		//todo
	}

	publish(qid,content){
		$.post('/answer/new',{
			qid:qid,
			content:content
		}).done(ret=>{
			console.log(ret);
		});
	}
}