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
} from '../interfaces/auth.interface';
import getAxiosInstance from './interceptor';

const loginUser = async (loginDets: ILoginDets): Promise<IResponseData> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('auth/email/login', loginDets, axiosConfig);
};

const registerUser = async (
	registerDets: IRegisterDets,
): Promise<IResponseData> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('auth/email/register', registerDets, axiosConfig);
};

const verifyEmail = async (
	verificationCode: IVerificationCode,
): Promise<IResponseData> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'/auth/email/verify',
		verificationCode,
		axiosConfig,
	);
};

const resetPassword = async (
	resetPasswordDets: IForgotPasswordDets,
): Promise<any> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('password/reset', resetPasswordDets, axiosConfig);
};

const resendEmailVerificationCode = async (): Promise<{}> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('/auth/email/verify/resend', axiosConfig);
};

const verifyPasswordResetCode = async (
	verificationCode: IVerifyPasswordResetCode,
): Promise<any> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'/password/reset/verify',
		verificationCode,
		axiosConfig,
	);
};

const changePassword = async (
	newPasswordDetails: IChangePassword,
): Promise<{}> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'/password/reset/change',
		newPasswordDetails,
		axiosConfig,
	);
};

const changeCurrentPassword = async (
	changeCurrentPasswordDets: IChangeCurrentPasswordDets,
): Promise<IChangeCurrentPasswordResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'/password/change',
		changeCurrentPasswordDets,
		axiosConfig,
	);
};

export default {
	changePassword,
	loginUser,
	resetPassword,
	registerUser,
	verifyEmail,
	resendEmailVerificationCode,
	verifyPasswordResetCode,
	changeCurrentPassword,
};
