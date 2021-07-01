import mongoose from 'mongoose';
import Post from './post.model';
import dbConnect from '../../../utils/db';

dbConnect();

export default async function posts(req, res) {
	const METHOD = req.method;
	switch (METHOD) {
		case 'GET':
			try {
				const posts = await Post.find().exec();
				console.log('getting data', posts);
				res.status(200).json(posts);
			} catch (error) {
				console.log('Db failed: ', error);
				res.status(404).json({ error: 'error' });
			}
			break;

		default:
			res.status(500).json({ message: 'we dont' });
	}
}
