import { store } from '../../../../core/redux/store/store';

describe('auth redux state tests', () => {
	it('should initially set auth state to an empty object', () => {
		const state = store.getState().auth;
		expect(state).toEqual({
			loading: false,
			userInfo: null,
			userToken: null,
			error: null,
			success: false,
			loggedInUserEmail: null,
		});
	});
});
