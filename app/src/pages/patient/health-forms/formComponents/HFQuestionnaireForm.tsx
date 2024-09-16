import React, { useState } from 'react';
import {
	IAnswer,
	IGetQuestionnaireResponse,
	ISection,
} from '../../../../core/interfaces/questionnaire.interface';
import HFQuestionSection from './HFQuestionSection';

const HFQuestionnaireForm = (props: {
	questionnaireInfo: IGetQuestionnaireResponse | null;
}) => (
	<div>
		<p className="text-bold test-title ">
			{props.questionnaireInfo?.title}
		</p>
		<p className="text-sm my-2 text-healthFormText test-description">
			{props.questionnaireInfo?.description}
		</p>

		{props.questionnaireInfo?.sections?.map((section: ISection, i) => (
			<HFQuestionSection section={section} key={section.title} />
		))}
	</div>
);

export default HFQuestionnaireForm;
