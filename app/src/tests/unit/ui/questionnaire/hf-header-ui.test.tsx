import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import HFHeader from '../../../../pages/patient/health-forms/forms/HFHeader';
import { store } from '../../../../core/redux/store/store';

configure({ adapter: new Adapter() });
describe('Health Form Header Navigation Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<HFHeader />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render breadcrum', () => {
		expect(container.find('.test-breadcrum')).toHaveLength(1);
	});
	it('should render summary menu', () => {
		expect(container.find('.test-summary')).toHaveLength(1);
	});
	it('should render one list', () => {
		expect(container.find('ul')).toHaveLength(1);
	});
});
