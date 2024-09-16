import React from 'react';
import CssUtils from '../../core/utilities/css-utils';

const Avatar: React.FC<{
	fullName?: string;
	image?: string;
	containerClassName?: string;
	className?: string;
}> = (props) => {
	const getInitial = () => {
		if (!props.fullName) return '';
		const name = props.fullName.split(' ');
		if (name.length === 1) return name[0].charAt(0);
		return name[0].charAt(0) + name[1].charAt(0);
	};

	const initial = getInitial();

	return (
		<div
			className={CssUtils.cn(
				'h-14 w-14 flex items-center justify-center rounded-full border border-blue-600 border-solid',
				props.containerClassName,
			)}
		>
			<div
				className={CssUtils.cn(
					'w-12 h-12 rounded-full flex items-center justify-center text-zinc-800',
					props.fullName ? 'border border-white bg-[#DCE2F6] ' : '',
					props.className,
				)}
			>
				{props.image && (
					<img
						src={props.image}
						className={'w-full h-full rounded-full object-cover'}
						alt={'icon1'}
					/>
				)}

				{!props.image && props.fullName && (
					<div className={'text-xs'}>{initial}</div>
				)}
			</div>
		</div>
	);
};

export default Avatar;
