import { IUserState } from './user.interface';

export interface IAuthInitialState {
	loading: boolean;
	userInfo: IUserState | null; // for user object
	userToken: string | null; // for storing the JWT
	error: string | null;
	success: boolean; // for monitoring the registration process.
	loggedInUserEmail: string | null;
}

export interface ILoginDets {
	email: string;
	password: string;
}

export interface ILoginError {
	email: string[];
	password: string[];
}

export interface IRegisterDets {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	repeat_password: string;
}

export interface ISignUpError {
	email: string[];
	password: string[];
	repeatPassword: string[];
	firstName: string[];
	lastName: string[];
}

export interface IForgotPasswordDets {
	email: string;
}

export interface IForgotPasswordError {
	email: string[];
}

export interface IResponseData {
	access: string;
	refresh: string;
}

export interface IVerificationCode {
	code: string;
}

export interface IVerifyPasswordResetCode {
	password_reset_code: string;
	email: string;
}

export interface IChangePassword {
	email: string;
	password: string;
	repeat_password: string;
}

export interface IChangePasswordError {
	email: string[];
	password: string[];
	repeatPassword: string[];
}

export interface IChangeCurrentPasswordDets {
	current_password: string;
	new_password: string;
	repeat_new_password: string;
}

export interface IChangeCurrentPasswordResponse {
	code: number;
	reason: string;
	description: string;
}
