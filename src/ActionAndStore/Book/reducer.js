import { createReducer } from "@reduxjs/toolkit";

import {
	fetchBooks,
} from "./actions";

export default createReducer([], {
	[fetchBooks]: (state, action) => {
		return action.payload;
	},
});
