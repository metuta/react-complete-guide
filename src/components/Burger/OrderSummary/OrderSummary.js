import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
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
      <Button clicked={props.canceled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continued} btnType="Success">
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
