import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../../core/redux/store/store';
import CaseCard from '../../../../../pages/patient/health-forms/forms/HFSummary/CaseCard';

configure({ adapter: new Adapter() });
describe('Patient Summary Case Card Component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CaseCard />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render case title', () => {
		expect(container.find('.test-case-title')).toHaveLength(1);
	});

	it('should render create appointment button', () => {
		expect(container.find('.test-create-appointment-btn').length).toEqual(
			1,
		);
	});

	it('should render share button', () => {
		expect(container.find('.test-share-btn').length).toEqual(1);
	});

	it('should render design button', () => {
		expect(container.find('.test-design-btn').length).toEqual(1);
	});

	it('should render start date', () => {
		expect(container.find('.test-start-date').length).toEqual(1);
	});
	it('should render end date', () => {
		expect(container.find('.test-end-date').length).toEqual(1);
	});
	it('should render problem section', () => {
		expect(container.find('.test-problem-section').length).toEqual(1);
	});
	it('should render all p elements', () => {
		expect(container.find('p').length).toEqual(10);
	});
});
