import React from 'react';

const getInitialFromName = (name: string) => {
	const splitName = name.split(' ');
	if (splitName.length === 1) {
		return splitName[0].charAt(0).toUpperCase();
	}
	return (
		splitName[0].charAt(0).toUpperCase() +
		splitName[splitName.length - 1].charAt(0).toUpperCase()
	);
};

const ImageCommentPointerAvatar: React.FC<{
	avatar?: string | null;
	username?: string;
}> = ({ avatar, username }) => (
	<div className="w-11 h-11 bg-blue-500 rounded-tl-full  rounded-bl-full rounded-tr-full flex items-center justify-center cursor-pointer">
		{avatar && (
			<img
				src={avatar}
				className={'h-10 w-10 rounded-full object-cover'}
				alt={'icon1'}
			/>
		)}

		{!avatar && username && (
			<div className={'text-white text-xs'}>
				{getInitialFromName(username)}
			</div>
		)}
	</div>
);

export default ImageCommentPointerAvatar;
