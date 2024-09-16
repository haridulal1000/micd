import { createSlice } from '@reduxjs/toolkit';
import { IUserProfileState } from '../../interfaces/userProfile.interface';
import {
	getUserProfile,
	updateUserProfile,
} from '../actions/userProfileActions';

const initialState: IUserProfileState = {
	userProfile: null,
	loading: false,
	error: null,
	success: false,
};

const userProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		updateProfileEmailVerification: (state) => {
			state.userProfile = state.userProfile
				? { ...state.userProfile, email_verified: true }
				: null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserProfile.pending, (state: IUserProfileState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			getUserProfile.fulfilled,
			(state: IUserProfileState, action) => {
				state.loading = false;
				state.error = null;
				state.userProfile = action.payload;
			},
		);
		builder.addCase(
			getUserProfile.rejected,
			(state: IUserProfileState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
		builder.addCase(
			updateUserProfile.pending,
			(state: IUserProfileState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			updateUserProfile.fulfilled,
			(state: IUserProfileState, action) => {
				state.loading = false;
				state.error = null;
				state.userProfile = action.payload;
			},
		);
		builder.addCase(
			updateUserProfile.rejected,
			(state: IUserProfileState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				// state.userProfile = null;
			},
		);
	},
});

export const { updateProfileEmailVerification } = userProfileSlice.actions;
export default userProfileSlice.reducer;
