import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 1.3,
	meat: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasing: false,
		loading: false,
	};
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
		this.setState({ loading: true });
		// alert("You continue!");
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Max Müll",
				address: {
					street: "test street",
					zipCode: "3234",
					country: "Turkey",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};
		axios
			.post("/orders.json", order)
			.then((response) => this.setState({ loading: true, purchasing: false }))
			.catch((error) => this.setState({ loading: true, purchasing: false }));
	};

	render() {
		let orderSummary = (
			<OrderSummary
				totalPrice={this.state.totalPrice}
				canceled={this.purchaseCancelHandler}
				continued={this.purchaseContinueHandler}
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
		return (
			<Auxiliary>
				<Modal
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}
				>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					purchased={this.purchaseHandler}
					canceled={this.purchaseCancelHandler}
					addedCount={addedCount}
					totalPrice={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
