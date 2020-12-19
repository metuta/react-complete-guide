import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 0,
		...this.props.location.state,
	};

	componentDidMount() {
		// console.log(
		// 	"[Checkout.js] componentDidMount() -> props:",
		// 	this.props,
		// 	", state:",
		// 	this.state
		// );
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (const [key, value] of query.entries()) {
			if (key === "totalPrice") {
				price = +value;
			} else {
				ingredients[key] = +value; // + in front of value converts this string to number
				// console.log(key, value, ingredients);
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	checkoutCancelledHandler = () => {
		// console.log("[Checkout.js] checkoutCancelledHandler");
		// this.props.history.push("/", { ...stateObj });
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		// console.log("[Checkout.js] checkoutContinuedHandler");
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + "/contact-data"}
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
