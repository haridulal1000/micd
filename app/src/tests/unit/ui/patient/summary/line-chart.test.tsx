import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../../core/redux/store/store';
import LineChart from '../../../../../pages/patient/health-forms/forms/HFSummary/LineChart';

configure({ adapter: new Adapter() });
describe('Line Chart  Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const mockData = ['lifestyle', { yes: 5, no: 8, total: 20 }];

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<LineChart questionCategory={mockData} />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render p elements', () => {
		expect(container.find('p')).toHaveLength(2);
	});

	it('should have yes line ', () => {
		expect(container.find('.test-yes-line').length).toEqual(1);
	});

	it('should have no line ', () => {
		expect(container.find('.test-no-line').length).toEqual(1);
	});

	it('should have unanswered line ', () => {
		expect(container.find('.test-unanswered-line').length).toEqual(1);
	});
});
