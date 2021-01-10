import * as actionTypes from "../actions/actionTypes";

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 1.3,
	meat: 0.7,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			console.log("ADD_INGREDIENT:", action.ingredientName, state);
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
			};

		case actionTypes.REMOVE_INGREDIENT:
			console.log("REMOVE_INGREDIENT:", action.ingredientName, state);
			if (state.ingredients[action.ingredientName] === 0) {
				return { ...state };
			}
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
			};

		case actionTypes.SET_INGREDIENT:
			console.log("SET_INGREDIENT:", action, state);
			return {
				...state,
				ingredients: action.ingredients,
				error: false,
			};

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			console.log("FETCH_INGREDIENTS_FAILED:", action, state);
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};

export default reducer;