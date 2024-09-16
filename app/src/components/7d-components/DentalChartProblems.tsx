import React from 'react';
import DentalChartProblem from './DentalChartProblem';
import { ICaseProblemSummary } from '../../core/interfaces/case.interface';

const DentalChartProblems: React.FC<{
	examination: ICaseProblemSummary['examinations']['0'];
}> = ({ examination }) => {
	const [selectedDentalChartProblem, setSelectedDentalChartProblem] =
		React.useState<string>(
			examination.dental_chart_problems[0]?.problem_name || '',
		);
	const [selectedGeneralChartProblem, setSelectedGeneralChartProblem] =
		React.useState<string>(
			examination.general_chart_problems[0]?.problem_name || '',
		);
	const [selectedPerioChartProblem, setSelectedPerioChartProblem] =
		React.useState<string>(
			examination.perio_chart_problems[0]?.problem_name || '',
		);

	return (
		<div className={'my-4'}>
			{examination.general_chart_problems.length > 0 && (
				<React.Fragment>
					<div>General Chart</div>
					<div>
						{examination.general_chart_problems.map((problem) => (
							<DentalChartProblem
								problem={problem}
								setIsActiveProblem={
									setSelectedGeneralChartProblem
								}
								isActive={
									selectedGeneralChartProblem ===
									problem.problem_name
								}
							/>
						))}
					</div>
					<div className={'flex flex-row gap-4 mt-4'}>
						{examination.general_chart_problems
							.find(
								(p) =>
									p.problem_name ===
									selectedGeneralChartProblem,
							)
							?.details?.map((detail) => (
								<div>
									<div
										className={
											'flex flex-col justify-center'
										}
									>
										<div>{detail.field}:</div>
										<div className={'text-center'}>
											{detail.value}
										</div>
									</div>
								</div>
							))}
					</div>
				</React.Fragment>
			)}

			{examination.dental_chart_problems.length > 0 && (
				<React.Fragment>
					<div className={'mb-4'}>Dental Chart</div>
					<div className={'flex gap-4'}>
						{examination.dental_chart_problems.map((problem) => (
							<DentalChartProblem
								problem={problem}
								setIsActiveProblem={
									setSelectedDentalChartProblem
								}
								isActive={
									selectedDentalChartProblem ===
									problem.problem_name
								}
							/>
						))}
					</div>
					<div className={'flex flex-row gap-4 mt-4'}>
						{examination.dental_chart_problems
							.find(
								(p) =>
									p.problem_name ===
									selectedDentalChartProblem,
							)
							?.details?.map((detail) => (
								<div>
									<div
										className={
											'flex flex-col justify-center'
										}
									>
										<div>{detail.field}:</div>
										<div className={'text-center'}>
											{detail.value}
										</div>
									</div>
								</div>
							))}
					</div>
				</React.Fragment>
			)}

			{examination.perio_chart_problems.length > 0 && (
				<React.Fragment>
					<div className={'mb-1'}>Perio Chart</div>
					<div>
						{examination.perio_chart_problems.map((problem) => (
							<DentalChartProblem
								problem={problem}
								setIsActiveProblem={
									setSelectedPerioChartProblem
								}
								isActive={
									selectedPerioChartProblem ===
									problem.problem_name
								}
							/>
						))}
					</div>
					<div className={'flex flex-row gap-4 mt-4'}>
						{examination.perio_chart_problems
							.find(
								(p) =>
									p.problem_name ===
									selectedPerioChartProblem,
							)
							?.details?.map((detail) => (
								<div>
									<div
										className={
											'flex flex-col justify-center'
										}
									>
										<div>{detail.field}:</div>
										<div className={'text-center'}>
											{detail.value}
										</div>
									</div>
								</div>
							))}
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default DentalChartProblems;
