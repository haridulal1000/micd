import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IVerificationCode } from '../../../../core/interfaces/auth.interface';
import { verifyEmail } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

// Mock the AuthService
// jest.mock('../../../../app/core/services/auth.service');

describe('auth thunks', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../core/services/auth.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<{}, IVerificationCode, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IVerificationCode;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(AuthService, 'verifyEmail');
			auth.verifyEmail.mockClear();

			arg = {
				code: '123456',
			};

			result = {};

			action = verifyEmail(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.verifyEmail).toHaveBeenCalledWith(arg);
		});
	});
});
