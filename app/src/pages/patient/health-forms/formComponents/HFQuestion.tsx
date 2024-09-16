import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IQuestion } from '../../../../core/interfaces/questionnaire.interface';
import RemarksBox from '../../../7d/remarks-box';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { createComment } from '../../../../core/redux/actions/questionnaireActions';
import { getFullDateFromTimestamp } from '../../../../core/utilities/dateTime';
import { showCommentBox } from '../../../../core/redux/reducers/questionnaireSlice';
import YesNoSwitch from './YesNoSwitch';
import { INotes } from '../../../../core/interfaces/case.interface';

const HFQuestion = (props: { question: IQuestion }) => {
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const { commentBoxVisibility } = useSelector(
		(state: RootState) => state.questionnaire,
	);

	const dispatch = useDispatch<AppDispatch>();

	const handleCreateComment = (comment: string) => {
		if (selectedPatient) {
			dispatch(
				createComment({
					patient_id: selectedPatient.id,
					question_id: props.question.question_id,
					comment,
					workspace: workspaceInfo?.slug ?? '',
				}),
			);
		}
	};
	const showCommentRef = useRef<HTMLDivElement>(null);
	const handleSave = (value: string) => {
		handleCreateComment(value);
	};

	return (
		<div
			key={props.question.question_id}
			className=" cursor-pointer select-none relative py-3 border-b border-lineColor grid grid-cols-2 items-center justify-center"
		>
			<p className=" text-sm test-question">{props.question.text}</p>
			<div className=" test-answer px-2 justify-self-end  flex flex-row items-center gap-5  py-1 text-sm text-healthFormText bg-milkyGray rounded-full">
				<YesNoSwitch questionId={props.question} />
				<div
					onClick={(e: SyntheticEvent) =>
						dispatch(showCommentBox(props.question.question_id))
					}
				>
					<p
						className={`flex flex-row items-center gap-1 test-comment ${
							commentBoxVisibility === props.question.question_id
								? 'px-5 py-1 bg-primary text-white rounded-full'
								: 'px-5 py-1'
						}`}
					>
						<img
							src={
								commentBoxVisibility ===
								props.question.question_id
									? '/commentActiveIcon.svg'
									: '/commentIcon.svg'
							}
						/>
						Comment ({props.question.comments.length})
					</p>
				</div>
				{commentBoxVisibility === props.question.question_id ? (
					<>
						<div
							className="fixed w-[100vw] h-[100vh] top-0 left-0 z-[500]"
							onClick={() => {
								dispatch(showCommentBox(null));
							}}
						></div>
						<div
							ref={showCommentRef}
							className="absolute w-fit right-1 top-11  z-[1000]"
						>
							<RemarksBox
								remarks={props.question.comments
									.slice(0)
									.reverse()
									.map(
										(comment) =>
											({
												text: comment.comment,
												updated_at:
													getFullDateFromTimestamp(
														Number(
															comment.updated_at,
														),
													),
											} as unknown as INotes),
									)}
								title={'Add a comment'}
								handleSave={(value: string) =>
									handleSave(value)
								}
							/>
						</div>
					</>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default HFQuestion;
