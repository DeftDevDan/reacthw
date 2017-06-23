import saved from './saved';

export default (app) => {	
	app.use('/api/saved', saved());

	app.get('/api', (req,res) => {
		console.log("something happened");
		res.json("something happened");
	});
}