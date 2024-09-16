import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IChangePassword } from '../../../../core/interfaces/auth.interface';
import { changePassword } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

jest.mock('../../../../app/core/services/auth.service', () => ({
	changePassword: jest.fn(() => ({})),
}));

describe('auth thunks: change-password', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('forgot password', () => {
		let action: AsyncThunkAction<any, IChangePassword, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IChangePassword;
		let result: any;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			jest.spyOn(AuthService, 'changePassword');
			auth.changePassword.mockClear();
			auth.changePassword.mockResolvedValue({});

			arg = {
				email: 'Testing12345@gmail.com',
				password: 'testpassword',
				repeat_password: 'testpassword',
			};

			result = {};

			action = changePassword(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.changePassword).toHaveBeenCalledWith(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(auth.changePassword(arg)).resolves.toStrictEqual({});
		});
	});
});
