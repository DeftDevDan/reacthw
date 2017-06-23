import {Router} from 'express';
import {Article} from '../models/Articles';

export default () => {
	let router = Router();

	router.get('/', (req, res) => {
		console.log('something');
		res.send('something is happening');
	});

	router.post('/', (req, res) => {
		let article = Article(req.body);
		article.save((err, doc) => {
			if(err) {
				console.log(err);
			} else {
				console.log(doc);
				res.json('saved');
			}
		});
	});

	router.delete('/', (req, res) => {
		console.log(req.body);
		Article.findByIdAndRemove(req.body.id, (err) => {
			if(err) {
				console.log(err);
			} else {
				console.log('Deleted');
				res.send('Deleted');
			}
		});
	});

	return router;
}