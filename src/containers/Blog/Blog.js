import React, { Component, Suspense } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import "./Blog.css";
// import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
import asyncComponent from '../../hoc/asyncComponent';
const Posts = React.lazy(() => import("./Posts/Posts"));

const AsyncNewPost = asyncComponent(() => {
	return import("./NewPost/NewPost");
});

class Blog extends Component {
	state = {
		auth: true,
	};
	render() {
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/posts"
									activeClassName="my-active"
									activeStyle={{
										color: "#fa923f",
										textDecoration: "underline",
									}}
								>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true",
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/* <Route path="/" exact render={() => <h1>Home</h1>} />
				<Route path="/" exact render={() => <h1>Home 2</h1>} /> 
				<Route path="/new-post" exact render={() => <h1>New Post</h1>} /> */}
				<Switch>
					{/* Switch makes sure that only the first Route element with matching path is rendered */}
					{this.state.auth ? (
						<Route path="/new-post" exact component={AsyncNewPost} />
					) : null}
					<Route
						path="/posts"
						render={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Posts />
							</Suspense>
						)}
					/>
					<Route render={() => <h1>Not found</h1>} />
					{/* <Redirect from="/" to="/posts" /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;
