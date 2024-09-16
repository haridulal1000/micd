import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	IGetAllPatientsResponse,
	IPatientRequest,
} from '../../../../core/interfaces/patient.interface';
import { getAllPatients } from '../../../../core/redux/actions/patientActions';
import PatientService from '../../../../core/services/patient.service';

describe('List Patients thunks', () => {
	let patient: jest.Mocked<typeof PatientService>;

	beforeAll(() => {
		patient = PatientService as jest.Mocked<typeof PatientService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<
			IGetAllPatientsResponse,
			IPatientRequest,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IPatientRequest;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(PatientService, 'getAllPatientsService');
			patient.getAllPatientsService.mockClear();
			patient.getAllPatientsService.mockResolvedValue({
				info: {
					count: 2,
					pages: 20,
					next: '/api/v1/patients?page=2',
					prev: '/api/v1/patients?page=1',
				},
				results: [
					{
						address: 'Lalitpur',
						occupation: 'null',
						last_name: 'Milan',
						status: 'details_pending',
						emergency_contact: '9847477484',
						contact_number: '9844755657',
						nationality: 'Nepali',
						sex: 'male',
						first_name: 'Jack',
						id: 20,
						email: 'minga@gmail.com',
						age: 50,
						next_appointment: null,
					},
				],
			});
			arg = {
				workspace: '1d9e447b-b6c6-4afb-b95c-3d3eea1a1bdb',
			};

			result = {};

			action = getAllPatients(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				patient.getAllPatientsService(arg),
			).resolves.toStrictEqual({
				info: {
					count: 2,
					pages: 20,
					next: '/api/v1/patients?page=2',
					prev: '/api/v1/patients?page=1',
				},
				results: [
					{
						address: 'Lalitpur',
						occupation: 'null',
						last_name: 'Milan',
						status: 'details_pending',
						emergency_contact: '9847477484',
						contact_number: '9844755657',
						nationality: 'Nepali',
						sex: 'male',
						first_name: 'Jack',
						id: 20,
						email: 'minga@gmail.com',
						age: 50,
						next_appointment: null,
					},
				],
			});
		});
	});
});
