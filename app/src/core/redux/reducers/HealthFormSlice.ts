import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentHealthForm: 'summary',
};

const HealthFormSlice = createSlice({
	name: 'healthForm',
	initialState,
	reducers: {
		setCurrentHealthForm: (state, action) => {
			state.currentHealthForm = action.payload;
		},
	},
});

export const { setCurrentHealthForm } = HealthFormSlice.actions;
export default HealthFormSlice.reducer;
