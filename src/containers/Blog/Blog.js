import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		loading: false,
		error: false,
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get("https://jsonplaceholder.typicode.com/posts")
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatePosts = posts.map((post) => {
					return {
						...post,
						author: "Tugrul_" + post.id,
					};
				});
				this.setState({ posts: updatePosts, loading: false });
			})
			.catch((error) => {
				console.log("catch -> error", error);
				this.setState({ loading: false, error: true });
			});
	}

	postSelectedHandler = (id) => {
		this.setState({ selectedPostId: id });
	};

	render() {
		let posts;

		if (this.state.error) {
			posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
		} else if (this.state.loading) {
			posts = <p style={{ textAlign: "center" }}>Loading...!</p>;
		} else {
			posts = this.state.posts.map((post) => {
				return (
					<Post
						clicked={(id) => this.postSelectedHandler(id)}
						active={
							!!this.state.selectedPostId &&
							this.state.selectedPostId === post.id
						}
						key={post.id}
						postId={post.id}
						title={post.title}
						author={post.author}
					/>
				);
			});
		}

		return (
			<div>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
