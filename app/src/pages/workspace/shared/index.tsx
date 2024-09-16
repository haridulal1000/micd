import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetAllWorkspacesResponse } from '../../../core/interfaces/workspace.interface';
import WorkspaceCard, { CaseCard, WorkspaceEmptyCard } from '../workspaceCard';
import { AccessWorkspaceData } from '../../../core/interfaces/case.interface';
import { AppDispatch } from '../../../core/redux/store/store';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';
import { setActiveWorkspace } from '../../../core/redux/reducers/workspaceSlice';
import SecondaryBtn from '../../../components/shared/form/btn';

interface IListSharedWorkspaceProps {
	allWorkspaces: IGetAllWorkspacesResponse[];
	allSharedCases: AccessWorkspaceData[];
	handleToggleSharedCases?: () => void;
}

const SharedWorkspaceCard = (props: { accessInfo: AccessWorkspaceData }) => {
	// const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [memberDropdownVisibility, setMemberDropdownVisibility] =
		useState<boolean>(false);

	useOutClickHandler(
		() => memberDropdownVisibility && setMemberDropdownVisibility(false),
	);

	// const handleWorkspaceCardClick = async (
	// 	workspace: IGetAllWorkspacesResponse,
	// ) => {
	// 	dispatch(setActiveWorkspace(workspace));
	// 	navigate(`/workspace/${workspace.slug}`);
	// };
	return (
		<div
			key={props.accessInfo?.workspace?.name}
			className="test-workspace-card p-8 w-full bg-white"
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-10">
					<img
						src={'/workspace-img-placeholder.svg'}
						alt="image placeholder"
						className="test-workspace-bg h-14 w-14 object-cover rounded-xl"
					/>
					<h5 className="title-uc text-md break-all">
						{props.accessInfo?.workspace?.name}
					</h5>
				</div>
				<SecondaryBtn
					classes="px-6"
					onClick={() => navigate('/dashboard/shared-cases')}
				>
					View more
				</SecondaryBtn>
			</div>
			{props.accessInfo.cases && props.accessInfo.cases.length > 0 ? (
				<div className="flex max-w-full overflow-x-auto">
					{props.accessInfo.cases.map((caseItem, caseIndex) => (
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

const ListSharedCasesWorkspaces = (props: IListSharedWorkspaceProps) => {
	const [sharedTab, setSharedTab] = useState<string>('workspace');

	return (
		<>
			<div className="flex bg-white micd-shadow ">
				<div className="uppercase w-1/2 text-center p-4 flex items-center justify-center">
					<div className="content w-full text-grayedLabel">
						<span>Workspaces</span>
					</div>
				</div>
				<div className="uppercase w-1/2 text-center p-4 gradient-border-bottom flex items-center justify-center">
					<div className="content w-full">
						<span>Cases</span>
					</div>
				</div>
			</div>
			{props.allSharedCases.length > 0 ? (
				<div className="flex flex-wrap gap-5 pt-2">
					{props.allSharedCases.map((workspace, index) => (
						<SharedWorkspaceCard
							accessInfo={workspace}
							key={index}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-items-center gap-4 mt-2 py-8 bg-white">
					<img src="/workspaceDefaultImage.svg" />
					<p className="font-semibold mt-4">
						Cases are not shared yet!
					</p>
				</div>
			)}
		</>
	);
};

export default ListSharedCasesWorkspaces;
