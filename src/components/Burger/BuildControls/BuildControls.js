import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const buildControls = (props) => {
	const price = new Intl.NumberFormat("un-US", {
		style: "currency",
		currency: "EUR",
	}).format(props.totalPrice);
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{price}</strong>
			</p>
			{controls.map((control) => (
				<BuildControl
					added={() => props.ingredientAdded(control.type)}
					removed={() => props.ingredientRemoved(control.type)}
					key={control.label}
					label={control.label}
					disabled={props.disabled[control.type]}
				/>
			))}
			<button
				onClick={props.purchased}
				disabled={props.addedCount === 0}
				className={classes.OrderButton}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default buildControls;
