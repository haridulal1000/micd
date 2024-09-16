import React from 'react';
import { Outlet } from 'react-router-dom';
import { color } from 'chart.js/helpers';
import DashboardHeader from '../../components/dashboard-header';

const DashboardLayout = () => (
	<div className="relative z-0">
		<div
			className="bg-gray min-h-screen"
			style={{ backgroundColor: '#F6FAFE' }}
		>
			<DashboardHeader hasSideNav={false} />
			<Outlet />
		</div>
	</div>
);

export default DashboardLayout;
