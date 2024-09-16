import React, { Component } from 'react';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import CodeVerification from '../../../pages/auth/code-verification';

configure({ adapter: new Adapter() });
describe('Sign up component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CodeVerification />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render empty egister form', () => {
		expect(container.find('.bg-cover')).toHaveLength(1);
		expect(container.find('form')).toHaveLength(1);
		expect(container.find('h2')).toHaveLength(1);
		expect(container.find('input')).toHaveLength(6);
		expect(container.find('button')).toHaveLength(1);
	});

	it('should have all the code input field', () => {
		expect(container.find('input[type="text"]').length).toEqual(6);
	});
});
