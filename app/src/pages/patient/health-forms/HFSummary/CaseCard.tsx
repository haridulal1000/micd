import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { preventDefault } from '@fullcalendar/core/internal';
import { CaseCardProps } from '../../../../core/interfaces/case.interface';
import { getProperDate } from '../../../../core/utilities/dateTime';
import { RootState } from '../../../../core/redux/store/store';

const CaseCard = (props: CaseCardProps) => {
	const [displayAllProblems, setDisplayAllProblems] = useState(false);

	const {
		caseDetails,
		handleOpenAddAppointmentDrawer,
		setShareCaseModalfor,
	} = props;

	const navigate = useNavigate();

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	return (
		<div
			className="sm:px-4 md:px-8 md:pt-5 md:pb-7 md:my-6 lg:px-8 lg:py-6 rounded-lg bg-white cursor-pointer max-w-full"
			onClick={() =>
				navigate(
					`/workspace/${workspaceInfo?.slug}/patients/case-libray/${caseDetails.id}`,
				)
			}
		>
			<div className="flex w-full sm:flex-col lg:flex-col xl:flex-row sm:gap-2 lg:gap-0 xl:items-center items-center justify-end mb-8">
				<div className="flex sm:flex-col lg:flex-row items-center gap-6">
					<div
						className="flex gap-2 test-create-appointment-btn hover:cursor-pointer"
						onClick={(e: SyntheticEvent) =>
							handleOpenAddAppointmentDrawer(
								e,
								caseDetails.id.toString(),
							)
						}
					>
						<img src="/plusIcon.svg" alt="plus icon" />
						<p className="text-primary font-medium ">
							Create Appointment
						</p>
					</div>
					<div
						className="flex gap-2 test-share-btn hover:cursor-pointer"
						onClick={() => setShareCaseModalfor(caseDetails.id)}
					>
						<img src="/shareIcon.svg" alt="sahre icon" />
						<p className="text-primary font-medium">Share Case</p>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between flex-wrap">
				<div className="mb-4">
					<div className="text-grayedLabel mb-2">Case ID</div>
					<div className="min-h-[30px]">
						{caseDetails?.workspace_case_id || 'N/A'}
					</div>
				</div>

				<div className="mb-4">
					<div className="text-grayedLabel mb-2">Start Date</div>
					<div className="min-h-[30px]">
						{caseDetails?.start_date &&
						Number(caseDetails?.start_date) !== 0
							? getProperDate(
									parseInt(caseDetails.start_date, 10),
							  )
							: '-'}
					</div>
				</div>

				<div className="mb-4">
					<div className="text-grayedLabel mb-2">End Date</div>
					<div className="min-h-[30px]">
						{caseDetails?.end_date &&
						Number(caseDetails?.end_date) !== 0
							? getProperDate(parseInt(caseDetails.end_date, 10))
							: '-'}
					</div>
				</div>

				<div className="mb-4">
					<div className="text-grayedLabel mb-2">
						Problem Category
					</div>
					<div className="min-h-[30px]">
						{caseDetails.problem_category || 'N/A'}
					</div>
				</div>

				<div className="mb-4">
					<div className="text-grayedLabel mb-2">Patient Concern</div>
					<div className="min-h-[30px]">
						{caseDetails.patient_concern || 'N/A'}
					</div>
				</div>

				<div className="mb-4">
					<div className="text-grayedLabel mb-2">Problems</div>
					<div className="min-h-[30px] relative">
						{caseDetails.problems?.length > 0 && (
							<div className="w-full flex max-h-[200px] overflow-scroll">
								<div
									className={`bg-accent bg-opacity-30 rounded-3xl py-1 px-3 text-sm font-bold text-accent mr-1 mb-2 ${
										caseDetails.problems[0]?.length < 100
											? 'w-fit'
											: 'min-w-[425px]'
									} h-fit max-w-[500px]`}
								>
									{caseDetails.problems[0]}
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
										+{caseDetails.problems.length - 1}
									</span>
									{displayAllProblems && (
										<div
											className={`bg-white micd-shadow p-4 absolute left-0 flex flex-wrap mt-4 ${
												caseDetails.problems?.length > 2
													? 'min-w-[455px]'
													: ''
											}`}
										>
											{caseDetails.problems
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

				{/* <div> */}
				{/*	<div className="text-grayedLabel">Status</div> */}
				{/*	<div>MW-P1-C1</div> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default CaseCard;
