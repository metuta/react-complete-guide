import React from "react";

import classes from "./Input.css";

const input = (props) => {
	let inputElement = null;
	let classList = [classes.InputElement];

	if (props.touched && props.invalid && props.shouldValidate) {
		classList.push(classes.Invalid);
	}

	switch (props.inputtype) {
		case "input":
			inputElement = (
				<input
					key={props.name}
					className={classList.join(" ")}
					{...props.elementConfig}
					onChange={(event) => props.changed(event)}
					value={props.value}
				/>
			);
			break;
		case "textArea":
			inputElement = (
				<textarea
					key={props.name}
					className={classList.join(" ")}
					{...props.elementConfig}
					onChange={(event) => props.changed(event)}
					value={props.value}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					key={props.name}
					className={classList.join(" ")}
					onChange={(event) => props.changed(event)}
					value={props.value}
				>
					{props.elementConfig.options.map((op) => (
						<option key={op.value} value={op.value}>
							{op.displayValue}
						</option>
					))}
				</select>
			);
			break;

		default:
			inputElement = (
				<input
					key={props.name}
					className={classList.join(" ")}
					onChange={(event) => props.changed(event)}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
  }
  let errorMessage = null;
  if(props.touched && props.shouldValidate && props.invalid) {
    errorMessage = <p className={classes.ValidationError}>{props.errorMessage ? props.errorMessage : "This field is mandatory. Please fill in!" } </p>;
  }
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>
				{props.label} {props.shouldValidate && props.shouldValidate.required ? "*" : null}
			</label>
			{inputElement}
			{errorMessage}
		</div>
	);
};

export default input;
