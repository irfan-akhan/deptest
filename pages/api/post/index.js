import mongoose from 'mongoose';
import Post from './post.model';

export default async function posts(req, res) {
	const METHOD = req.method;
	const connection = {};
	switch (METHOD) {
		case 'GET':
			try {
				let db = await mongoose.connect(process.env.dbUrl, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
				});
				connection.isConnected = db.connections[0].readyState;
				if (connection.isConnected) {
					const posts = await Post.find().exec();
					console.log('getting data', posts);
					// return {
					// 	props: {
					// 		posts: JSON.stringify(posts),
					// 	},
					// };
					res.status(200).json(posts);
				}
			} catch (error) {
				console.log('Db failed: ', error);
				res.status(404).json({ error: 'error' });
			}
			break;

		default:
			res.status(500).json({ message: 'we dont' });
	}
}
