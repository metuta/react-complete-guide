import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
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
					<Route path="/new-post" exact component={NewPost} />
					<Route path="/posts" component={Posts} />
					<Redirect from="/" to="/posts" />
				</Switch>
			</div>
		);
	}
}

export default Blog;