import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import UpdateUserProfile from '../../../../pages/profile/update';

configure({ adapter: new Adapter() });
describe('Update User Profile Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<UpdateUserProfile />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render empty update profile form', () => {
		expect(container.find('input')).toHaveLength(5);
		expect(container.find('button')).toHaveLength(2);
		expect(container.find('form')).toHaveLength(1);
	});

	it('should have all the input fields', () => {
		expect(container.find('input[type="text"]').length).toEqual(3);
		expect(container.find('input[type="email"]').length).toEqual(1);
	});
});
