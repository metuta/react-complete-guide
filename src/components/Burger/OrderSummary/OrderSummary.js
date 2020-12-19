import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((key) => {
		return (
			<li key={key}>
				<span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
				{props.ingredients[key]}
			</li>
		);
	});
	const price = new Intl.NumberFormat("un-US", {
		style: "currency",
		currency: "USD",
	}).format(props.totalPrice);

	return (
		<Auxiliary>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<strong>Total Price: {price}</strong>
			<p>Continue to Checkout?</p>
			<Button clicked={props.purchaseCancelled} btnType="Danger">
				CANCEL
			</Button>
			<Button clicked={props.purchaseContinued} btnType="Success">
				CONTINUE
			</Button>
		</Auxiliary>
	);
};

export default orderSummary;
