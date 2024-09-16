import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { removeUserAvatar } from '../../../../core/redux/actions/userProfileActions';
import UserProfileService from '../../../../core/services/userProfile.service';

// Mock the UserProfileService
jest.mock('../../../../app/core/services/userProfile.service', () => ({
	removeUserAvatar: jest.fn(() => {}),
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

	describe('remove user avatar', () => {
		let action: AsyncThunkAction<void, void, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(UserProfileService, 'removeUserAvatar');
			profileService.removeUserAvatar.mockClear();

			action = removeUserAvatar();
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, {});
			expect(profileService.removeUserAvatar).toHaveBeenCalledWith();
		});
	});
});
