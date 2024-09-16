import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { updatePatient } from '../../../../core/redux/actions/patientActions';
import {
	IUpdatePatientDets,
	IUpdatePatientResponse,
} from '../../../../core/interfaces/patient.interface';
import PatientService from '../../../../core/services/patient.service';

// Mock the PatientService
jest.mock('../../../../app/core/services/patient.service', () => ({
	updatePatient: jest.fn(() => ({})),
}));

describe('patient thunks', () => {
	let patient: jest.Mocked<typeof PatientService>;

	beforeAll(() => {
		patient = PatientService as jest.Mocked<typeof PatientService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/patient.service');
	});

	describe('create', () => {
		let action: AsyncThunkAction<
			IUpdatePatientResponse,
			IUpdatePatientDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IUpdatePatientDets;
		let result: IUpdatePatientResponse;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			const reg = jest.spyOn(updatePatient, 'fulfilled');

			jest.spyOn(PatientService, 'updatePatientService');
			jest.spyOn(reg, 'mockReturnValue');
			patient.updatePatientService.mockClear();

			arg = {
				patient_id: 1,
				workspace: '1d9e447b-b6c6-4afb-b95c-3d3eea1a1bdb',
				first_name: 'Raya',
				last_name: 'Rio',
				age: 23,
				sex: 'female',
				contact_number: '36964387',
				email: 'raya@gmail.com',
				emergency_contact: '12345678',
				address: 'Kathmandu',
				occupation: 'Teacher',
				nationality: 'Nepali',
			};

			result = {
				id: 1,
				first_name: 'Raya',
				last_name: 'Rio',
				age: 23,
				sex: 'female',
				contact_number: '36964387',
				email: 'raya@gmail.com',
				emergency_contact: '12345678',
				address: 'Kathmandu',
				status: 'enrolled',
				occupation: 'Teacher',
				nationality: 'Nepali',
			};

			action = updatePatient(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(patient.updatePatientService).toHaveBeenCalledWith(arg);
		});
	});
});
