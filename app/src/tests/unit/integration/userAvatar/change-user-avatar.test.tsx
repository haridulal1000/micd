import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { changeUserAvatar } from '../../../../core/redux/actions/userProfileActions';
import {
	IChangeUserAvatarRequest,
	IChangeUserAvatarResponse,
} from '../../../../core/interfaces/userProfile.interface';
import UserProfileService from '../../../../core/services/userProfile.service';

// Mock the UserProfileService
jest.mock('../../../../app/core/services/userProfile.service', () => ({
	changeUserAvatar: jest.fn(() => ({
		avatar_url: 'http://some-url',
		type: 'web',
	})),
}));

describe('user avatar', () => {
	let profileService: jest.Mocked<typeof UserProfileService>;

	beforeAll(() => {
		profileService = UserProfileService as jest.Mocked<
			typeof UserProfileService
		>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/userProfile.service');
	});

	describe('change user avatar', () => {
		let action: AsyncThunkAction<
			IChangeUserAvatarResponse,
			IChangeUserAvatarRequest,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IChangeUserAvatarRequest;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(UserProfileService, 'changeUserAvatar');
			profileService.changeUserAvatar.mockClear();
			profileService.changeUserAvatar.mockResolvedValue({
				avatar_url: 'http://some-url',
				type: 'web',
			});

			arg = {
				file: new File([], 'somefile'),
			};

			action = changeUserAvatar(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				profileService.changeUserAvatar(arg),
			).resolves.toStrictEqual({
				avatar_url: 'http://some-url',
				type: 'web',
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, {});
			expect(profileService.changeUserAvatar).toHaveBeenCalledWith(arg);
		});
	});
});
