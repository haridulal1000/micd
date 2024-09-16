import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	IRegisterDets,
	IResponseData,
} from '../../../../core/interfaces/auth.interface';
import { register } from '../../../../core/redux/actions/authActions';
import AuthService from '../../../../core/services/auth.service';

// Mock the AuthService
jest.mock('../../../../app/core/services/auth.service', () => ({
	registerUser: jest.fn(() => ({
		access: '1234567',
		refresh: '1234567',
	})),
}));

describe('auth thunks', () => {
	let auth: jest.Mocked<typeof AuthService>;

	beforeAll(() => {
		auth = AuthService as jest.Mocked<typeof AuthService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('register', () => {
		let action: AsyncThunkAction<IResponseData, IRegisterDets, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IRegisterDets;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(AuthService, 'registerUser');
			auth.registerUser.mockClear();
			auth.registerUser.mockResolvedValue({
				access: '1234567',
				refresh: '1234567',
			});

			arg = {
				email: 'wtest1234567@test123.com',
				first_name: 'wrohit1235',
				last_name: 'wtester',
				password: 'Test@123',
				repeat_password: 'Test@123',
			};

			action = register(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(auth.registerUser(arg)).resolves.toStrictEqual({
				access: '1234567',
				refresh: '1234567',
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, {});
			expect(auth.registerUser).toHaveBeenCalledWith(arg);
		});
	});
});
