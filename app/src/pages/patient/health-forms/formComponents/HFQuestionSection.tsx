import React from 'react';
import {
	IAnswer,
	IQuestion,
	ISection,
} from '../../../../core/interfaces/questionnaire.interface';
import HFQuestion from './HFQuestion';

const HFQuestionSection = (props: { section: ISection }) => (
	<div>
		<h4 className=" text-bold mt-10 test-section-title">
			{props.section?.title}
		</h4>
		<p className="text-sm my-2 text-healthFormText test-section-description">
			{props.section?.description}
		</p>
		{props.section?.questions?.map((question: IQuestion) => (
			<HFQuestion question={question} key={question.question_id} />
		))}
	</div>
);

export default HFQuestionSection;
