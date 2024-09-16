import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import CaseBanner from '../../../../pages/7d/case-banner';

configure({ adapter: new Adapter() });
describe('CaseBanner', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CaseBanner
						caseIdentifier={'CASE III - 1234'}
						currentStep={'DESIGN'}
						startDate={'4th July, 2022'}
						endDate={'-'}
						problem={'Bleeding gums'}
						problemCategory={'Functional Health'}
						patientsConcern={'High Concern'}
						procedure={'Dental Filling'}
						reasonToVisit={'Emergency'}
						nextAppointment={'10 July, 2022'}
					/>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render the all elements in case banner', () => {
		expect(container.html().includes('CASE III')).toBeTruthy();
		expect(container.html().includes('Start Date')).toBeTruthy();
		expect(container.html().includes('4th July, 2022')).toBeTruthy();
		expect(container.html().includes('End Date')).toBeTruthy();
		expect(container.html().includes('-')).toBeTruthy();
		expect(container.html().includes('Problem')).toBeTruthy();
		expect(container.html().includes('Bleeding gums')).toBeTruthy();
		expect(container.html().includes('Problem Category')).toBeTruthy();
		expect(container.html().includes('Functional Health')).toBeTruthy();
		expect(container.html().includes("Patient's Concern")).toBeTruthy();
		expect(container.html().includes('High Concern')).toBeTruthy();
		expect(container.html().includes('Procedure')).toBeTruthy();
		expect(container.html().includes('Dental Filling')).toBeTruthy();
		expect(container.html().includes('Main Reason to Visit')).toBeTruthy();
		expect(container.html().includes('Emergency')).toBeTruthy();
		expect(container.html().includes('Next Appointment')).toBeTruthy();
		expect(container.html().includes('10 July, 2022')).toBeTruthy();
		expect(container.html().includes('DESIGN')).toBeTruthy();
	});
});
