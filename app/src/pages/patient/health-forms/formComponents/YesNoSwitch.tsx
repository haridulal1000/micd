import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { IQuestion } from '../../../../core/interfaces/questionnaire.interface';
import { updateAnswers } from '../../../../core/redux/actions/questionnaireActions';
import { notifyError } from '../../../../components/shared/form/toast';

const YesNoSwitch = (props: { questionId: IQuestion }) => {
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const dispatch = useDispatch<AppDispatch>();

	const [answer, setAnswer] = useState<boolean | null>(
		props.questionId.answer.value,
	);

	const [answerError, setAnswerError] = useState<boolean>(false);

	const saveAnswer = async (value: boolean) => {
		setAnswer(value);
		setAnswerError(false);
		if (selectedPatient && workspaceInfo) {
			const res = await dispatch(
				updateAnswers({
					patient_id: selectedPatient.id,
					workspace: workspaceInfo.slug,
					answers: [
						{
							id: props.questionId.answer.id,
							value,
							question_id: props.questionId.question_id,
						},
					],
				}),
			);

			if (!res.type.includes('rejected')) {
				const payload = res.payload as any;
				const answerObj = payload[Object.keys(payload)[0]];
				if (answerObj.result === 'error') {
					notifyError(answerObj.message);
					setAnswerError(true);
				}
			}
		}
	};

	return (
		<>
			<div
				className={
					answer
						? `px-4 py-1 ${
								answerError ? 'bg-warning' : 'bg-accent'
						  } text-white rounded-full`
						: 'px-4 py-1'
				}
				onClick={() => saveAnswer(true)}
			>
				Yes
			</div>
			<div
				className={
					!(answer === null || answer)
						? `px-4 py-1  ${
								answerError ? 'bg-warning' : 'bg-primary'
						  } text-white rounded-full`
						: 'px-4 py-1'
				}
				onClick={() => saveAnswer(false)}
			>
				No
			</div>
		</>
	);
};

export default YesNoSwitch;
