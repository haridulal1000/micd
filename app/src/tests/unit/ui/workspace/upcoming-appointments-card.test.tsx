import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from '../../../../core/redux/store/store';
import DetailedUpcomingAppointmentCard from '../../../../pages/dashboard/upcoming-appointment/upcoming-appointment-card';
import { PersistGate } from 'redux-persist/integration/react';

configure({ adapter: new Adapter() });
describe('List Workspaces component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<DetailedUpcomingAppointmentCard
							appointments={[
								{
									patient_name: 'Some Name',
									workspace_name: 'Some Workspace',
									date: '20 NOV, 2022',
									start_at: 'some time',
								},
								{
									patient_name: 'Some Name',
									workspace_name: 'Some Workspace',
									date: '20 NOV, 2022',
									start_at: 'some time',
								},
							]}
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('renders one upcoming card', () => {
		expect(container.find('.test-upcoming-appointments-card')).toHaveLength(
			1,
		);
	});
	it('renders two appointment rows', () => {
		expect(container.find('.test-upcoming-appointment')).toHaveLength(2);
	});
});
