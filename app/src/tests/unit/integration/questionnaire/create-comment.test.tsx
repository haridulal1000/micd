import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import {
	ICreateCommentDets,
	ICreateCommentResponse,
} from '../../../../core/interfaces/questionnaire.interface';
import { createComment } from '../../../../core/redux/actions/questionnaireActions';
import QuestionnaireService from '../../../../core/services/questionnaire.service';

describe('Create Question comment', () => {
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
			ICreateCommentResponse,
			ICreateCommentDets,
			{}
		>;

		let dispatch: Dispatch;
		let getState: () => unknown;

		let arg: ICreateCommentDets;
		let result: {};

		beforeEach(() => {
			dispatch = jest.fn() as Dispatch;
			getState = jest.fn();

			jest.spyOn(QuestionnaireService, 'createCommentService');
			questionnaire.createCommentService.mockClear();
			questionnaire.createCommentService.mockResolvedValue({
				id: 123,
				comment: 'Hello world',
				updated_at: '5874235384',
				question_id: 2,
			});
			arg = {
				workspace: '439643764',
				patient_id: 23,
				question_id: 2,
				comment: 'Hello world',
			};

			result = {};

			action = createComment(arg);
		});

		it('returned data is correctly mocked', async () => {
			await expect(
				questionnaire.createCommentService(arg),
			).resolves.toStrictEqual({
				id: 123,
				comment: 'Hello world',
				updated_at: '5874235384',
				question_id: 2,
			});
		});

		it('calls the api correctly', async () => {
			await action(dispatch, getState, result);
			expect(questionnaire.createCommentService).toHaveBeenCalledWith(
				arg,
			);
		});
	});
});
