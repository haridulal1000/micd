import { number } from 'zod';
import { IPatientCaseResponse } from './case.interface';

export interface IPatientNextAppointment {
	date: string;
	start_at: string;
	end_at: string;
	problem: string;
	reason_of_visit: string;
	status: string;
	cancellation_note: string | null;
}

export interface IRecentPatientsResponse {
	id: number;
	workspace_patient_id: string;
	first_name: string;
	last_name: string;
	updated_at: string;
}

export interface IPatient {
	address: string;
	occupation: string;
	last_name: string;
	status: string;
	emergency_contact: string;
	contact_number: string;
	nationality: string;
	sex: string;
	first_name: string;
	id: number;
	email: string;
	age: number;
	workspace_patient_id: string | null;
	next_appointment: IPatientNextAppointment | null;
}

export interface IPageInfo {
	count: number;
	pages: number;
	next: string;
	prev: string;
}

export interface IGetAllPatientsResponse {
	info: IPageInfo;
	results: IPatient[];
}

export interface IAllPatientsState {
	loading: boolean;
	error: string | null;
	success: boolean;
	allPatientsInfo: IPatient[] | null;
	recentPatientsDetail: IRecentPatientsResponse[] | [];
	pageInfo: IPageInfo | null;
	patientDetail: IGetPatientDetailResponse | null;
	selectedPatient: IPatient | null;
	allCasesOfPatient: IPatientCaseResponse | null;
	patientNotes: IAddPatientNoteResponse[] | [];
}

export interface IPatientRequest {
	workspace: string;
	page?: number;
	sort?: 'id' | 'name' | 'address' | 'email' | 'contact_number';
	order?: 'asc' | 'desc';
	search?: string;
}

export interface IWorkspaceSlug {
	slug: string;
}

export interface ICreatePatientInitialState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

export interface ICreatePatientDets {
	first_name: string;
	last_name: string;
	age: number;
	sex: string;
	contact_number: string;
	emergency_contact: string;
	address: string;
	workspace_slug: string;
}

export interface ICreatePatientResponse {
	id: number;
	first_name: string;
	last_name: string;
	age: number;
	sex: string;
	contact_number: string;
	emergency_contact: string;
	address: string;
	status: string;
}

export interface IGetPatientDetailDets {
	patient_id: number;
	workspace: string;
}

export type IDeletePatientAvatarDets = IGetPatientDetailDets;

export interface IChangePatientAvatarDets extends IGetPatientDetailDets {
	file: File;
}

export interface IChangePatientAvatarResponse {
	avatar_url: string;
}

export interface INotes {
	id: number;
	text: string;
	updated_at: string;
}

export interface IRecentCases {
	id: number;
	name: string;
	start_date: string;
	end_date: string;
	problem_category: string;
	patient_concern: string;
	problems: string[];
	appointment_id: number;
	workspace_case_id: string;
}

export interface ILastAppointment {
	date: string;
	start_at: string;
	end_at: string;
	problem: string;
	reason_of_visit: string;
	status: string;
	cancellation_note: string;
}

export interface INextAppointment {
	date: string;
	start_at: string;
	end_at: string;
	problem: string;
	reason_of_visit: string;
	status: string;
	cancellation_note: string;
}

export interface IGetPatientDetailResponse {
	first_name: string;
	last_name: string;
	sex: string;
	age: number;
	avatar_url: string;
	email: string;
	contact_number: string;
	emergency_contact: string;
	address: string;
	registration_date: string;
	last_vist: string;
	next_appointment: INextAppointment;
	last_appointment: ILastAppointment;
	recent_cases: IRecentCases[];
	notes: INotes[];
}

export enum GenderEnum {
	male = 'male',
	female = 'female',
	other = 'other',
}
export interface IUpdatePatientDets {
	patient_id: number;
	workspace: string;
	first_name?: string | undefined;
	last_name?: string | undefined;
	age?: number | undefined;
	sex?: string | undefined;
	occupation?: string | undefined;
	nationality?: string | undefined;
	address?: string | undefined;
	contact_number?: string | undefined;
	email?: string | undefined;
	emergency_contact?: string | undefined;
}

export interface IUpdatePatientResponse {
	id: number;
	first_name: string;
	last_name: string;
	age: number;
	sex: string;
	contact_number: string;
	email: string;
	emergency_contact: string;
	address: string;
	status: string;
	occupation: string;
	nationality: string;
}
export interface IAddPatientNoteResponse {
	id: number;
	text: string;
	updated_at: string;
	user: {
		first_name: string;
		last_name: string;
		avatar: string | null;
	};
}

export interface IQuestionnaireSummary {
	title: string;
	yes_count: number;
	no_count: number;
	unanswered_count: number;
	yes_questions: Array<string> | [];
	no_questions: Array<string> | [];
	unanswered_questions: Array<string> | [];
}
