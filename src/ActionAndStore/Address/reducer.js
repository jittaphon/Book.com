import { createReducer } from "@reduxjs/toolkit";

import {
	setAddress,

} from "./action";

export default createReducer([], {
	[setAddress]: (state, action) => {
		return action.payload
	},
});
