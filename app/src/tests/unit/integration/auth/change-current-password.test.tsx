import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	IChangeCurrentPasswordDets,
	IChangeCurrentPasswordResponse,
} from '../../../../core/interfaces/auth.interface';
import { changeCurrentPassword } from '../../../../core/redux/actions/authActions';
import authService from '../../../../core/services/auth.service';

describe('auth thunks: change current password', () => {
	let auth: jest.Mocked<typeof authService>;

	beforeAll(() => {
		auth = authService as jest.Mocked<typeof authService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('change current password', () => {
		let action: AsyncThunkAction<
			IChangeCurrentPasswordResponse,
			IChangeCurrentPasswordDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IChangeCurrentPasswordDets;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(authService, 'changeCurrentPassword');
			auth.changeCurrentPassword.mockClear();
			auth.changeCurrentPassword.mockResolvedValue({
				code: 200,
				reason: 'password matched',
				description: 'password matched successfully',
			});
			arg = {
				current_password: 'password',
				new_password: 'password2',
				repeat_new_password: 'password2',
			};

			result = {};

			action = changeCurrentPassword(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				auth.changeCurrentPassword(arg),
			).resolves.toStrictEqual({
				code: 200,
				reason: 'password matched',
				description: 'password matched successfully',
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.changeCurrentPassword).toHaveBeenCalledWith(arg);
		});
	});
});
