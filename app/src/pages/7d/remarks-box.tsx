import React from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { InlineInput } from '../../components/shared/form/input';
import { INotes } from '../../core/interfaces/case.interface';
import CommentCard from '../../components/shared/comments/CommentCard';
import Avatar from '../../components/ui/avatar';
import { RootState } from '../../core/redux/store/store';

interface IRemarksProps {
	remarks: INotes[];
	title: string;
	handleSave: (comment: string) => void;
	handleDelete?: (commentId: number) => void;
	deleteButton?: boolean;
}

const RemarksBox = (props: IRemarksProps) => {
	const location = useLocation();
	const currentPath = location.pathname.split('/')[1]; // specifically remarks box style for health-form page
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);
	return (
		<div
			className={`${
				currentPath === 'workspace'
					? 'shadow-md rounded-md w-full mr-10 bg-white p-5 max-h-[75vh]  overflow-x-hidden '
					: 'mt-4 w-full  bg-white mr-4 p-6 rounded-lg max-h-[75vh]  overflow-x-hidden shadow-xl'
			} `}
		>
			<h5 className={'text-base font-semibold mb-1'}>{props.title}</h5>
			<div className="w-full">
				<InlineInput
					userAvatar={userProfile?.user_avatar?.avatar_url}
					saveInputCallback={(value) => props.handleSave(value)}
				/>
			</div>
			{props.remarks.map((remark) => (
				<CommentCard
					id={remark.id}
					key={remark.id}
					comment={remark.text}
					date={remark.updated_at}
					deleteButton={props.deleteButton}
					onDelete={() => {
						if (props.handleDelete) {
							props.handleDelete(remark.id);
						}
					}}
				/>
			))}
		</div>
	);
};

export default RemarksBox;
