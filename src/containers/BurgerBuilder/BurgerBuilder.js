import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	bacon: 0.4,
// 	cheese: 1.3,
// 	meat: 0.7,
// };

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		console.log(
			"[BurgerBuilder.js] componentDidMount - this.props:",
			this.props
		);
		// if (this.props.location.state) {
		// 	this.setState((prevState) => {
		// 		return { ...prevState, ...this.props.location.state };
		// 	});
		// 	console.log("[BurgerBuilder.js] this.props.location.state:", this.props.location.state);
		// } else {
		// console.log("[BurgerBuilder.js] get ingredients");
		// axios
		// 	.get("/ingredients.json")
		// 	.then((response) => {
		// 		!!response &&
		// 			!!response.data &&
		// 			this.setState({ ingredients: response.data });
		// 	})
		// 	.catch((error) => {
		// 		console.log("[BurgerBuilder.js]", error);
		// 		this.setState({ error: true });
		// 	});
		// }
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		console.log(
			"[BurgerBuilder.js] purchaseContinueHandler, this.props:",
			this.props,
			", this.state:",
			this.state
		);

		// const queryParams = [];
		// for (let i in this.props.ings) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
		// 	);
		// }
		// queryParams.push("totalPrice=" + this.props.price);
		// const queryString = queryParams.join("&");
		// console.log("queryString:", queryString);
		// this.props.history.push({
		// 	pathname: "/checkout",
		// 	search: "?" + queryString,
		// });
		this.props.history.push("/checkout");
	};

	render() {
		let orderSummary = null;

		let burger = this.state.error ? (
			<p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			orderSummary = (
				<OrderSummary
					totalPrice={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.props.ings}
				/>
			);
			if (this.state.loading) {
				orderSummary = <Spinner />;
			}

			const disabledInfo = {
				...this.props.ings,
			};

			for (let key in disabledInfo) {
				disabledInfo[key] = disabledInfo[key] <= 0;
			}

			const addedCount = Object.keys(this.props.ings)
				.map((key) => this.props.ings[key])
				.reduce((acc, current) => acc + current, 0);

			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						purchased={this.purchaseHandler}
						purchaseCancelled={this.purchaseCancelHandler}
						addedCount={addedCount}
						totalPrice={this.props.price}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
					/>
				</Auxiliary>
			);
		}
		return (
			<Auxiliary>
				<Modal
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => {
			console.log("onIngredientAdded:", ingName);
			return dispatch({
				type: actions.ADD_INGREDIENT,
				ingredientName: ingName,
			});
		},
		onIngredientRemoved: (ingName) => {
			console.log("onIngredientRemoved:", ingName);
			return dispatch({
				type: actions.REMOVE_INGREDIENT,
				ingredientName: ingName,
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
