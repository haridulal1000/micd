import {
	IGetUpcomingAppointmentsFromAllWorkspaces,
	IUpcomingAppointmentsForAWorkspace,
} from './appointment.interface';
import { IUserSkillSetSummary } from './skillsets.interface';

export interface IWorkspaceDetails {
	name: string;
	type: string;
}
export interface IWorkspaceImageDets {
	slug: string;
	file: File;
}
export interface IUploadWorkspaceImageResponse {
	image_url: string;
}

export interface ISkillSetResponse {
	id: number;
	name: string;
	level: 'basic' | 'intermediate' | 'advanced';
	category: string;
	skillset_number: number;
	workspace_skillset_id: string;
}

export type TWorkspacePatientDetails = {
	first_name: string;
	last_name: string;
	avatar_url: string | null;
};

export type TWorkspaceCaseDetails = {
	id: number;
	name: string | null;
	start_date: string;
	patient: TWorkspacePatientDetails;
	problems: string[];
};

export interface ICreateWorkspaceResponse {
	name: string;
	status: string;
	id: number;
	slug: string;
	type: string;
	appointments: number;
	image_url: string;
	cases: TWorkspaceCaseDetails[];
}

export interface IWorkspaceServiceCode {
	id: number;
	name: string;
	treatment_cost: number;
	biological_cost: string;
	total_visits: number;
	code: string;
	workspace_service_code_id: string;
}

export interface IGetAllWorkspacesResponse {
	name: string;
	status: string;
	slug: string;
	type: string;
	cases: TWorkspaceCaseDetails[];
	image_url: string;
}

export interface IWorkspaceState {
	loading: boolean;
	error: string | null;
	success: boolean;
	workspaceInfo: IGetAllWorkspacesResponse | null;
	allWorkspaces: IGetAllWorkspacesResponse[] | null;
	showAddWorkspace: boolean;
	upcomingAppointments: IGetUpcomingAppointmentsFromAllWorkspaces[] | null;
	upcomingAppointmentsForAWorkspace:
		| IUpcomingAppointmentsForAWorkspace[]
		| null;
	userSkillSetSummary: IUserSkillSetSummary | null;
}
