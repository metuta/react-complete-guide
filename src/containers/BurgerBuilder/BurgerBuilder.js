import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 1.3,
	meat: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
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
		console.log("[BurgerBuilder.js] get ingredients");
		axios
			.get("/ingredients.json")
			.then((response) => {
				!!response &&
					!!response.data &&
					this.setState({ ingredients: response.data });
			})
			.catch((error) => {
				console.log("[BurgerBuilder.js]", error);
				this.setState({ error: true });
			});
		// }
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState((prevState, props) => {
			return {
				ingredients: updatedIngredients,
				totalPrice: newPrice,
			};
		});
	};

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] === 0) {
			return;
		}
		this.setState((prevState, props) => {
			return {
				ingredients: {
					...prevState.ingredients,
					[type]: prevState.ingredients[type] - 1,
				},
				totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
			};
		});
	};

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

		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push('totalPrice='+this.state.totalPrice);
		const queryString = queryParams.join("&")
		console.log("queryString:", queryString);
		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString,
		});
	};

	render() {
		let orderSummary = null;

		let burger = this.state.error ? (
			<p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			orderSummary = (
				<OrderSummary
					totalPrice={this.state.totalPrice}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
				/>
			);
			if (this.state.loading) {
				orderSummary = <Spinner />;
			}

			const disabledInfo = {
				...this.state.ingredients,
			};

			for (let key in disabledInfo) {
				disabledInfo[key] = disabledInfo[key] <= 0;
			}

			const addedCount = Object.keys(this.state.ingredients)
				.map((key) => this.state.ingredients[key])
				.reduce((acc, current) => acc + current, 0);

			burger = (
				<Auxiliary>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						purchased={this.purchaseHandler}
						purchaseCancelled={this.purchaseCancelHandler}
						addedCount={addedCount}
						totalPrice={this.state.totalPrice}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);
