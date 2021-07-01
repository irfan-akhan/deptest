import mongoose from 'mongoose';
import Post from '../api/post/post.model';

const mode = {
	dev: true,
};

const BlogList = ({ posts }) => {
	return (
		<>
			<section
				style={{
					padding: '1rem 2rem 0 7rem',
					background: '#f8f8f8',
					width: '100vw',
				}}
			>
				{JSON.parse(posts)?.map((post, idx) => {
					return <h1 key={idx}>{post.heading}</h1>;
				})}
			</section>
		</>
	);
};

// export const getStaticProps = async (ctx) => {
// 	let connection = {};

// 	try {
// 		let db = await mongoose.connect(process.env.dbUrl, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		connection.isConnected = db.connections[0].readyState;
// 		if (connection.isConnected) {
// 			const posts = await Post.find().exec();
// 			console.log('getting data', posts);
// 			return {
// 				props: {
// 					posts: JSON.stringify(posts),
// 				},
// 			};
// 		}
// 	} catch (error) {
// 		console.log('Db failed: ', error);
// 		return {
// 			props: {
// 				posts: { heading: 'Cant find' },
// 			},
// 		};
// 	}
// };
export const getServerSideProps = async () => {
	try {
		const res = await fetch(
			`http://deploymenttest-g51fp68us-irfan-akhan.vercel.app/api/post`
		);
		const data = await res.json();
		console.log('getting data', data);
		return {
			props: {
				posts: JSON.stringify(data),
			},
		};
	} catch (error) {
		console.log('Db failed: ', error);
		return {
			props: {
				posts: { heading: 'Cant find' },
			},
		};
	}
};
export default BlogList;
