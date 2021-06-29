import Posts from '../api/posts';
const BlogList = ({ posts }) => {
	console.log(posts);
	return (
		<>
			<section
				style={{
					padding: '1rem 2rem 0 7rem',
					background: '#f8f8f8',
					width: '100vw',
				}}
			>
				{posts?.map((post) => {
					return <h1 key={post._id}>{post.heading}</h1>;
				})}
			</section>
		</>
	);
};

export const getStaticProps = async (ctx) => {
	// const response = await fetch('/api/posts', {
	// 	method: 'GET',
	// 	headers: {
	// 		// update with your user-agent
	// 		'User-Agent':
	// 			'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
	// 		Accept: 'application/json; charset=UTF-8',
	// 	},
	// });
	const response = await Posts();
	const { data } = await response.json();
	console.log(data);
	return {
		props: {
			posts: data,
		},
	};
};

export default BlogList;
