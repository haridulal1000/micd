import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import { RootState, AppDispatch } from '../core/redux/store/store';
import { getAllWorkspaces } from '../core/redux/actions/workspaceActions';
import { setActiveWorkspace } from '../core/redux/reducers/workspaceSlice';
import { logout } from '../core/redux/reducers/authSlice';
import { IGetAllWorkspacesResponse } from '../core/interfaces/workspace.interface';
import { getUserProfile } from '../core/redux/actions/userProfileActions';

const DashboardHeader: React.FC<{
	hasSideNav?: boolean;
}> = ({ hasSideNav }) => {
	const { allWorkspaces, workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [showWorkspaceVisible, setWorkspaceVisible] =
		useState<boolean>(false);

	const workspaceOptions = allWorkspaces?.map((workspace: any) => ({
		value: workspace.slug,
		label: workspace.name,
	}));

	useEffect(() => {
		dispatch(getAllWorkspaces());
		if (userProfile?.user_avatar === undefined) {
			dispatch(getUserProfile());
		}
	}, []);

	const toggleDropDownVisible = () => {
		setWorkspaceVisible(!showWorkspaceVisible);
	};

	const handleWorkspace = (workspaceSlug: string) => {
		toggleDropDownVisible();
		const workspaceObj = allWorkspaces?.find(
			(workSpace: IGetAllWorkspacesResponse) =>
				workSpace.slug === workspaceSlug,
		);

		dispatch(setActiveWorkspace(workspaceObj));
		navigate(`/workspace/${workspaceSlug}`);
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="h-16">
			<div
				className={`micd-shadow h-16 bg-white flex items-center px-7 justify-between right-0 fixed top-0 z-50 ${
					hasSideNav ? 'w-[calc(100%-5rem)]' : 'w-full'
				}`}
			>
				<img
					onClick={() => navigate('/dashboard')}
					src="/logo-horizontal.svg"
					alt="micd-logo"
					height="50px"
				/>
				<div className="flex cursor-pointer select-none relative items-center">
					{location.pathname !== '/dashboard' && allWorkspaces && (
						<div
							className="micd-select w-60 hidden md:flex items-center gap-3 justify-between"
							onClick={toggleDropDownVisible}
						>
							<img
								src="/workspace.svg"
								alt="workspace"
								className=""
							/>
							<p className="">
								{workspaceInfo
									? `${workspaceInfo.name.substring(0, 15)}${
											workspaceInfo.name.length > 15
												? '...'
												: ''
									  }`
									: 'Select Workspaces'}
							</p>
							<img
								src="/downArrow.svg"
								alt="select down arrow"
								className="order-3"
							/>
						</div>
					)}

					{showWorkspaceVisible ? (
						<>
							<div
								className="absolute h-[100vh] w-[100vw] top-0 left-0 z-50"
								onClick={toggleDropDownVisible}
							></div>
							<div className="absolute left-0 top-12 float-right mr-20 w-72 bg-white px-4 py-2 rounded-sm z-50">
								<p className="text-sm mb-2">
									Switch Workspaces
								</p>
								{workspaceOptions &&
									workspaceOptions.map(
										(workspace: {
											label: string;
											value: string;
										}) => (
											<div
												key={workspace.value}
												className="py-2 flex flex-row items-center gap-2 cursor-pointer hover:font-semibold"
												onClick={() =>
													handleWorkspace(
														workspace.value,
													)
												}
											>
												<>
													<img
														src="/workspacePlaceholder.svg"
														alt="image placeholder"
														className="h-8 w-8"
													/>
													<p className="text-sm w-2/3 break-all">
														{workspace.label}
													</p>
												</>

												<img
													src="/shareIcon.svg"
													alt="image placeholder"
													className="ml-5"
												/>
											</div>
										),
									)}
							</div>
						</>
					) : (
						''
					)}

					<LogOut onClick={() => handleLogout()} className={'mx-8'} />
					{/* <img */}
					{/*	src="/notification.svg" */}
					{/*	alt="notification" */}
					{/*	className="mx-8" */}
					{/* /> */}

					<div className="rounded-full w-9 m-auto border border-white">
						<img
							src={
								userProfile?.user_avatar
									? userProfile?.user_avatar?.avatar_url
									: '/default-user-pp.png'
							}
							className="object-cover rounded-full aspect-square min-h-[40px] min-w-[40px]"
							alt="profile "
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
