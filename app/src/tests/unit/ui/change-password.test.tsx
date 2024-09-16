import React, { Component } from 'react';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import ChangePassword from '../../../pages/auth/change-password';

configure({ adapter: new Adapter() });
describe('Change password component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<ChangePassword />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render empty forgot password form', () => {
		expect(container.find('.bg-forgot-password-page-left')).toHaveLength(1);
		expect(
			container.find('.bg-forgot-password-page-bottom-right'),
		).toHaveLength(1);
		expect(container.find('form')).toHaveLength(1);
		expect(container.find('button')).toHaveLength(1);
		expect(container.find('p.text-warning')).toHaveLength(2);
		expect(container.find('p.text-s')).toHaveLength(1);
		expect(container.find('p.text-xs')).toHaveLength(1);
		expect(container.find('input')).toHaveLength(2);
	});

	it('should have two password fields', () => {
		expect(container.find('input[type="password"]').length).toEqual(2);
	});

	it('should have a submit button', () => {
		expect(container.find('button[type="submit"]').length).toEqual(1);
	});

	it('should have a back to login text', () => {
		expect(container.find('p.back-to-login').length).toEqual(1);
	});
});
