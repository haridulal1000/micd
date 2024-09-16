import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IForgotPasswordDets } from '../../../../core/interfaces/auth.interface';
import { forgotPassword } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

jest.mock('../../../../app/core/services/auth.service', () => ({
	resetPassword: jest.fn(() => ({})),
}));

describe('auth thunks: forgot-password', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('forgot password', () => {
		let action: AsyncThunkAction<any, IForgotPasswordDets, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IForgotPasswordDets;
		let result: any;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			jest.spyOn(AuthService, 'resetPassword');
			auth.resetPassword.mockClear();
			auth.resetPassword.mockResolvedValue({});

			arg = {
				email: 'Testing12345@gmail.com',
			};

			result = {};

			action = forgotPassword(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.resetPassword).toHaveBeenCalledWith(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(auth.resetPassword(arg)).resolves.toStrictEqual({});
		});
	});
});
