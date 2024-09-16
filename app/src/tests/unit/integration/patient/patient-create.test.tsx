import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { createPatient } from '../../../../core/redux/actions/patientActions';
import {
	ICreatePatientDets,
	ICreatePatientResponse,
} from '../../../../core/interfaces/patient.interface';
import PatientService from '../../../../core/services/patient.service';

// Mock the PatientService
jest.mock('../../../../app/core/services/patient.service', () => ({
	createPatient: jest.fn(() => ({})),
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
			ICreatePatientResponse,
			ICreatePatientDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: ICreatePatientDets;
		let result: ICreatePatientResponse;

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();
			const reg = jest.spyOn(createPatient, 'fulfilled');

			jest.spyOn(PatientService, 'create');
			jest.spyOn(reg, 'mockReturnValue');
			patient.create.mockClear();

			arg = {
				workspace_slug: '22334',
				first_name: 'rohit123',
				last_name: 'tester',
				age: 23,
				sex: 'female',
				contact_number: '9841554466',
				emergency_contact: '+977-982-495-0430',
				address: 'birtamod',
			};

			result = {
				id: 1,
				first_name: 'rohit123',
				last_name: 'tester',
				age: 23,
				status: 'details_pending',
				sex: 'female',
				contact_number: '9841554466',
				emergency_contact: '+977-982-495-0430',
				address: 'birtamod',
			};

			action = createPatient(arg);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(patient.create).toHaveBeenCalledWith(arg);
		});
	});
});
