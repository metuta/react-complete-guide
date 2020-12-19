import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import classes from "./Orders.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
		console.log("[Orders.js] componentDidMount");
		axios
			.get("/orders.json")
			.then((response) => {
				console.log("[Orders.js] response:", response);
				const fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({ ...response.data[key], id: key });
				}
				this.setState({ orders: fetchedOrders.reverse(), loading: false });
			})
			.catch((error) => {
				console.log("[Orders.js] error:", error);
				this.setState({ loading: false });
			});
	}
	render() {
		let orders = this.state.orders.map((order) => (
			<Order key={order.id} order={order} />
		));
		if (this.state.loading) {
			orders = <Spinner />;
		}

		return (
			<div className={classes.Orders}>
				<h4>Orders</h4>
				{orders}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
