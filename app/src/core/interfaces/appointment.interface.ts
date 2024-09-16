export interface IGetUpcomingAppointmentsFromAllWorkspaces {
	date: string;
	start_at: string;
	patient_name: string;
	workspace_name: string;
}

export type IUpcomingAppointmentsForAWorkspace = Omit<IAppointment, 'status'>;

export type IUpcomingAppointmentsForAWorkspaceRequestDet = {
	workspaceSlug: string;
};

export interface IAppointment {
	id: number;
	patient_id: number;
	workspace_patient_id: string;
	patient_name: string;
	patient_avatar_url: string;
	date: string;
	start_at: string;
	end_at: string;
	problem: string;
	reason_of_visit: string;
	status: string;
	cancellation_note: string;
	case_id: string;
	case_name: string;
}

export interface IAppointmentMutResponse {
	id: number;
	case_id: number;
	patient_id: number;
	workspace_patient_id: string;
	first_name: string;
	last_name: string;
	avatar_url: string;
	date: string;
	start_at: string;
	end_at: string;
	problem: string;
	reason_of_visit: string;
	status: string;
	cancellation_note: string;
	conflicted: boolean;
}

export interface IAppointmentUpdate {
	date?: number;
	start_at?: number;
	end_at?: number;
	patient_id?: number;
	problem?: string;
	reason_of_visit?: string;
}
