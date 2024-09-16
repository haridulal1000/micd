import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SecondaryBtn from '../../components/shared/form/btn';
import ListWorkspace from '../workspace/list';
import ListSharedCasesWorkspaces from '../workspace/shared';
import {
	getAllWorkspaces,
	getUpcomingAppointmentsFromAllWorkspaces,
} from '../../core/redux/actions/workspaceActions';
import CreateWorkspaceForm from '../workspace/createWorkspaceForm';
import { RootState, AppDispatch } from '../../core/redux/store/store';
import { getUserProfile } from '../../core/redux/actions/userProfileActions';
import { getFullName } from '../../core/utilities/name';
import DetailedUpcomingAppointmentCard from './upcoming-appointment/upcoming-appointment-card';
import UserAvatar from '../../components/UserAvatar';
import CaseService from '../../core/services/case-service';
import { AccessWorkspaceData } from '../../core/interfaces/case.interface';

const Dashboard = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);
	const { loading, allWorkspaces, upcomingAppointments } = useSelector(
		(state: RootState) => state.workspace,
	);
	const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
	const [accessWorkspaceData, setAccessWorkspaceData] = useState<
		AccessWorkspaceData[]
	>([]);

	useEffect(() => {
		dispatch(getAllWorkspaces);
		dispatch(getUserProfile);
		dispatch(getUpcomingAppointmentsFromAllWorkspaces());
	}, []);

	useEffect(() => {
		CaseService.getSharedCases().then((res: AccessWorkspaceData[]) => {
			setAccessWorkspaceData(res);
		});
	}, []);

	const handleToggleWorkspaceModal = () => {
		setShowCreateWorkspace(!showCreateWorkspace);
	};

	return (
		<>
			{showCreateWorkspace && (
				<div
					onClick={handleToggleWorkspaceModal}
					className="fixed bg-black bg-opacity-50 flex items-center justify-center z-10 h-screen w-full"
				>
					<div
						className="max-w-2xl p-2"
						onClick={(e: SyntheticEvent) => {
							e.stopPropagation();
						}}
					>
						<CreateWorkspaceForm
							handleHideCreateWorkspace={
								handleToggleWorkspaceModal
							}
						/>
					</div>
				</div>
			)}
			<div className="p-6 flex gap-5 flex-wrap-reverse lg:flex-nowrap">
				<div className="rounded-lg w-full lg:w-2/3">
					<div className="mt-16 mx-6">
						<div className="flex items-center justify-between ">
							<p className="title">Workspaces</p>
							<SecondaryBtn
								containerClasses="hidden sm:block"
								classes="px-4"
								onClick={handleToggleWorkspaceModal}
								textOnly={true}
							>
								Create new workspace
							</SecondaryBtn>
						</div>
						{loading ? (
							<span>Loading workspaces.....</span>
						) : (
							allWorkspaces && (
								<ListWorkspace
									allWorkspaces={allWorkspaces}
									handleToggleWorkspaceModal={
										handleToggleWorkspaceModal
									}
								/>
							)
						)}

						{!loading && (
							<>
								<div className="mt-6 mb-2 flex items-center justify-between ">
									<p className="title">Shared with me</p>
								</div>
								{allWorkspaces && (
									<ListSharedCasesWorkspaces
										allWorkspaces={allWorkspaces}
										allSharedCases={accessWorkspaceData}
										handleToggleSharedCases={
											handleToggleWorkspaceModal
										}
									/>
								)}
							</>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-5 w-full lg:w-1/3 h-fit">
					<div className="shadow-lg rounded-lg bg-white h-fit flex-1 p-6 text-center relative">
						<UserAvatar />
						{userProfile ? (
							<>
								<h3 className="my-2 break-all">
									{getFullName(
										userProfile.first_name,
										userProfile.last_name,
									)}
								</h3>
								<p className="my-1">{userProfile.email}</p>
								<div className="blue-pill m-auto my-4 capitalize">
									{userProfile.role}
								</div>
							</>
						) : (
							' Loading info....'
						)}

						<div className="w-full flex items-center justify-center">
							<SecondaryBtn
								classes="px-6"
								onClick={() =>
									navigate('/dashboard/update-profile')
								}
							>
								Manage Your Profile
							</SecondaryBtn>
						</div>
					</div>
					<div className="shadow-lg rounded-lg bg-white p-6">
						<DetailedUpcomingAppointmentCard
							appointments={upcomingAppointments ?? []}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
