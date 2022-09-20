import { createReducer } from "@reduxjs/toolkit";

import {
	setName,
} from "./action";

export default createReducer([], {
	[setName]: (state, action) => {
		return action.payload
	},
});
