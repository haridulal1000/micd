import { createSlice } from '@reduxjs/toolkit';
import {
	getQuestionnaire,
	createComment,
	updateAnswers,
	getPatientQuestionnaireSummary,
} from '../actions/questionnaireActions';
import {
	IQuestion,
	IQuestionnaireState,
} from '../../interfaces/questionnaire.interface';

const initialState: IQuestionnaireState = {
	loading: false,
	error: null,
	success: false,
	questionnaireInfo: null,
	commentInfo: null,
	commentBoxVisibility: null,
	waitingForSummary: false,
	patientQuestionnaireSummary: [],
	answersInfo: null,
};

const questionnaireSlice = createSlice({
	name: 'questionnaire',
	initialState,
	reducers: {
		showCommentBox: (state, action) => {
			state.commentBoxVisibility = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			getQuestionnaire.pending,
			(state: IQuestionnaireState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getQuestionnaire.fulfilled,
			(state: IQuestionnaireState, action) => {
				state.loading = false;
				state.error = null;
				state.questionnaireInfo = action.payload;
			},
		);
		builder.addCase(
			getQuestionnaire.rejected,
			(state: IQuestionnaireState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.questionnaireInfo = null;
			},
		);
		builder.addCase(createComment.pending, (state: IQuestionnaireState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			createComment.fulfilled,
			(state: IQuestionnaireState, action): void => {
				state.loading = false;
				state.error = null;
				state.questionnaireInfo?.sections.forEach((section) => {
					section.questions.forEach((question: IQuestion) => {
						if (question.question_id === action.payload.question_id)
							question.comments = [
								...question.comments,
								{
									id: question.question_id,
									comment: action.payload.comment,
									updated_at: action.payload.updated_at,
								},
							];
					});
				});
			},
		);
		builder.addCase(
			createComment.rejected,
			(state: IQuestionnaireState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.commentInfo = null;
			},
		);

		builder.addCase(updateAnswers.pending, (state: IQuestionnaireState) => {
			state.loading = true;
			state.error = null;
		});

		builder.addCase(
			updateAnswers.fulfilled,
			(state: IQuestionnaireState, action) => {
				state.loading = false;
				state.answersInfo = action.payload;
				state.error = null;

				const answerId: number = parseInt(
					Object.keys(action.payload)[0],
					10,
				);

				state.questionnaireInfo?.sections.forEach((section) => {
					section.questions.forEach((question) => {
						if (question.answer.id === answerId)
							question.answer.value = action.payload[answerId]
								.value as boolean;
					});
				});
			},
		);

		builder.addCase(
			updateAnswers.rejected,
			(state: IQuestionnaireState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.questionnaireInfo = null;
			},
		);

		// patient questionnaire summary
		builder.addCase(
			getPatientQuestionnaireSummary.pending,
			(state: IQuestionnaireState) => {
				state.waitingForSummary = true;
				state.error = null;
			},
		);

		builder.addCase(
			getPatientQuestionnaireSummary.fulfilled,
			(state: IQuestionnaireState, action) => {
				state.waitingForSummary = false;
				state.patientQuestionnaireSummary = action.payload;
				state.error = null;
			},
		);

		builder.addCase(
			getPatientQuestionnaireSummary.rejected,
			(state: IQuestionnaireState, action) => {
				state.waitingForSummary = false;
				state.error = JSON.stringify(action.payload);
				state.patientQuestionnaireSummary = [];
			},
		);
	},
});
export const { showCommentBox } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
