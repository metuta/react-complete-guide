import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName,
	};
};

export const removeIngredient = (ingName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName,
	};
};

export const setIngredients = (ingredients) => {
	console.log("setIngredients() -> ingredients:", ingredients);
	return {
		type: actionTypes.SET_INGREDIENT,
		ingredients: {
			salad: ingredients.salad,
			bacon: ingredients.bacon,
			cheese: ingredients.cheese,
			meat: ingredients.meat,
		},
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	// "return (dispatch, getState) => {" if state is needed
	return (dispatch) => {
		axios
			.get("/ingredients.json")
			.then((response) => {
				!!response &&
					!!response.data &&
					dispatch(setIngredients(response.data));
			})
			.catch((error) => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
