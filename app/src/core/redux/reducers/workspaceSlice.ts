import { createSlice } from '@reduxjs/toolkit';
import { IWorkspaceState } from '../../interfaces/workspace.interface';
import {
	createWorkspace,
	getAllWorkspaces,
	getUpcomingAppointmentsFromAWorkspace,
	getUpcomingAppointmentsFromAllWorkspaces,
	getUserSkillSetSummary,
} from '../actions/workspaceActions';

const initialState: IWorkspaceState = {
	loading: false,
	error: null,
	success: false,
	workspaceInfo: null,
	allWorkspaces: null,
	showAddWorkspace: false,
	upcomingAppointments: null,
	upcomingAppointmentsForAWorkspace: null,
	userSkillSetSummary: null,
};

const workspaceSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		setActiveWorkspace: (state, action) => {
			state.workspaceInfo = action.payload;
		},
		updateUpcomingAppointmentsFromAWorkspace: (state, action) => {
			state.upcomingAppointmentsForAWorkspace =
				state.upcomingAppointmentsForAWorkspace
					? [
							...state.upcomingAppointmentsForAWorkspace,
							{ ...action.payload },
					  ]
					: [{ ...action.payload }];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createWorkspace.pending, (state: IWorkspaceState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			createWorkspace.fulfilled,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = null;
				state.workspaceInfo = action.payload;
			},
		);
		builder.addCase(
			createWorkspace.rejected,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.workspaceInfo = null;
			},
		);

		builder.addCase(getAllWorkspaces.pending, (state: IWorkspaceState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			getAllWorkspaces.fulfilled,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = null;
				state.allWorkspaces = action.payload;
			},
		);
		builder.addCase(
			getAllWorkspaces.rejected,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.allWorkspaces = null;
			},
		);

		builder.addCase(
			getUpcomingAppointmentsFromAllWorkspaces.pending,
			(state: IWorkspaceState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getUpcomingAppointmentsFromAllWorkspaces.fulfilled,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = null;
				state.upcomingAppointments = action.payload;
			},
		);
		builder.addCase(
			getUpcomingAppointmentsFromAllWorkspaces.rejected,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.upcomingAppointments = null;
			},
		);
		builder.addCase(
			getUpcomingAppointmentsFromAWorkspace.pending,
			(state: IWorkspaceState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getUpcomingAppointmentsFromAWorkspace.fulfilled,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = null;
				state.upcomingAppointmentsForAWorkspace = action.payload;
			},
		);
		builder.addCase(
			getUpcomingAppointmentsFromAWorkspace.rejected,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.upcomingAppointmentsForAWorkspace = null;
			},
		);
		builder.addCase(
			getUserSkillSetSummary.pending,
			(state: IWorkspaceState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getUserSkillSetSummary.fulfilled,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = null;
				state.userSkillSetSummary = action.payload;
			},
		);
		builder.addCase(
			getUserSkillSetSummary.rejected,
			(state: IWorkspaceState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.userSkillSetSummary = null;
			},
		);
	},
});

export const { setActiveWorkspace, updateUpcomingAppointmentsFromAWorkspace } =
	workspaceSlice.actions;
export default workspaceSlice.reducer;
