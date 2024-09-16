import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import UpdateUserProfile from '../../../../pages/profile/update';
import PatientProfile from '../../../../pages/patient/profile';
import PatientNameEditForm from '../../../../pages/patient/profile/PatientNameEditForm';
import PatientDetailEditForm from '../../../../pages/patient/profile/PatientDetailEditForm';

configure({ adapter: new Adapter() });
describe('Patient Profile Name Edit component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const patientDetail = {
		first_name: 'Rio',
		last_name: 'Riya',
		sex: 'male',
		age: 22,
		avatar_url: 'user avatar link',
		email: 'rio@gmail.com',
		contact_number: '227474634',
		emergency_contact: '437489374',
		address: 'kathmandu',
		registration_date: '25 Nov 2022',
		last_vist: '26 Nov, 2022',
		next_appointment: {
			date: '24 Dec, 2022',
			start_at: '22 Jan, 2023',
			end_at: '22 jan, 2023',
			problem: 'Swelling',
			reason_of_visit: 'Pain',
			status: 'booked',
			cancellation_note: 'No cancel',
		},
		last_appointment: {
			date: '24 Dec, 2022',
			start_at: '22 Jan, 2023',
			end_at: '22 jan, 2023',
			problem: 'Swelling',
			reason_of_visit: 'Pain',
			status: 'booked',
			cancellation_note: 'No cancel',
		},
		recent_cases: [
			{
				id: 2,
				name: 'swelling case',
				start_date: '22 Nov, 2022',
				end_date: '22 Dec, 2022',
				problem_category: 'swelling',
				patient_concern: 'pain',
				problem: 'swelling',
				appointment_id: 3,
			},
		],
		notes: [
			{
				id: 2,
				text: 'looks bad',
				updated_at: '22 Nov, 2022',
			},
		],
	};
	const handleUpdatePatient = (e: SyntheticEvent) => {};
	const handleNameEditor = () => {};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};
	const handleSelectChange = (e: SyntheticEvent) => {};
	const formErrors = {};
	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PatientDetailEditForm
						patientDetail={patientDetail}
						handleChange={handleChange}
						handleUpdatePatient={handleUpdatePatient}
						handleSelectChange={handleSelectChange}
						formErrors={formErrors}
					/>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render form component ', () => {
		expect(container.find('form').length).toEqual(1);
	});
	it('should render form title', () => {
		expect(container.find('.test-form-title').length).toEqual(1);
	});
	it('should render all p tags ', () => {
		expect(container.find('p').length).toEqual(15);
	});
	it('should render edit icon', () => {
		expect(container.find('img').length).toEqual(1);
	});
});
