import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		console.log(
			"[FullPost.js] shouldComponentUpdate()",
			"nextProps:",
			nextProps,
			"this.props:",
			this.props,
			"nextState:",
			nextState,
			"this.state:",
			this.state,
			nextContext
		);
		return true;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(
			"[FullPost.js] componentDidUpdate",
			prevProps,
			this.props,
			prevState,
			this.state,
			snapshot
		);
		if (
			this.props.id &&
			(!this.state.loadedPost ||
				(!!this.state.loadedPost &&
					!!this.state.loadedPost.id &&
					this.state.loadedPost.id !== this.props.id))
		) {
			axios
				.get(`/posts/${this.props.id}`)
				.then((response) => {
					console.log("GET ID:" + this.props.id + ", Pos:", response.data);
					this.setState({ loadedPost: response.data });
				});
		}
	}

	deletePost = (id) => {
		console.log("[FullPost.js] deletePost", id);
		axios
			.delete("/posts/" + id)
			.then((response) => {
				console.log("response", response);
			});
	};

	render() {
		let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
		if (this.props.id) {
			post = <p style={{ textAlign: "center" }}>Loading...!</p>;
		}
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button
							onClick={() => this.deletePost(this.state.loadedPost.id)}
							className="Delete"
						>
							Delete
						</button>
					</div>
				</div>
			);
		}
		return post;
	}
}

export default FullPost;
