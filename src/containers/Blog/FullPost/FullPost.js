import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
		loading: null,
		error: false,
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

	componentDidMount() {
		console.log("[FullPost.js] componentDidMount", this.props);
		if (!!this.props.match.params && !!this.props.match.params.id) {
			this.setState({ loading: true, error: false });
			axios
				.get(`/posts/${this.props.match.params.id}`)
				.then((response) => {
					console.log(
						"[FullPost.js] GET ID:" + this.props.match.params.id + ", Pos:",
						response.data
					);
					this.setState({
						loadedPost: response.data,
						loading: false,
						error: false,
					});
				})
				.catch((error) => {
					this.setState({ error: true, loading: false });
				});
		}
	}

	deletePost = (id) => {
		console.log("[FullPost.js] deletePost", id);
		axios.delete("/posts/" + id).then((response) => {
			console.log("[FullPost.js] deletePost response", response);
		});
	};

	render() {
		let post = null;

		if (this.state.error) {
			post = <p style={{ textAlign: "center" }}>Error occured!</p>;
		} else if (this.state.loading) {
			post = <p style={{ textAlign: "center" }}>Loading...!</p>;
		} else if (this.state.loadedPost) {
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
