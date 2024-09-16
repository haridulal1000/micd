import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardHeader from '../../components/dashboard-header';
import SideNav from '../../components/side-nav';
import { RootState } from '../../core/redux/store/store';

const WorkspaceLayout = () => {
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	return (
		<div>
			<div className="absolute">
				<SideNav selectedWorkspace={workspaceInfo} />
			</div>
			<div className="ml-10  md:ml-24 h-screen overflow-auto bg-gray">
				<DashboardHeader hasSideNav={true} />
				<div className="pt-12">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default WorkspaceLayout;
