import React, { PropsWithChildren } from 'react';
import CssUtils from '../../core/utilities/css-utils';

type DrawerProps = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
};

const Drawer = (props: PropsWithChildren<DrawerProps>) => (
	<div
		className={CssUtils.cn(
			'overflow-scroll fixed inset-y-0 right-0 w-[420px] bg-white shadow-lg transform transition-transform ease-in-out duration-300',
			props.isOpen ? 'translate-x-0' : 'translate-x-full',
			props.className,
		)}
	>
		<div>{props.children}</div>
	</div>
);

export default Drawer;
