import React, { Component } from "react";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
	state = {
		posts: [],
		loading: false,
		error: false,
	};

	componentDidMount() {
		console.log("[Posts.js] props:", this.props);
		this.setState({ loading: true });
		axios
			.get("/posts")
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
		console.log("[Posts.js] postSelectedHandler", id, this.props);
		this.props.history.push({ pathname: "/" + id });
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
						key={post.id}
						clicked={(id) => this.postSelectedHandler(id)}
						active={
							!!this.state.selectedPostId &&
							this.state.selectedPostId === post.id
						}
						postId={post.id}
						title={post.title}
						author={post.author}
					/>
				);
			});
		}
		return <section className="Posts">{posts}</section>;
	}
}

export default Posts;
