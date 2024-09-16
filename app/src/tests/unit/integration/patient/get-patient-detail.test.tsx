import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { getPatientDetail } from '../../../../core/redux/actions/patientActions';
import {
	IGetPatientDetailDets,
	IGetPatientDetailResponse,
} from '../../../../core/interfaces/patient.interface';
import PatientService from '../../../../core/services/patient.service';

// Mock the PatientService
jest.mock('../../../../app/core/services/patient.service', () => ({
	createPatient: jest.fn(() => ({})),
}));

describe('get patient detail thunks', () => {
	let patient: jest.Mocked<typeof PatientService>;

	beforeAll(() => {
		patient = PatientService as jest.Mocked<typeof PatientService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/patient.service');
	});

	describe('create', () => {
		let action: AsyncThunkAction<
			IGetPatientDetailResponse,
			IGetPatientDetailDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IGetPatientDetailDets;
		let result: IGetPatientDetailResponse;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			const reg = jest.spyOn(getPatientDetail, 'fulfilled');

			jest.spyOn(PatientService, 'getPatientDetailService');
			jest.spyOn(reg, 'mockReturnValue');
			patient.getPatientDetailService.mockClear();

			arg = {
				patient_id: 2,
				workspace: '1d9e447b-b6c6-4afb-b95c-3d3eea1a1bdb',
			};

			result = {
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

			action = getPatientDetail(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(patient.getPatientDetailService).toHaveBeenCalledWith(arg);
		});
	});
});
