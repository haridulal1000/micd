import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	IUpdateAnswersDets,
	IUpdateAnswersResponse,
} from '../../../../core/interfaces/questionnaire.interface';
import { updateAnswers } from '../../../../core/redux/actions/questionnaireActions';
import QuestionnaireService from '../../../../core/services/questionnaire.service';

describe('Update Questionnaire Yes/No Answer', () => {
	let questionnaire: jest.Mocked<typeof QuestionnaireService>;

	beforeAll(() => {
		questionnaire = QuestionnaireService as jest.Mocked<
			typeof QuestionnaireService
		>;
	});

	afterAll(() => {
		jest.unmock('../../../../app/core/services/workspace.service');
	});

	describe('verify', () => {
		let action: AsyncThunkAction<
			IUpdateAnswersResponse,
			IUpdateAnswersDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: IUpdateAnswersDets;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(QuestionnaireService, 'updateAnswersService');
			questionnaire.updateAnswersService.mockClear();
			questionnaire.updateAnswersService.mockResolvedValue({
				'123': {
					value: true,
					result: 'success',
					message: '',
				},
			});
			arg = {
				workspace: '439643764',
				patient_id: 23,
				answers: [{ id: 123, value: true, question_id: 2 }],
			};

			result = {};

			action = updateAnswers(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				questionnaire.updateAnswersService(arg),
			).resolves.toStrictEqual({
				'123': {
					value: true,
					result: 'success',
					message: '',
				},
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(questionnaire.updateAnswersService).toHaveBeenCalledWith(
				arg,
			);
		});
	});
});
