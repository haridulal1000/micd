import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AccessCase } from '../../../../core/interfaces/case.interface';
import { RootState } from '../../../../core/redux/store/store';
import { getProperDate } from '../../../../core/utilities/dateTime';

interface SharedCaseProps {
	case: AccessCase;
}
const SharedCaseCard = (props: SharedCaseProps) => {
	const [displayAllProblems, setDisplayAllProblems] = useState(false);

	const navigate = useNavigate();

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	return (
		<div
			className="sm:px-4 md:px-8 md:pt-5 md:pb-7 md:my-6 lg:px-8 lg:py-6 rounded-lg bg-white cursor-pointer max-w-full"
			onClick={() =>
				navigate(
					`/workspace/${workspaceInfo?.slug}/patients/case-libray/${props.case.id}`,
				)
			}
		>
			<div className="flex items-center justify-between flex-wrap">
				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">Case ID</div>
					<div className="min-h-[30px]">
						{props.case?.workspace_case_id || 'N/A'}
					</div>
				</div>

				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">Shared at</div>
					<div className="min-h-[30px]">
						{props.case?.start_date &&
						Number(props.case?.start_date) !== 0
							? getProperDate(parseInt(props.case.start_date, 10))
							: '-'}
					</div>
				</div>

				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">Patient</div>
					<div className="min-h-[30px]">
						{props.case?.patient && props.case?.patient.first_name}{' '}
						{props.case?.patient && props.case?.patient.last_name}
					</div>
				</div>

				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">Start Date</div>
					<div className="min-h-[30px]">
						{props.case?.start_date &&
						Number(props.case?.start_date) !== 0
							? getProperDate(parseInt(props.case.start_date, 10))
							: '-'}
					</div>
				</div>

				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">End Date</div>
					<div className="min-h-[30px]">-</div>
				</div>

				<div className="mb-4 w-[20%]">
					<div className="text-grayedLabel mb-2">
						Problem Category
					</div>
					<div className="min-h-[30px]">-</div>
				</div>

				<div className="mb-4 w-[10%]">
					<div className="text-grayedLabel mb-2">Patient Concern</div>
					<div className="min-h-[30px]">-</div>
				</div>

				<div className="mb-4 pl-8 w-[20%]">
					<div className="text-grayedLabel mb-2">Problems</div>
					<div className="min-h-[30px] relative">
						{props.case.problems?.length > 0 && (
							<div className="w-full flex max-h-[200px] overflow-scroll">
								<div
									className={`bg-accent bg-opacity-30 rounded-3xl py-1 px-3 text-sm font-bold text-accent mr-1 mb-2 ${
										props.case.problems[0]?.length < 100
											? 'w-fit'
											: 'min-w-[425px]'
									} h-fit max-w-[500px]`}
								>
									{props.case.problems[0]}
								</div>
								<div
									className={`cursor-pointer bg-accent bg-opacity-30 rounded-3xl py-1 px-2 text-sm font-bold text-accent
											w-fit h-fit`}
									onClick={(event) => {
										event.stopPropagation();
										setDisplayAllProblems(
											!displayAllProblems,
										);
									}}
								>
									<span>
										+{props.case.problems.length - 1}
									</span>
									{displayAllProblems && (
										<div
											className={`bg-white micd-shadow p-4 absolute left-0 flex flex-wrap mt-4 ${
												props.case.problems?.length > 2
													? 'min-w-[455px]'
													: ''
											}`}
										>
											{props.case.problems
												?.slice(1)
												.map(
													(problem, problemIndex) => (
														<span
															className={`bg-accent bg-opacity-30 rounded-3xl py-1 px-3 text-sm font-bold text-accent mr-1 mb-2 ${
																problem?.length <
																100
																	? 'w-fit'
																	: 'min-w-[425px]'
															} h-fit max-w-[500px]`}
															key={problemIndex}
														>
															{problem}
														</span>
													),
												)}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SharedCaseCard;
