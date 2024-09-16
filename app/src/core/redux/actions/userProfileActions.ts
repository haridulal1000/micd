import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	IChangeUserAvatarRequest,
	IChangeUserAvatarResponse,
	IUserProfileResponse,
	IUpdateUserProfileDets,
} from '../../interfaces/userProfile.interface';
import userProfileService from '../../services/userProfile.service';

export const getUserProfile = createAsyncThunk<IUserProfileResponse, void>(
	'profile',
	async (_, { rejectWithValue }) => {
		try {
			const res: any = await userProfileService.getUserProfile();
			return res.data as IUserProfileResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description)
				return rejectWithValue(error.response.data.description);
			return rejectWithValue(error.message);
		}
	},
);

export const changeUserAvatar = createAsyncThunk<
	IChangeUserAvatarResponse,
	IChangeUserAvatarRequest
>(
	'profile/avatar',
	async ({ file }: IChangeUserAvatarRequest, { rejectWithValue }) => {
		try {
			const res: any = await userProfileService.changeUserAvatar({
				file,
			});
			return res.data as IChangeUserAvatarResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const removeUserAvatar = createAsyncThunk<void, void>(
	'profile/avatar',
	async (_, { rejectWithValue }) => {
		try {
			return await userProfileService.removeUserAvatar();
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const updateUserProfile = createAsyncThunk<
	IUserProfileResponse,
	IUpdateUserProfileDets
>(
	'update-profile',
	async (requestBody: IUpdateUserProfileDets, { rejectWithValue }) => {
		try {
			const res: any = await userProfileService.updateUserProfile(
				requestBody,
			);
			return res.data as IUserProfileResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description)
				return rejectWithValue(error.response.data.description);
			return rejectWithValue(error.message);
		}
	},
);
