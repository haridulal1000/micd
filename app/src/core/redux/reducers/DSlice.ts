import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentD: 0,
};

const DSlice = createSlice({
	name: 'sevenDs',
	initialState,
	reducers: {
		setCurrentD: (state, action) => {
			state.currentD = action.payload;
		},
	},
});

export const { setCurrentD } = DSlice.actions;
export default DSlice.reducer;
