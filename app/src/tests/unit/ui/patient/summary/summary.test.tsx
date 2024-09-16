import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../../core/redux/store/store';
import Summary from '../../../../../pages/patient/health-forms/forms/HFSummary';

configure({ adapter: new Adapter() });
describe('Patient Summary Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<Summary />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render history and basic chart', () => {
		expect(container.find('.test-chart')).toHaveLength(1);
	});

	it('should have two titles', () => {
		expect(container.find('.test-case-section-title').length).toEqual(1);
	});
});
