import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	ILoginDets,
	IResponseData,
} from '../../../../core/interfaces/auth.interface';
import { login } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

// Mock the AuthService
jest.mock('../../../../app/core/services/auth.service');

describe('auth thunks', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('login', () => {
		let action: AsyncThunkAction<IResponseData, ILoginDets, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: ILoginDets;
		let result: IResponseData;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			jest.spyOn(AuthService, 'loginUser');
			auth.loginUser.mockClear();
			auth.loginUser.mockResolvedValue({
				access: '1234567',
				refresh: '1234567',
			});

			arg = {
				email: 'Testing12345@gmail.com',
				password: 'Test@123',
			};

			result = {
				access: 'access_token',
				refresh: 'refresh_token',
			};

			action = login(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(auth.loginUser(arg)).resolves.toStrictEqual({
				access: '1234567',
				refresh: '1234567',
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(auth.loginUser).toHaveBeenCalledWith(arg);
		});
	});
});
