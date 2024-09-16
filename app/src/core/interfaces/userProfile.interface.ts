export interface IUserProfileResponse {
	first_name: string;
	last_name: string;
	email: string;
	email_verified: boolean;
	role: string;
	user_avatar: {
		avatar_url: string;
		type: string;
	};
}

export interface IUserProfileState {
	userProfile: IUserProfileResponse | null;
	error: string | null;
	loading: boolean;
	success: boolean;
}

export interface IChangeUserAvatarRequest {
	file: File;
}

export interface IChangeUserAvatarResponse {
	avatar_url: string;
	type: string;
}

export interface IUpdateUserProfileDets {
	first_name: string | null;
	last_name: string | null;
}

export interface IUserCheckResponse {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	user_avatar: {
		avatar_url: string;
		type: string;
	};
}
