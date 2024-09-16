import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	ICreateWorkspaceResponse,
	IWorkspaceDetails,
} from '../../../../core/interfaces/workspace.interface';
import { createWorkspace } from '../../../../core/redux/actions/workspaceActions';
import WorkspaceService from '../../../../core/services/workspace.service';

describe('Create Workspace thunks', () => {
	let workspace: jest.Mocked<typeof WorkspaceService>;

	beforeAll(() => {
		workspace = WorkspaceService as jest.Mocked<typeof WorkspaceService>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/workspace.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<
			ICreateWorkspaceResponse,
			IWorkspaceDetails,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IWorkspaceDetails;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(WorkspaceService, 'createWorkspace');
			workspace.createWorkspace.mockClear();
			workspace.createWorkspace.mockResolvedValue({
				name: 'test',
				status: 'test',
				id: 123,
				slug: 'testing',
				type: 'personal',
			});
			arg = {
				name: 'testing',
				type: 'personal',
			};

			result = {};

			action = createWorkspace(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(workspace.createWorkspace(arg)).resolves.toStrictEqual(
				{
					name: 'test',
					status: 'test',
					id: 123,
					slug: 'testing',
					type: 'personal',
				},
			);
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(workspace.createWorkspace).toHaveBeenCalledWith(arg);
		});
	});
});
