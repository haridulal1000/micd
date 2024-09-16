import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import SevenDBanner from '../../../../pages/7d/7DBanner';

configure({ adapter: new Adapter() });
describe('sevenDBanner', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<SevenDBanner />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render all 7 button texts', () => {
		expect(container.html().includes('Document')).toBeTruthy();
		expect(container.html().includes('Detect')).toBeTruthy();
		expect(container.html().includes('Discuss')).toBeTruthy();
		expect(container.html().includes('Design')).toBeTruthy();
		expect(container.html().includes('Display')).toBeTruthy();
		expect(container.html().includes('Decide')).toBeTruthy();
		expect(container.html().includes('Deliver')).toBeTruthy();
	});

	it('should render 7 DButtons images, only one of which should be active', () => {
		expect(container.find('img').length).toBe(7);
		expect(container.find('div.active-d-btn').length).toBe(1);
	});
});
