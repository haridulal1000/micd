import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	IGetUpcomingAppointmentsFromAllWorkspaces,
	IUpcomingAppointmentsForAWorkspace,
	IUpcomingAppointmentsForAWorkspaceRequestDet,
} from '../../interfaces/appointment.interface';
import {
	ICreateWorkspaceResponse,
	IGetAllWorkspacesResponse,
	IUploadWorkspaceImageResponse,
	IWorkspaceDetails,
	IWorkspaceImageDets,
} from '../../interfaces/workspace.interface';
import workspaceService, {
	getUserSkillSetSummaryService,
} from '../../services/workspace.service';
import { IUserSkillSetSummary } from '../../interfaces/skillsets.interface';

export const createWorkspace = createAsyncThunk<
	ICreateWorkspaceResponse,
	IWorkspaceDetails
>(
	'workspace',
	async (workspaceDetails: IWorkspaceDetails, { rejectWithValue }) => {
		try {
			const res: any = await workspaceService.createWorkspace(
				workspaceDetails,
			);
			return res.data as ICreateWorkspaceResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const uploadWorkspaceImage = createAsyncThunk<
	IUploadWorkspaceImageResponse,
	IWorkspaceImageDets
>(
	'workspaceImage',
	async (workspaceImageDetails: IWorkspaceImageDets, { rejectWithValue }) => {
		try {
			const res: any = await workspaceService.uploadWorkspaceImage(
				workspaceImageDetails,
			);
			return res.data as IUploadWorkspaceImageResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const removeWorkspaceImage = createAsyncThunk<void, string>(
	'workspaceImageRvm',
	async (slug: string, { rejectWithValue }) => {
		try {
			const res: any = await workspaceService.removeWorkspaceImage(slug);
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const getAllWorkspaces = createAsyncThunk<
	IGetAllWorkspacesResponse[],
	void
>('workspaces', async (_, { rejectWithValue }) => {
	try {
		const res: any = await workspaceService.getAllWorkspaces();
		return res.data as IGetAllWorkspacesResponse[];
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const getUpcomingAppointmentsFromAllWorkspaces = createAsyncThunk<
	IGetUpcomingAppointmentsFromAllWorkspaces[],
	void
>('upcomingAppointments', async (_, { rejectWithValue }) => {
	try {
		const res: any = await workspaceService.getUpcomingAppointments();
		return res.data as IGetUpcomingAppointmentsFromAllWorkspaces[];
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const getUpcomingAppointmentsFromAWorkspace = createAsyncThunk<
	IUpcomingAppointmentsForAWorkspace[],
	IUpcomingAppointmentsForAWorkspaceRequestDet
>(
	'upcomingAppointmentsForAWorkspace',
	async (
		requestDetails: IUpcomingAppointmentsForAWorkspaceRequestDet,
		{ rejectWithValue },
	) => {
		try {
			const res: any = await workspaceService.getUpcomingAppointments(
				requestDetails.workspaceSlug,
			);
			return res.data as IUpcomingAppointmentsForAWorkspace[];
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const getUserSkillSetSummary = createAsyncThunk<
	IUserSkillSetSummary,
	{ workspaceSlug: string }
>(
	'userSkillSetSummary',
	async (requestDetails: { workspaceSlug: string }, { rejectWithValue }) => {
		try {
			const res: any = await getUserSkillSetSummaryService(
				requestDetails.workspaceSlug,
			);
			return res as IUserSkillSetSummary;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const updateWorkspaceName = createAsyncThunk<
	ICreateWorkspaceResponse,
	{ slug: string; workspaceDetails: Partial<IWorkspaceDetails> }
>(
	'updateWorkspaceDetails',
	async ({ workspaceDetails, slug }, { rejectWithValue }) => {
		try {
			const res: any = await workspaceService.updateWorkspaceName(
				slug,
				workspaceDetails,
			);

			return res.data as ICreateWorkspaceResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);
