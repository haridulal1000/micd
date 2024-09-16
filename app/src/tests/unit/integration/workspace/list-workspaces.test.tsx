import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { IGetAllWorkspacesResponse } from '../../../../core/interfaces/workspace.interface';
import { getAllWorkspaces } from '../../../../core/redux/actions/workspaceActions';
import WorkspaceService from '../../../../core/services/workspace.service';

describe('List workspace thunks', () => {
	let workspace: jest.Mocked<typeof WorkspaceService>;

	beforeAll(() => {
		workspace = WorkspaceService as jest.Mocked<typeof WorkspaceService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/workspace.service');
	});

	describe('list-workspaces', () => {
		let action: AsyncThunkAction<IGetAllWorkspacesResponse[], void, {}>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(WorkspaceService, 'getAllWorkspaces');
			workspace.getAllWorkspaces.mockClear();
			workspace.getAllWorkspaces.mockResolvedValue({
				name: 'My Workspace',
				status: 'Pending',
				slug: 'jrbbfhfibithrttg',
				type: 'Personal',
				cases: 0,
				appointments: 0,
			});

			result = {};

			action = getAllWorkspaces();
		});

		it('returned data is correctly mocked', async () => {
			await expect(workspace.getAllWorkspaces()).resolves.toStrictEqual({
				name: 'My Workspace',
				status: 'Pending',
				slug: 'jrbbfhfibithrttg',
				type: 'Personal',
				cases: 0,
				appointments: 0,
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(workspace.getAllWorkspaces).toHaveBeenCalledWith();
		});
	});
});
