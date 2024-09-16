import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	IUpdateUserProfileDets,
	IUserProfileResponse,
} from '../../../../core/interfaces/userProfile.interface';
import UpdateUserProfile from '../../../../core/services/userProfile.service';
import { updateUserProfile } from '../../../../core/redux/actions/userProfileActions';

describe('Update User Profile thunks', () => {
	let userProfile: jest.Mocked<typeof UpdateUserProfile>;

	beforeAll(() => {
		userProfile = UpdateUserProfile as jest.Mocked<
			typeof UpdateUserProfile
		>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<
			IUserProfileResponse,
			IUpdateUserProfileDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IUpdateUserProfileDets;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(UpdateUserProfile, 'updateUserProfile');
			userProfile.updateUserProfile.mockClear();

			userProfile.updateUserProfile.mockResolvedValue({
				first_name: 'Rima',
				last_name: 'Roma',
				email: 'roma@gmail.com',
				email_verified: true,
				role: 'Dentist',
				user_avatar: {
					avatar_url: 'reutreyutrey',
					type: 'png',
				},
			});

			arg = {
				first_name: 'Rima',
				last_name: 'Roma',
			};

			result = {};

			action = updateUserProfile(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				userProfile.updateUserProfile(arg),
			).resolves.toStrictEqual({
				first_name: 'Rima',
				last_name: 'Roma',
				email: 'roma@gmail.com',
				email_verified: true,
				role: 'Dentist',
				user_avatar: {
					avatar_url: 'reutreyutrey',
					type: 'png',
				},
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(userProfile.updateUserProfile).toHaveBeenCalledWith(arg);
		});
	});
});
