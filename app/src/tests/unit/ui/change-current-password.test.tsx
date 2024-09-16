import React, { Component } from 'react';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import ChangeCurrentPasswordForm from '../../../pages/components/form/changeCurrentPasswordForm';
configure({ adapter: new Adapter() });
describe('Change current password form component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<ChangeCurrentPasswordForm />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should have three password fields', () => {
		expect(container.find('input[type="password"]').length).toEqual(3);
	});

	it('should have a submit button', () => {
		expect(container.find('button[type="submit"]').length).toEqual(1);
	});

	it('should have a change password text', () => {
		expect(container.find('.test-change-password').length).toEqual(1);
	});
});
