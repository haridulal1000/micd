import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	ILoginDets,
	IForgotPasswordDets,
	IRegisterDets,
	IResponseData,
	IVerificationCode,
	IVerifyPasswordResetCode,
	IChangePassword,
	IChangeCurrentPasswordResponse,
	IChangeCurrentPasswordDets,
} from '../../interfaces/auth.interface';
import authService from '../../services/auth.service';

export const login = createAsyncThunk<IResponseData, ILoginDets>(
	'auth/login',
	async ({ email, password }: ILoginDets, { rejectWithValue }) => {
		try {
			const res: any = await authService.loginUser({ email, password });
			return res.data as IResponseData;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const register = createAsyncThunk<IResponseData, IRegisterDets>(
	'auth/register',
	async (requestBody: IRegisterDets, { rejectWithValue }) => {
		try {
			const res: any = await authService.registerUser(requestBody);
			return res.data as IResponseData;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const forgotPassword = createAsyncThunk<{}, IForgotPasswordDets>(
	'passwordForgot/reset',
	async (requestBody: IForgotPasswordDets, { rejectWithValue }) => {
		try {
			const res: any = await authService.resetPassword(requestBody);
			return res.data as {};
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const verifyEmail = createAsyncThunk<{}, IVerificationCode>(
	'auth/verify/email',
	async (requestBody: IVerificationCode, { rejectWithValue }) => {
		try {
			const res: any = await authService.verifyEmail(requestBody);
			return res.data as {};
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const resendEmailVerificationCode = createAsyncThunk<{}>(
	'email/resend/verify',
	async (_, { rejectWithValue }) => {
		try {
			const res: any = await authService.resendEmailVerificationCode();
			return res.data as {};
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const verifyPasswordResetCode = createAsyncThunk<
	{},
	IVerifyPasswordResetCode
>(
	'password/reset/verify',
	async (requestBody: IVerifyPasswordResetCode, { rejectWithValue }) => {
		try {
			const res: any = await authService.verifyPasswordResetCode(
				requestBody,
			);
			return res.data as {};
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const changePassword = createAsyncThunk<{}, IChangePassword>(
	'password/reset/change',
	async (requestBody: IChangePassword, { rejectWithValue }) => {
		try {
			const res: any = await authService.changePassword(requestBody);
			return res.data as {};
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const changeCurrentPassword = createAsyncThunk<
	IChangeCurrentPasswordResponse,
	IChangeCurrentPasswordDets
>(
	'password/change',
	async (requestBody: IChangeCurrentPasswordDets, { rejectWithValue }) => {
		try {
			const res: any = await authService.changeCurrentPassword(
				requestBody,
			);
			return res.data as IChangeCurrentPasswordResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description)
				return rejectWithValue(error.response.data.description);
			return rejectWithValue(error.message);
		}
	},
);
