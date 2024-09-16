import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/redux/store/store';
import Avatar from '../../ui/avatar';
import {
	getShortDate,
	getTimeForRecentPatients,
} from '../../../core/utilities/dateTime';

const CommentCard: React.FC<{
	id?: number;
	comment: string;
	date?: string;
	deleteButton?: boolean;
	onDelete?: (commentId: number | undefined) => void;
}> = ({ id, date, comment, deleteButton, onDelete }) => {
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);

	return (
		<div className="bg-saphireLight rounded-lg p-4 mt-4 min-w-[270px] w-full">
			{date && (
				<p className="text-grayedLabel text-sm mb-4">
					<span className="mr-2">
						{getShortDate(Number(date))?.replaceAll('-', '/')}
					</span>
					<span>{getTimeForRecentPatients(Number(date))}</span>
				</p>
			)}
			<div className=" flex justify-between ">
				<div className="flex justify-start items-start">
					{userProfile && (
						<Avatar
							fullName={`${userProfile?.first_name} ${userProfile?.last_name}`}
							image={
								userProfile?.user_avatar?.avatar_url ??
								undefined
							}
							containerClassName={'border-none w-10 h-10 mr-2'}
							className={'w-8 h-8 '}
						/>
					)}
					<div>
						<p className={'pt-2 break-words'}>{comment}</p>
					</div>
				</div>

				<div>
					{deleteButton && (
						<button
							className="block  icon-container !h-8 !w-8 flex rounded-md items-center justify-center bg-transparent"
							onClick={() => {
								if (onDelete) {
									onDelete(id);
								}
							}}
						>
							<i className="delete-small-icon"></i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommentCard;
