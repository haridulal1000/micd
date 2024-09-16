import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import Footer from '../../../../pages/7d/footer';

configure({ adapter: new Adapter() });
describe('footer', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<Footer />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render 1 span with previous step texts', () => {
		expect(container.html().includes('Previous step'));
	});

	it('should be disabled by default on first step', () => {
		expect(container.find('.text-grayedLabel')).not.toBeNull();
	});

	it('should render 1 button for next step', () => {
		expect(container.html().includes('Next Step')).toBeTruthy();
	});
});
