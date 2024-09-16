import getAxiosInstance from './interceptor';
import {
	IChangeUserAvatarRequest,
	IChangeUserAvatarResponse,
	IUpdateUserProfileDets,
	IUserCheckResponse,
	IUserProfileResponse,
} from '../interfaces/userProfile.interface';

const getUserProfile = async (): Promise<IUserProfileResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('profile', axiosConfig);
};

const updateUserProfile = async (
	updateUserProfileDets: IUpdateUserProfileDets,
): Promise<IUserProfileResponse> => {
	const axiosConfig = { headers: { 'content-type': 'application/json' } };
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.patch('/profile', updateUserProfileDets, axiosConfig);
};

const changeUserAvatar = async (
	changeAvatarDets: IChangeUserAvatarRequest,
): Promise<IChangeUserAvatarResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('profile/avatar', changeAvatarDets, axiosConfig);
};

const removeUserAvatar = async (): Promise<void> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete('profile/avatar', axiosConfig);
};

export const checkIfEmailExists = async (
	email: string,
): Promise<IUserCheckResponse | undefined> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	try {
		const res = await axiosInstance.get(
			`user/check?email=${email}`,
			axiosConfig,
		);
		return res.data as IUserCheckResponse;
	} catch (e) {
		return undefined;
	}
};

export default {
	changeUserAvatar,
	getUserProfile,
	removeUserAvatar,
	updateUserProfile,
};
