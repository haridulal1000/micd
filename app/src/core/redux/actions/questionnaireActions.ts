import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	ICreateCommentDets,
	ICreateCommentResponse,
	IGetQuestionnaireRequest,
	IGetQuestionnaireResponse,
	IUpdateAnswersDets,
	IUpdateAnswersResponse,
} from '../../interfaces/questionnaire.interface';
import questionnaireService, {
	getPatientQuestionnaireSummaryService,
} from '../../services/questionnaire.service';
import { IQuestionnaireSummary } from '../../interfaces/patient.interface';

export const getQuestionnaire = createAsyncThunk<
	IGetQuestionnaireResponse,
	IGetQuestionnaireRequest
>(
	'questionnaire',
	async (
		questionnaireDets: IGetQuestionnaireRequest,
		{ rejectWithValue },
	) => {
		try {
			const res: any = await questionnaireService.getQuestionnaireService(
				questionnaireDets,
			);
			return res.data as IGetQuestionnaireResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const createComment = createAsyncThunk<
	ICreateCommentResponse,
	ICreateCommentDets
>(
	'question/comment',
	async (commentDetails: ICreateCommentDets, { rejectWithValue }) => {
		try {
			const res: any = await questionnaireService.createCommentService(
				commentDetails,
			);
			return res.data as ICreateCommentResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const updateAnswers = createAsyncThunk<
	IUpdateAnswersResponse,
	IUpdateAnswersDets
>('answer', async (answersDetails: IUpdateAnswersDets, { rejectWithValue }) => {
	try {
		const res: any = await questionnaireService.updateAnswersService(
			answersDetails,
		);
		return res.data as IUpdateAnswersResponse;
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const getPatientQuestionnaireSummary = createAsyncThunk<
	IQuestionnaireSummary[],
	{ patientId: number; workspaceSlug: string }
>(
	'get_questionnaire_summary',
	async (
		requestBody: { patientId: number; workspaceSlug: string },
		{ rejectWithValue },
	) => {
		try {
			const res: any = await getPatientQuestionnaireSummaryService(
				requestBody.patientId,
				requestBody.workspaceSlug,
			);
			if (res.data && res.data.length > 0) {
				return res.data as IQuestionnaireSummary[];
			}
			return [];
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);
