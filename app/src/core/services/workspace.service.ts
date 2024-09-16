import { z } from 'zod';
import getAxiosInstance from './interceptor';
import {
	ICreateWorkspaceResponse,
	IGetAllWorkspacesResponse,
	ISkillSetResponse,
	IWorkspaceDetails,
	IWorkspaceImageDets,
	IWorkspaceServiceCode,
} from '../interfaces/workspace.interface';
import { IGetUpcomingAppointmentsFromAllWorkspaces } from '../interfaces/appointment.interface';
import { IUserSkillSetSummary } from '../interfaces/skillsets.interface';

export const newSkillSetSchema = z.object({
	skillSetName: z
		.string({
			required_error: 'Skill set name is required',
		})
		.nonempty('Skill set name is required'),
	level: z
		.string({
			required_error: 'Skill set level is required',
		})
		.nonempty('Skill set level is required'),
	category: z
		.string({
			required_error: 'Skill set category is required',
		})
		.nonempty('Skill set category is required'),
});

export const serviceCodeSchema = z.object({
	name: z.string().nonempty("Service code name is required'"),
	treatmentCost: z.coerce
		.number({
			required_error: 'Treatment cost is required',
			invalid_type_error: 'Treatment cost must be a number',
		})
		.min(1, 'Treatment cost must be greater than 0'),
	biologicalCost: z.string().nonempty('Biological cost is required'),
	totalVisits: z.coerce
		.number({
			required_error: 'Times is required',
			invalid_type_error: 'Times must be a number',
		})
		.min(1, 'Times must be greater than 0'),
	code: z
		.string()
		.nonempty(
			'Service code is required. Please enter a valid service code',
		),
});

export type NewSkillSetFormInputs = z.infer<typeof newSkillSetSchema>;
export type ServiceCodeFormInputs = z.infer<typeof serviceCodeSchema>;

const createWorkspace = async (
	workspaceDets: IWorkspaceDetails,
): Promise<ICreateWorkspaceResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('workspace', workspaceDets, axiosConfig);
};

const uploadWorkspaceImage = async (
	workspaceImageDets: IWorkspaceImageDets,
): Promise<ICreateWorkspaceResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'multipart/form-data',
			Workspace: workspaceImageDets.slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'workspace/image',
		{
			file: workspaceImageDets.file,
		},
		axiosConfig,
	);
};

const removeWorkspaceImage = async (workspaceSlug: string): Promise<void> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete('workspace/image', axiosConfig);
};

const getAllWorkspaces = async (): Promise<IGetAllWorkspacesResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('workspaces', axiosConfig);
};

const getUpcomingAppointments = async (
	workspaceSlug?: string,
): Promise<IGetUpcomingAppointmentsFromAllWorkspaces> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('appointments/upcoming', axiosConfig);
};

export const getWorkspaceServiceCodes = async (
	workspaceSlug: string,
): Promise<IWorkspaceServiceCode[]> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.get('workspace/service-codes', axiosConfig);
	return res.data as IWorkspaceServiceCode[];
};

export const createWorkspaceServiceCode = async (
	workspaceSlug: string,
	body: ServiceCodeFormInputs,
): Promise<IWorkspaceServiceCode> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.post(
		'workspace/service-code',
		{
			name: body.name,
			treatment_cost: body.treatmentCost,
			biological_cost: body.biologicalCost,
			total_visits: body.totalVisits,
			code: body.code,
		},
		axiosConfig,
	);
	return res.data as IWorkspaceServiceCode;
};

export const updateServiceCodeForWorkspace = async (
	workspaceSlug: string,
	serviceCodeId: number,

	body: ServiceCodeFormInputs,
): Promise<IWorkspaceServiceCode> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.patch(
		`workspace/service-code/${serviceCodeId}`,
		{
			name: body.name,
			treatment_cost: body.treatmentCost,
			biological_cost: body.biologicalCost,
			total_visits: body.totalVisits,
			code: body.code,
		},
		axiosConfig,
	);
	return res.data as IWorkspaceServiceCode;
};

export const deleteServiceCodeForWorkspace = async (
	workspaceSlug: string,
	serviceCodeId: number,
): Promise<IWorkspaceServiceCode> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.delete(
		`workspace/service-code/${serviceCodeId}`,
		axiosConfig,
	);
	return res.data as IWorkspaceServiceCode;
};

// Adds a skill set to the list of workspace skill sets
export const createNewSkillSetForWorkspace = async (
	slug: string,
	body: NewSkillSetFormInputs,
): Promise<ISkillSetResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.post(
		'workspace/skillset',
		{
			name: body.skillSetName,
			level: body.level,
			category: body.category,
		},
		axiosConfig,
	);
	return res.data as ISkillSetResponse;
};

export const getSkillSetsForWorkspace = async (
	slug: string,
): Promise<ISkillSetResponse[]> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.get('workspace/skillsets', axiosConfig);
	return res.data as ISkillSetResponse[];
};

export const getUserSkillSetSummaryService = async (
	slug: string,
): Promise<IUserSkillSetSummary> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.get('user-skillsets/summary', axiosConfig);
	return res.data as IUserSkillSetSummary;
};

export const deleteSkillSetForWorkspace = async (
	slug: string,
	skillSetId: number,
): Promise<ISkillSetResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.delete(
		`workspace/skillset/${skillSetId}`,
		axiosConfig,
	);
	return res.data as ISkillSetResponse;
};

export const updateSkillSetForWorkspace = async (
	slug: string,
	skillSetId: number,
	body: NewSkillSetFormInputs,
): Promise<ISkillSetResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.patch(
		`workspace/skillset/${skillSetId}`,
		{
			name: body.skillSetName,
			level: body.level,
			category: body.category,
		},
		axiosConfig,
	);
	return res.data as ISkillSetResponse;
};

const updateWorkspaceName = async (
	slug: string,
	body: Partial<IWorkspaceDetails>,
): Promise<ICreateWorkspaceResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.patch('workspace', body, axiosConfig);
	return res.data as ICreateWorkspaceResponse;
};

export default {
	createWorkspace,
	uploadWorkspaceImage,
	removeWorkspaceImage,
	getAllWorkspaces,
	getUpcomingAppointments,
	updateWorkspaceName,
};
