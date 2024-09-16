import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IUserProfileResponse } from '../../../../core/interfaces/userProfile.interface';
import { getUserProfile } from '../../../../core/redux/actions/userProfileActions';
import UserProfileService from '../../../../core/services/userProfile.service';

describe('user profile', () => {
	let userProfileService: jest.Mocked<typeof UserProfileService>;

	beforeAll(() => {
		userProfileService = UserProfileService as jest.Mocked<
			typeof UserProfileService
		>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/userProfile.service');
	});

	describe('get', () => {
		let action: AsyncThunkAction<IUserProfileResponse, void, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(UserProfileService, 'getUserProfile');
			userProfileService.getUserProfile.mockClear();
			userProfileService.getUserProfile.mockResolvedValue({
				first_name: 'first_name',
				last_name: 'last_name',
				email: 'test@email.com',
				role: 'dentist',
				email_verified: true,
				user_avatar: {
					type: 'web',
					avatar_url: 'https://someurl.com',
				},
			});

			result = {};

			action = getUserProfile();
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				userProfileService.getUserProfile(),
			).resolves.toStrictEqual({
				first_name: 'first_name',
				last_name: 'last_name',
				email: 'test@email.com',
				role: 'dentist',
				email_verified: true,
				user_avatar: {
					type: 'web',
					avatar_url: 'https://someurl.com',
				},
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(userProfileService.getUserProfile).toHaveBeenCalledWith();
		});
	});
});
