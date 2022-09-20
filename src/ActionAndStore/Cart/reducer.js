import { createReducer } from "@reduxjs/toolkit";

import {
	fetchCart,
	addCart,
	deleteItemInCart,
} from "./action";

export default createReducer([], {
	[fetchCart]: (state, action) => {
		return action.payload;
	},
	[addCart]: (state, action) => {
		state.push(action.payload);
	},
	[deleteItemInCart]: (state, action) => {
		
	},
});
