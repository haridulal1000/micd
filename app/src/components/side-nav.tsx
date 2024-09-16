import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IGetAllWorkspacesResponse } from '../core/interfaces/workspace.interface';

interface INavItem {
	src: string;
	pathName: string;
	alt: string;
}

type SideNavProps = {
	selectedWorkspace: IGetAllWorkspacesResponse | null;
};

const NavItem = (props: { item: INavItem; compareTo: string }) => (
	<Link to={props.item.pathName}>
		<div
			className={`p-3 ${
				(props.item.pathName?.split('/').length > 3 &&
					props.compareTo.includes(props.item.pathName)) ||
				(props.item.pathName?.split('/').length <= 3 &&
					props.item.pathName === props.compareTo)
					? 'bg-white bg-opacity-40 rounded'
					: ''
			}`}
		>
			<img src={props.item.src} alt={props.item.alt} />
		</div>
	</Link>
);

const SideNav = (props: SideNavProps) => {
	const navItems: INavItem[] = [
		{
			src: '/dashboard.svg',
			pathName: `/workspace/${props.selectedWorkspace?.slug}`,
			alt: 'dashboard icon',
		},
		{
			src: '/appointment.svg',
			pathName: `/workspace/${props.selectedWorkspace?.slug}/appointments`,
			alt: 'appointment icon',
		},
		{
			src: '/profile.svg',
			pathName: `/workspace/${props.selectedWorkspace?.slug}/patients`,
			alt: 'profile icon',
		},
		{
			src: '/doctor-check.svg',
			pathName: `/workspace/${props.selectedWorkspace?.slug}/doctor-check`,
			alt: 'Doctor check icon',
		},
		{
			src: '/settings.svg',
			pathName: `/workspace/${props.selectedWorkspace?.slug}/settings`,
			alt: 'settings icon',
		},
	];

	const { pathname } = useLocation();

	return (
		<div className="sm:w-20 min-h-screen bg-primary fixed flex justify-center items-center">
			<div className="flex flex-col items-center gap-10">
				{navItems.map((item, index) => (
					<NavItem item={item} key={index} compareTo={pathname} />
				))}
			</div>
		</div>
	);
};

export default SideNav;
