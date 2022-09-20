import { createReducer } from "@reduxjs/toolkit";

import {
	setReceipt,
} from "./action";

export default createReducer([], {
	[setReceipt]: (state, action) => {
		return action.payload
	},
});
