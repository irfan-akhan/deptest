const BlogList = ({ data }) => {
	let posts = [];
	if (data) {
		posts = JSON.parse(data);
	}
	return (
		<>
			<section
				style={{
					padding: '1rem 2rem 0 7rem',
					background: '#f8f8f8',
					width: '100vw',
				}}
			>
				{posts?.map((post, idx) => {
					return <h1 key={idx}>{post._id}</h1>;
				})}
			</section>
		</>
	);
};

export const getServerSideProps = async () => {
	try {
		const res = await fetch(
			`http://deploymenttest-g51fp68us-irfan-akhan.vercel.app/api/post`
		);
		const data = await res.json();
		console.log('getting data', data);
		return {
			props: {
				data: JSON.stringify(data),
			},
		};
	} catch (error) {
		console.log('Db failed: ', error);
		return {
			props: {
				data: { heading: 'Cant find' },
			},
		};
	}
};
export default BlogList;
