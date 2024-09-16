import getAxiosInstance from './interceptor';
import {
	ICreateCommentDets,
	ICreateCommentResponse,
	IGetQuestionnaireRequest,
	IGetQuestionnaireResponse,
	IUpdateAnswersDets,
	IUpdateAnswersResponse,
} from '../interfaces/questionnaire.interface';

const getQuestionnaireService = async (
	questionnaireRequest: IGetQuestionnaireRequest,
): Promise<IGetQuestionnaireResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: questionnaireRequest.workspace,
		},
		params: {
			patient_id: questionnaireRequest.patient_id,
			id_code: questionnaireRequest.id_code,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('questionnaire', axiosConfig);
};

const createCommentService = async (
	commentDets: ICreateCommentDets,
): Promise<ICreateCommentResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: commentDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('question/comment', commentDets, axiosConfig);
};

const updateAnswersService = async (
	updateAnswersDets: IUpdateAnswersDets,
): Promise<IUpdateAnswersResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: updateAnswersDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.patch('answer', updateAnswersDets, axiosConfig);
};

export const getPatientQuestionnaireSummaryService = async (
	patientId: number | null,
	currentWorkspaceSlug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: currentWorkspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(
		`questionnaire/summary?patient_id=${patientId}`,
		axiosConfig,
	);
};

export default {
	getQuestionnaireService,
	createCommentService,
	updateAnswersService,
};
