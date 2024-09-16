import { IQuestionnaireSummary } from './patient.interface';

export interface IAnswer {
	id: number;
	value: boolean;
}

export interface IComment {
	id: number;
	comment: string;
	updated_at: string;
}

export interface IQuestion {
	question_id: number;
	text: string;
	type: string;
	answer: IAnswer;
	comments: IComment[];
}

export interface ISection {
	title: string;
	description: string;
	questions: IQuestion[];
}

export interface IGetQuestionnaireResponse {
	title: string;
	description: string;
	sections: ISection[];
}

export interface IGetQuestionnaireRequest {
	patient_id: number;
	id_code: string;
	workspace: string;
}

export interface ICreateCommentDets {
	patient_id: number;
	question_id: number;
	comment: string;
	workspace: string;
}

export interface ICreateCommentResponse {
	id: number;
	comment: string;
	updated_at: string;
	question_id: number;
}

export interface IUpdateAnswer {
	id: number;
	value: boolean | null;
	question_id: number;
}

export interface IUpdateAnswersDets {
	patient_id: number;
	workspace: string;
	answers: IUpdateAnswer[];
}

export interface IUpdateAnswersResponse {
	[id_of_answer: number]: {
		value: boolean;
		result: string;
		message?: string;
	};
}
export interface IQuestionnaireState {
	loading: boolean;
	error: string | null;
	success: boolean;
	questionnaireInfo: IGetQuestionnaireResponse | null;
	commentInfo: ICreateCommentResponse | null;
	commentBoxVisibility: number | null;
	answersInfo: IUpdateAnswersResponse | null;
	waitingForSummary: boolean;
	patientQuestionnaireSummary: IQuestionnaireSummary[] | [];
}
