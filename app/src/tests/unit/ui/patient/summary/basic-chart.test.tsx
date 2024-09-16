import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../../core/redux/store/store';
import BasicChart from '../../../../../pages/patient/health-forms/forms/HFSummary/BasicChart';

configure({ adapter: new Adapter() });
describe('Line Chart  Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const mockData = ['lifestyle', { yes: 5, no: 8, total: 20 }];

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<BasicChart />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render p elements', () => {
		expect(container.find('p')).toHaveLength(19);
	});

	it('should render test chart title component', () => {
		expect(container.find('.test-chart-title')).toHaveLength(1);
	});
});
