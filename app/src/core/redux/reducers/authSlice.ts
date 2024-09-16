import { createSlice } from '@reduxjs/toolkit';
import {
	login,
	register,
	forgotPassword,
	verifyEmail,
	resendEmailVerificationCode,
	changePassword,
	changeCurrentPassword,
} from '../actions/authActions';
import { IAuthInitialState } from '../../interfaces/auth.interface';
import { removeFromStorage, saveTokens } from '../../utilities/storage';

const initialState: IAuthInitialState = {
	loading: false,
	userInfo: null,
	userToken: null,
	error: null,
	success: false,
	loggedInUserEmail: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			removeFromStorage('persist:root');
			localStorage.clear();
			state.loading = false;
			state.userInfo = null;
			state.userToken = null;
			state.error = null;
		},
		setUserToken: (state, action) => {
			state.userToken = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state: IAuthInitialState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(login.fulfilled, (state: IAuthInitialState, action) => {
			state.loading = false;
			state.error = null;
			state.loggedInUserEmail = JSON.stringify(action.meta.arg.email);
			saveTokens(action.payload);
		});
		builder.addCase(login.rejected, (state: IAuthInitialState, action) => {
			state.loading = false;
			state.error = JSON.stringify(action.payload);
			state.userToken = null;
		});
		builder.addCase(register.pending, (state: IAuthInitialState) => {
			state.loading = true; //
			state.error = null;
		});
		builder.addCase(
			register.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
				state.userToken = JSON.stringify(action.payload.access);
				state.loggedInUserEmail = JSON.stringify(action.meta.arg.email);
				saveTokens(action.payload);
			},
		);
		builder.addCase(
			register.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.userToken = null;
			},
		);
		builder.addCase(forgotPassword.pending, (state: IAuthInitialState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			forgotPassword.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
			},
		);
		builder.addCase(
			forgotPassword.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
		builder.addCase(verifyEmail.pending, (state: IAuthInitialState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			verifyEmail.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
			},
		);
		builder.addCase(
			verifyEmail.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
		builder.addCase(
			resendEmailVerificationCode.pending,
			(state: IAuthInitialState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			resendEmailVerificationCode.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
			},
		);
		builder.addCase(
			resendEmailVerificationCode.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
		builder.addCase(changePassword.pending, (state: IAuthInitialState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			changePassword.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
			},
		);
		builder.addCase(
			changePassword.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
		builder.addCase(
			changeCurrentPassword.pending,
			(state: IAuthInitialState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			changeCurrentPassword.fulfilled,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = null;
			},
		);
		builder.addCase(
			changeCurrentPassword.rejected,
			(state: IAuthInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			},
		);
	},
});

export const { logout, setUserToken } = authSlice.actions;

export default authSlice.reducer;
