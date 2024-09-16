import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import Discuss7D from '../../../../pages/7d/discuss';

configure({ adapter: new Adapter() });
describe('discuss-7d', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<Discuss7D />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render a canvas', () => {
		expect(container.html().includes('canvas')).toBeTruthy();
	});

	it('should render 4 buttons for bookmark, comment, next and prev images', () => {
		expect(container.find('img').length).toBe(4);
	});
});
