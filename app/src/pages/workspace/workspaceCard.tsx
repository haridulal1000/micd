import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	IGetAllWorkspacesResponse,
	TWorkspaceCaseDetails,
} from '../../core/interfaces/workspace.interface';
import { AppDispatch } from '../../core/redux/store/store';
import { setActiveWorkspace } from '../../core/redux/reducers/workspaceSlice';
import useOutClickHandler from '../../core/utilities/hooks/useOutClickHandler';
import { PrimaryBtn } from '../../components/shared/form/btn';

export const CaseCard = (props: { caseDetails: TWorkspaceCaseDetails }) => {
	const { caseDetails } = props;
	return (
		<div className="rounded-xl bg-midnightBlue w-[226px]">
			<p className="px-4 pt-3 pb-2 text-bold">{caseDetails?.id}</p>
			<div className="rounded-b-xl bg-white border border-midnightBlue p-4">
				<div className="flex gap-2">
					<div>
						<img src="/gradient-calendar.svg" alt="calendar" />
					</div>
					<p className="text-grayedLabel">Start Date</p>
				</div>
				<p className="py-4">
					{caseDetails.start_date !== '0'
						? new Date(
								Number(caseDetails.start_date),
						  ).toLocaleDateString('en-GB', {
								day: '2-digit',
								month: 'long',
								year: 'numeric',
						  })
						: 'No start date available'}
				</p>
				<div className="flex gap-1">
					<div className=" rounded-full h-7 w-7">
						<img
							className="rounded-full"
							src={
								caseDetails.patient?.avatar_url
									? caseDetails.patient?.avatar_url
									: '/default-user-pp.png'
							}
							alt="profile"
						/>
					</div>
					<p className="flex items-center">
						{caseDetails.patient?.first_name}{' '}
						{caseDetails.patient?.last_name}
					</p>
				</div>
				<hr className="mt-4" />
				{caseDetails.problems?.length > 0 && (
					<div className="flex pt-4 pb-2 max-w-full overflow-x-auto overflow-y-hidden">
						{caseDetails.problems?.map((problem, index) => (
							<div
								key={index}
								className="bg-accent bg-opacity-30 rounded-3xl py-1 px-3 text-sm font-bold text-accent mr-1 mb-1 w-fit min-w-max"
							>
								{problem}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const WorkspaceCard = (props: { workspace: IGetAllWorkspacesResponse }) => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [memberDropdownVisibility, setMemberDropdownVisibility] =
		useState<boolean>(false);

	useOutClickHandler(
		() => memberDropdownVisibility && setMemberDropdownVisibility(false),
	);

	const handleWorkspaceCardClick = async (
		workspace: IGetAllWorkspacesResponse,
	) => {
		dispatch(setActiveWorkspace(workspace));
		navigate(`/workspace/${workspace.slug}`);
	};
	return (
		<div
			key={props.workspace.slug}
			className="test-workspace-card p-8 w-full bg-white"
		>
			<div
				onClick={() => handleWorkspaceCardClick(props.workspace)}
				className="cursor-pointer flex items-center justify-between mb-4"
			>
				<div className="flex items-center gap-10">
					<img
						src={
							props.workspace.image_url ||
							'/workspace-img-placeholder.svg'
						}
						alt="image placeholder"
						className="test-workspace-bg h-14 w-14 object-cover rounded-xl"
					/>
					<h5 className="title-uc text-md break-all">
						{props.workspace.name}
					</h5>
				</div>
			</div>
			{props.workspace.cases && props.workspace.cases.length > 0 ? (
				<div className="flex max-w-full overflow-x-auto">
					{props.workspace.cases.map((caseItem, caseIndex) => (
						<div className="mr-2">
							<CaseCard key={caseIndex} caseDetails={caseItem} />
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col mt-8 items-center justify-items-center gap-4">
					<img src="/workspaceDefaultImage.svg" />
					<p className="font-semibold">No cases available.</p>
				</div>
			)}
		</div>
	);
};

export const WorkspaceEmptyCard = (props: {
	handleToggleWorkspaceModal?: () => void;
}) => (
	<div className="flex flex-col justify-center items-center p-12 gap-6 bg-white">
		<div>
			<img src="/empty-workspace.png" alt="no workspace" />
		</div>
		<p>Create workspaces to stay better organized and focused.</p>
		<PrimaryBtn
			type={'button'}
			classes="px-10 py-2"
			onClick={props.handleToggleWorkspaceModal}
		>
			Create Workspace
		</PrimaryBtn>
	</div>
);
export default WorkspaceCard;
