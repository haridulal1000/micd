import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import { getQuestionnaire } from '../../../../core/redux/actions/questionnaireActions';
import {
	IGetQuestionnaireRequest,
	IGetQuestionnaireResponse,
} from '../../../../core/interfaces/questionnaire.interface';
import QuestionnaireService from '../../../../core/services/questionnaire.service';

describe('Get QUestionnaire thunks', () => {
	let questionnaire: jest.Mocked<typeof QuestionnaireService>;

	beforeAll(() => {
		questionnaire = QuestionnaireService as jest.Mocked<
			typeof QuestionnaireService
		>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/auth.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<
			IGetQuestionnaireResponse,
			IGetQuestionnaireRequest,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IGetQuestionnaireRequest;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(QuestionnaireService, 'getQuestionnaireService');
			questionnaire.getQuestionnaireService.mockClear();
			questionnaire.getQuestionnaireService.mockResolvedValue({
				title: 'Lifestyle Screening',
				description: 'Lifestyle screening description.',
				sections: [
					{
						title: 'Living Habits',
						description: 'Living Habits description',
						questions: [
							{
								question_id: 123,
								text: 'Smoking',
								type: 'bool',
								answer: {
									id: 1122,
									value: true,
								},
								comments: [
									{
										id: 321,
										comment: '',
										updated_at: '',
									},
								],
							},
						],
					},
				],
			});
			arg = {
				workspace: '1d9e447b-b6c6-4afb-b95c-3d3eea1a1bdb',
				patient_id: 2,
				id_code: 'lifestyle_screening',
			};

			result = {};

			action = getQuestionnaire(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				questionnaire.getQuestionnaireService(arg),
			).resolves.toStrictEqual({
				title: 'Lifestyle Screening',
				description: 'Lifestyle screening description.',
				sections: [
					{
						title: 'Living Habits',
						description: 'Living Habits description',
						questions: [
							{
								question_id: 123,
								text: 'Smoking',
								type: 'bool',
								answer: {
									id: 1122,
									value: true,
								},
								comments: [
									{
										id: 321,
										comment: '',
										updated_at: '',
									},
								],
							},
						],
					},
				],
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(questionnaire.getQuestionnaireService).toHaveBeenCalledWith(
				arg,
			);
		});
	});
});
