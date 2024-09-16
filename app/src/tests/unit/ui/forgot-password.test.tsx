import { configure, mount, ReactWrapper } from 'enzyme';
import React, { Component } from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { store } from '../../../core/redux/store/store';
import ForgotPassword from '../../../pages/auth/forget-password';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });
describe('Forgot Password component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<ForgotPassword />
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
		expect(container.find('p.text-warning')).toHaveLength(1);
		expect(container.find('p.text-s')).toHaveLength(1);
		expect(container.find('p.text-xs')).toHaveLength(1);
	});

	it('should have an email field', () => {
		expect(container.find('input[type="email"]').length).toEqual(1);
	});

	it('should have a submit button', () => {
		expect(container.find('button[type="submit"]').length).toEqual(1);
	});

	it('should have a back to login text', () => {
		expect(container.find('p.back-to-login').length).toEqual(1);
	});
});
