import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IVerifyPasswordResetCode } from '../../../../core/interfaces/auth.interface';
import { verifyPasswordResetCode } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

jest.mock('../../../../app/core/services/auth.service', () => ({
	verifyPasswordResetCode: jest.fn(() => ({})),
}));

describe('auth thunks: verify-reset-code', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('forgot password', () => {
		let action: AsyncThunkAction<any, IVerifyPasswordResetCode, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IVerifyPasswordResetCode;
		let result: any;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			jest.spyOn(AuthService, 'verifyPasswordResetCode');
			auth.verifyPasswordResetCode.mockClear();
			auth.verifyPasswordResetCode.mockResolvedValue({});

			arg = {
				email: 'Testing12345@gmail.com',
				password_reset_code: 'some_reset_code',
			};

			result = {};

			action = verifyPasswordResetCode(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.verifyPasswordResetCode).toHaveBeenCalledWith(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				auth.verifyPasswordResetCode(arg),
			).resolves.toStrictEqual({});
		});
	});
});
