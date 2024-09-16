import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import UserAvatar from '../../../components/UserAvatar';

configure({ adapter: new Adapter() });
describe('User Avatar Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<UserAvatar />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render a placeholder image with +', () => {
		expect(container.find('img')).toHaveLength(2);
		expect(container.find('span').text()).toEqual('➕');
	});
});
