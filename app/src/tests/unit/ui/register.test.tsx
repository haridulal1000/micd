import React, { Component } from 'react';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import SignUp from '../../../pages/auth/register';

configure({ adapter: new Adapter() });
describe('Sign up component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<SignUp />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render empty egister form', () => {
		expect(container.find('.bg-cover')).toHaveLength(1);
		expect(container.find('form')).toHaveLength(1);
		expect(container.find('h2')).toHaveLength(1);
		expect(container.find('input')).toHaveLength(5);
		expect(container.find('button')).toHaveLength(2);
		expect(container.find('p.text-warning')).toHaveLength(5);
	});

	it('should have an email field', () => {
		expect(container.find('input[type="email"]').length).toEqual(1);
	});

	it('should have two password fields', () => {
		expect(container.find('input[type="password"]').length).toEqual(2);
	});

	it('should have two name fields', () => {
		expect(container.find('input[name="firstName"]').length).toEqual(1);
		expect(container.find('input[name="lastName"]').length).toEqual(1);
	});

	it('should have a submit button', () => {
		expect(container.find('button[type="submit"]').length).toEqual(1);
	});
});
