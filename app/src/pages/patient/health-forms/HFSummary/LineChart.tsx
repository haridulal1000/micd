import React, { useState } from 'react';
import useOutClickHandler from '../../../../core/utilities/hooks/useOutClickHandler';
import { IQuestionnaireSummary } from '../../../../core/interfaces/patient.interface';

const YesAnswerDetailCard = (props: { yesAnswerDetails: Array<string> }) => (
	<div className="test-yes-detail-card absolute ml-4 py-7 pl-7 pr-16 flex flex-col gap-4 text-sm bg-white micd-shadow rounded-lg ">
		<div className="flex gap-2 items-center ">
			<div className="h-3 w-3 rounded-full bg-success"></div>
			<span className=" font-semibold">Healthy Reply</span>
		</div>
		{props.yesAnswerDetails.map((detail: string) => (
			<span>{detail}</span>
		))}
	</div>
);

const NoAnswerDetailCard = (props: { noAnswerDetails: Array<string> }) => (
	<div className="test-no-detail-card absolute  py-7 pl-7 pr-16 flex flex-col gap-4 text-sm bg-white micd-shadow rounded-lg">
		<div className="flex gap-2 items-center ">
			<div className="h-3 w-3 rounded-full bg-warning"></div>
			<span className=" font-semibold">Problem Reply</span>
		</div>
		{props.noAnswerDetails.map((detail: string) => (
			<span>{detail}</span>
		))}
	</div>
);

const UnAnsweredDetailCard = (props: { unAnsweredDetails: Array<string> }) => (
	<div className="test-unanswered-detail-card absolute ml-4 py-7 pl-7 pr-16 flex flex-col gap-4 text-sm bg-white micd-shadow rounded-lg">
		<div className="flex gap-2 items-center ">
			<div className="h-3 w-3 rounded-full bg-primaryPastelDream"></div>
			<span className=" font-semibold">Unanswered queries</span>
		</div>
		{props.unAnsweredDetails.map((detail: string) => (
			<span>{detail}</span>
		))}
	</div>
);

const LineChart = (props: { summary: IQuestionnaireSummary }) => {
	const totalQuestions =
		props.summary.no_count +
		props.summary.yes_count +
		props.summary.unanswered_count;

	const [yesCardVisibility, setYesCardVisibility] = useState(false);
	const [noCardVisibility, setNoCardVisibility] = useState(false);
	const [unAnsweredCardVisibility, setUnAnsweredCardVisibility] =
		useState(false);

	const handleYesChartClick = () => {
		setYesCardVisibility(!yesCardVisibility);
		setNoCardVisibility(false);
		setUnAnsweredCardVisibility(false);
	};
	const handleNoChartClick = () => {
		setNoCardVisibility(!noCardVisibility);
		setYesCardVisibility(false);
		setUnAnsweredCardVisibility(false);
	};
	const handleUnansweredChartClick = () => {
		setUnAnsweredCardVisibility(!unAnsweredCardVisibility);
		setYesCardVisibility(false);
		setNoCardVisibility(false);
	};

	const ref = useOutClickHandler(() => {
		setYesCardVisibility(false);
		setNoCardVisibility(false);
		setUnAnsweredCardVisibility(false);
	});

	return (
		<div className="my-2 py-2 border-b-2 border-night">
			<div className="flex justify-between">
				<p className="text-xs capitalize">
					{props.summary.title} ({totalQuestions})
				</p>
				<p className="text-xs">
					{props.summary.yes_count}-{props.summary.no_count}-
					{totalQuestions}
				</p>
			</div>

			<div
				className={
					'my-2 w-full h-2 flex bg-primaryPastelDream  rounded-lg overflow-hidden cursor-pointer'
				}
			>
				<div
					ref={ref}
					onClick={handleYesChartClick}
					className={`test-yes-line h-full bg-success ${
						props.summary.no_count === 0 ? 'rounded-full' : ''
					}`}
					style={{
						width: `${
							(props.summary.yes_count / totalQuestions) * 100
						}%`,
						display:
							props.summary.yes_count === 0 ? 'none' : 'block',
					}}
				>
					{yesCardVisibility ? (
						<YesAnswerDetailCard
							yesAnswerDetails={props.summary.yes_questions}
						/>
					) : (
						''
					)}
				</div>

				<div
					onClick={handleNoChartClick}
					className="test-no-line first-letter:h-full bg-warning rounded-md"
					style={{
						width: `calc(${
							(props.summary.no_count / totalQuestions) * 100
						}% + 5px)`,
						display:
							props.summary.no_count === 0 ? 'none' : 'block',
						marginLeft: -5,
					}}
				>
					{noCardVisibility ? (
						<NoAnswerDetailCard
							noAnswerDetails={props.summary.no_questions}
						/>
					) : (
						''
					)}
				</div>

				<div
					onClick={handleUnansweredChartClick}
					className="test-unanswered-line first-letter:h-full bg-primaryPastelDream  "
					style={{
						width: `calc(${
							((totalQuestions -
								(props.summary.yes_count +
									props.summary.no_count)) /
								totalQuestions) *
							100
						}% )`,
					}}
				>
					{unAnsweredCardVisibility ? (
						<UnAnsweredDetailCard
							unAnsweredDetails={
								props.summary.unanswered_questions
							}
						/>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default LineChart;
