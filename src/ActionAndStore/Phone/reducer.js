import { createReducer } from "@reduxjs/toolkit";

import {
	setPhone,
} from "./action";

export default createReducer([], {
	[setPhone]: (state, action) => {
		return action.payload
	},
});
