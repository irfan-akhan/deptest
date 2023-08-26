import BlogCard from '../../components/BlogCard';
import BlogAside from '../../components/BlogAside';
import blog from '../../styles/Blog.module.css';
import fetch from 'isomorphic-fetch';

import { Grid } from '@material-ui/core';

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
				className={blog.blogMain}
			>
				<Grid container spacing={5} className={blog.cards}>
					{posts?.map((post) => {
						return (
							<Grid key={post._id} item xs={4}>
								<BlogCard post={post} />
							</Grid>
						);
					})}
				</Grid>
				<BlogAside />
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
		console.log('failed getting data: ', error);
		return {
			props: {
				data: { heading: 'Cant find' },
			},
		};
	}
};

export default BlogList;
