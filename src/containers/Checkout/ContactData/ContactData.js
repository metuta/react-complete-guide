import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation: {
					required: true,
					minLength: 3,
					maxLength: 20,
				},
				valid: false,
				touched: false,
				errorMessage: "Length of name must be between 3 and 20!",
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Street",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorMessage: "Please fill in your street!",
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP Code",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorMessage: "Please fill in your zip code!",
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Country",
				},
				value: "",
				// validation: {
				// 	required: true,
				// },
				valid: false,
				touched: false,
				errorMessage: "Please fill in your country!",
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Email",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorMessage: "Please fill in your email address!",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "", displayValue: "Please select" },
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
					placeholder: "Delivery Method",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorMessage: "Please select the delivery method!",
			},
		},
		formIsValid: false,
		loading: false,
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules && rules.required) {
			isValid = value.trim() !== "";
		}
		if (rules && rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid;
		}
		if (rules && rules.maxLength) {
			isValid = value.trim().length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, name) => {
		const newOrderForm = { ...this.state.orderForm };
		const isElementValid = this.checkValidity(
			event.target.value,
			newOrderForm[name].validation
		);
		newOrderForm[name] = {
			...newOrderForm[name],
			value: event.target.value,
			touched: true,
			valid: isElementValid,
		};
		this.setState((prevState) => {
			let isFormValid = true;
			for (let name in newOrderForm) {
				isFormValid =
					!!this.checkValidity(
						newOrderForm[name].value,
						newOrderForm[name].validation
					) && isFormValid;
			}

			console.log(
				"inputChangedHandler() name:",
				name,
				newOrderForm[name],
				"isFormValid:",
				isFormValid,
				newOrderForm
			);

			return {
				orderForm: newOrderForm,
				formIsValid: isFormValid,
			};
		});
	};

	orderHandler = (event) => {
		event.preventDefault();

		let isValid = true;
		let tmpValid = false;
		const newOrderForm = { ...this.state.orderForm };
		for (let name in this.state.orderForm) {
			tmpValid = this.checkValidity(
				this.state.orderForm[name].value,
				this.state.orderForm[name].validation
			);
			isValid = tmpValid && isValid;
			console.log("isValid?", name, isValid);

			newOrderForm[name] = {
				...newOrderForm[name],
				touched: true,
				valid: tmpValid,
			};
		}
		this.setState({ orderForm: newOrderForm, formIsValid: isValid });
		console.log(
			"orderHandler() isValid:",
			isValid,
			", this.state:",
			this.state,
			", ingredients:",
			this.props.ingredients,
			this.props
		);

		const ingredientsCount = Object.keys(this.props.ingredients)
			.map((key) => this.props.ingredients[key])
			.reduce((acc, current) => acc + current, 0);

		console.log("ingredientsCount:", ingredientsCount);
		if (ingredientsCount === 0) {
			alert("Please add some ingredients!");
		}

		if (!isValid || ingredientsCount === 0) {
			return false;
		}

		const formData = {};
		for (let elementId in this.state.orderForm) {
			formData[elementId] = this.state.orderForm[elementId].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		console.log(
			"[ContactData.js] orderHandler() -> order:",
			order,
			this.state,
			this.props
		);

		this.setState({ loading: true });
		axios
			.post("/orders.json", order)
			.then((response) => {
				this.setState({ loading: false });
				console.log(".post(/orders.json) -> response:", response);
				this.props.history.push("/orders");
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log(".post(/orders.json) -> error:", error);
			});
	};

	render() {
		let formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({ id: key, config: this.state.orderForm[key] });
		}
		const elementsOutput = formElements.map((formElement) => (
			<Input
				key={formElement.id}
				name={formElement.id}
				label={formElement.id}
				invalid={!formElement.config.valid}
				errorMessage={formElement.config.errorMessage}
				touched={formElement.config.touched}
				shouldValidate={formElement.config.validation}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				inputtype={formElement.config.elementType}
				elementConfig={{ ...formElement.config.elementConfig }}
				value={formElement.config.value}
			/>
		));

		let form = (
			<form>
				{elementsOutput}
				<Button clicked={this.orderHandler} btnType="Success">
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
