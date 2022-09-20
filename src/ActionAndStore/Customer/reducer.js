import { createReducer } from "@reduxjs/toolkit";

import {
	getCustomer,
	setCustomer,
	removeCustomer,
} from "./action";

export default createReducer([], {
	[getCustomer]: (state, action) => {
		return state
	},
	[setCustomer]: (state, action) => {
		return action.payload
	},
	[removeCustomer]: (state, action) =>{
		return state = {}
	}
});
