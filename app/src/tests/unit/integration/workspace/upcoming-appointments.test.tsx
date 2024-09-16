import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IGetUpcomingAppointmentsFromAllWorkspaces } from '../../../../core/interfaces/appointment.interface';
import { getUpcomingAppointmentsFromAllWorkspaces } from '../../../../core/redux/actions/workspaceActions';
import WorkspaceService from '../../../../core/services/workspace.service';

describe('Upcoming appointments thunks', () => {
	let workspace: jest.Mocked<typeof WorkspaceService>;

	beforeAll(() => {
		workspace = WorkspaceService as jest.Mocked<typeof WorkspaceService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/workspace.service');
	});

	describe('list-upcoming-appointments', () => {
		let action: AsyncThunkAction<
			IGetUpcomingAppointmentsFromAllWorkspaces[],
			void,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(WorkspaceService, 'getUpcomingAppointments');
			workspace.getUpcomingAppointments.mockClear();
			workspace.getUpcomingAppointments.mockResolvedValue({
				patient_name: 'Some name',
				workspace_name: 'some workspace',
				date: '1232340123000',
				start_at: '123949203900',
			});

			result = {};

			action = getUpcomingAppointmentsFromAllWorkspaces();
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				workspace.getUpcomingAppointments(),
			).resolves.toStrictEqual({
				patient_name: 'Some name',
				workspace_name: 'some workspace',
				date: '1232340123000',
				start_at: '123949203900',
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(workspace.getUpcomingAppointments).toHaveBeenCalledWith();
		});
	});
});
