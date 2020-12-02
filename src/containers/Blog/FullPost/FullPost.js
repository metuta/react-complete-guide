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
		this.loadData();
	}

	componentDidUpdate() {
		console.log("[FullPost.js] componentDidUpdate");
		this.loadData();
	}

	loadData = () => {
		console.log('[FullPost.js] loadData()');
		if (
			!!this.props.match.params &&
			!!this.props.match.params.id &&
			(!this.state.loadedPost ||
				(!!this.state.loadedPost &&
					this.state.loadedPost.id !== +this.props.match.params.id))
		) {
			// this.setState({ loading: true, error: false });
			axios
				.get(`/posts/${this.props.match.params.id}`)
				.then((response) => {
					console.log(
						"[FullPost.js] GET ID:" + this.props.match.params.id + ", Pos:",
						response.data
					);
					this.setState({
						loadedPost: response.data,
						// loading: false,
						// error: false,
					});
				})
				.catch((error) => {
					// this.setState({ error: true, loading: false });
					console.log("[FullPost.js] catch() Error occured!");
				});
		}
	};

	deletePost = () => {
		console.log("[FullPost.js] deletePost", this.props.match.params.id);
		axios.delete("/posts/" + this.props.match.params.id).then((response) => {
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