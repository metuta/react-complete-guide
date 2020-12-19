import React from "react";

import classes from "./Order.css";

const Order = (props) => {
	console.log("[Order.js] order:", props);
	const ingredients = [];
	for (let key in props.order.ingredients) {
		props.order.ingredients[key] > 0 &&
			ingredients.push(key + " (" + props.order.ingredients[key] + ")");
	}
	const ingredientsOutput = ingredients.map((ig) => {
		return (
			<span
				style={{
					textTransform: "capitalize",
					display: "inline-block",
					margin: "0 8px",
					border: "1px solid #ccc",
					padding: "5px",
				}}
				key={ig}
			>
				{ig}
			</span>
		);
	});
	const price = +props.order.price;
	const formattedPrice = price.toLocaleString("de-DE", {
		style: "currency",
		currency: "EUR",
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>
				Price: <strong>{formattedPrice}</strong>
			</p>
			<p>{props.order.orderData.name} <span className={classes.email}>&lt;{props.order.orderData.email}&gt;</span></p>
		</div>
	);
};

export default Order;
