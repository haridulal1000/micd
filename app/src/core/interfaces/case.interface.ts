import { SyntheticEvent } from 'react';
import { IProblem } from './problems.interface';
import { MedicalTestsResponse } from './medicalTests.interface';

export interface ICaseImage {
	id: number;
	image_url: string;
	thumbnail_url: string;
	description: string;
	file_name: string;
	created_at: string;
}

export interface INotes {
	id: number;
	text: string;
	updated_at: string;
}

export interface ICaseAccess {
	id: number;
	case_id: number;
	shared_by: number;
	shared_to: number;
	status: 'active';
	access_type: 'read' | 'write';
}

export interface ICaseDetailsStageDetails {
	case_details: {
		case_number: number;
		id: number;
		name: string;
		start_date: string;
		end_date: string;
		problem_category: string;
		patient_concern: string;
		problem: string;
		workspace_case_id: string;
		shared_with: {
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			user_avatar: {
				avatar_url: string;
				type: string;
			};
			case_access_id: number;
			shared_on: number;
			access_type: 'read' | 'write';
		}[];
		problems: IProblem[];
	};
	notes: INotes[];
	medical_tests: MedicalTestsResponse[];
}

export interface ICaseDetailsDocumentStage extends ICaseDetailsStageDetails {
	case_images: ICaseImage[];
	general_images: ICaseImage[];
	tooth_specific_images: ICaseImage[];
}

export interface IPatientCase {
	id: number;
	name: string;
	start_date: string;
	end_date: string;
	problem_category: string;
	patient_concern: string;
	problems: string[];
	workspace_case_id: string;
}
export interface IPatientCaseResponse {
	[key: string]: IPatientCase[];
}

export interface ICaseDetailsDetectStage extends ICaseDetailsStageDetails {
	images: ICaseImage[];
}

export interface ICaseDetailsDiscussStage extends ICaseDetailsStageDetails {
	images: ICaseImage[];
}

export interface ICaseTreatment {
	id: number;
	urgency: 'low' | 'medium' | 'high';
	patient_concern: 'low' | 'medium' | 'high';
	decision: 'pending' | 'accepted' | 'want_modification' | 'denied';
	status: 'pending' | 'ongoing' | 'completed';
	treatment_cost: string;

	biological_cost: 'low' | 'medium' | 'high';
	total_visits: number;
	code: string;
}

export interface ICaseDetailsDesignStage extends ICaseDetailsStageDetails {
	images: ICaseImage[];
	treatments: ICaseTreatment[];
}

export interface ICaseDetailsDecideStage extends ICaseDetailsStageDetails {
	images: ICaseImage[];
	treatments: ICaseTreatment[];
}

export interface ICaseDetailsDeliverStage extends ICaseDetailsStageDetails {
	images: ICaseImage[];
	treatments: ICaseTreatment[];
}

export interface CaseCardProps {
	caseDetails: IPatientCase;
	handleOpenAddAppointmentDrawer: (e: SyntheticEvent, caseId: string) => void;
	setShareCaseModalfor: (caseId: number) => void;
}

export interface IDentalProblemDetails {
	problem_name: string;
	details: {
		field: string;
		value: string;
	}[];
}

export interface IDentalSummaryQuestionnaire {
	questionnaire_name: string;
	questions: {
		question_text: string;
		answer: string;
	}[];
}

export interface ICaseProblemSummary {
	examinations: {
		patient_tooth_id: number;
		name: string;
		tooth_number_universal: string;
		tooth_number_palmer: string;
		tooth_number_fdi: string;
		thumbnail: string;
		image_top: string;
		image_right: string;
		image_left: string;
		dental_chart_problems: IDentalProblemDetails[];
		perio_chart_problems: IDentalProblemDetails[];
		general_chart_problems: IDentalProblemDetails[];
	}[];
	questionnaires: IDentalSummaryQuestionnaire[];
}

export interface AccessWorkspace {
	name: string;
	type: string;
}

export interface AccessPatient {
	first_name: string;
	last_name: string;
	avatar_url: string | null;
	workspace_patient_id: string;
}

export interface AccessCase {
	id: number;
	name: string | null;
	start_date: string;
	workspace_case_id: string;
	patient: AccessPatient;
	problems: string[];
	access_type: string;
	created_at: string;
}

export interface AccessWorkspaceData {
	workspace: AccessWorkspace;
	cases: AccessCase[];
}
