import React from 'react';
import moment from 'moment/moment';
import {
	ArrowUp,
	EditIcon,
	MoreHorizontal,
	PinIcon,
	Trash2Icon,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { ICommentThread } from '../../../core/interfaces/comment.interface';
import Avatar from '../../ui/avatar';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';
import SecondaryBtn, { PrimaryBtn } from '../form/btn';
import CommentService from '../../../core/services/comment-service';
import { RootState } from '../../../core/redux/store/store';
import Divider from '../../ui/divider';
import NewCommentInput from './NewCommentInput';

const EachComment: React.FC<{
	comment: ICommentThread;
	revalidateComments: () => void;
}> = ({ comment, revalidateComments }) => {
	const [openSubMenu, setOpenSubMenu] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [updatedText, setUpdatedText] = React.useState(
		comment.comments[0].text,
	);
	const [replyText, setReplyText] = React.useState('');
	const [openReply, setOpenReply] = React.useState(false);
	const [showReplies, setShowReplies] = React.useState(false);
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const ref = useOutClickHandler(() => setOpenSubMenu(false));

	const handleUpdateComment = async () => {
		if (!updatedText) return;
		await CommentService.updateThread(
			comment.comments[0].id,
			updatedText,
			slug,
		);
		setOpenEdit(false);

		revalidateComments();
	};

	const handleReplyComment = async () => {
		if (!replyText) return;
		await CommentService.addCommentToThread(comment.id, replyText, slug);
		setOpenReply(false);
		setReplyText('');
		revalidateComments();
	};

	const handleDeleteComment = async () => {
		await CommentService.deleteThread(comment.comments[0].id, slug);
		revalidateComments();
	};

	const replies = comment.comments.slice(1, comment.comments.length);
	const mainComment = comment.comments[0];

	return (
		<div className="bg-saphireLight rounded-lg p-4 mt-4 min-w-[270px] max-w-[25rem]">
			<div className={'flex justify-between'}>
				<p className="text-grayedLabel  text-sm">
					{moment(Number(comment.created_at)).fromNow()}
				</p>
				<div className={'flex gap-1 relative'}>
					{comment.pinned && <PinIcon className={'text-blue-500'} />}

					<MoreHorizontal
						className={'cursor-pointer text-blue-500'}
						onClick={() => setOpenSubMenu(!openSubMenu)}
					/>
					{openSubMenu && (
						<div
							className={
								'bg-white absolute top-8 right-0 min-w-[156px] rounded-lg shadow-lg z-10'
							}
							ref={ref}
						>
							<div
								onClick={() => {
									setOpenSubMenu(false);
									setOpenEdit(true);
								}}
								className={
									'flex gap-2 items-center  p-2 hover:bg-neutral-300  cursor-pointer'
								}
							>
								<EditIcon />
								<p className={'text-sm'}>Edit</p>
							</div>
							<hr className="border-gray-300" />
							<div
								className={
									'flex gap-2 items-center  p-2 hover:bg-neutral-300  cursor-pointer'
								}
								onClick={handleDeleteComment}
							>
								<Trash2Icon />
								<p className={'text-sm'}>Delete</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{openEdit ? (
				<div className={'flex gap-2 items-start mt-2'}>
					<Avatar
						fullName={`${mainComment.user.first_name} ${mainComment.user.last_name}`}
						image={mainComment.user.avatar?.avatar_url}
						containerClassName={'border-none w-10 h-10'}
						className={'w-8 h-8'}
					/>
					<div className={'flex-1'}>
						<textarea
							value={updatedText}
							onChange={(e) => setUpdatedText(e.target.value)}
							className={
								'w-full h-20 border border-gray-300 rounded-lg p-2'
							}
						/>
						<div className={'flex items-center'}>
							<PrimaryBtn
								type={'button'}
								classes="py-2.5 w-32"
								onClick={async () => {
									await handleUpdateComment();
								}}
							>
								Save
							</PrimaryBtn>
							<SecondaryBtn
								classes="px-6"
								onClick={() => {
									setOpenEdit(false);
								}}
							>
								Cancel
							</SecondaryBtn>
						</div>
					</div>
				</div>
			) : (
				<div className={'flex items-start gap-2 mb-4'}>
					<Avatar
						fullName={`${mainComment.user.first_name} ${mainComment.user.last_name}`}
						image={mainComment.user.avatar?.avatar_url}
						containerClassName={'border-none w-10 h-10'}
						className={'w-8 h-8'}
					/>

					<div className={'flex-1'}>
						<div className={'flex items-center'}>
							<p className={'text-base font-medium'}>
								{mainComment.user.first_name}{' '}
								{mainComment.user.last_name}
							</p>
						</div>

						<p className={'text-sm'}>{mainComment.text}</p>

						<div>
							<div
								className={'flex items-center justify-between'}
							>
								<div
									onClick={() => setOpenReply(!openReply)}
									className={'cursor-pointer text-blue-500'}
								>
									Reply
								</div>
								{replies.length > 0 && (
									<div
										className={
											'flex items-center  cursor-pointer'
										}
										onClick={() =>
											setShowReplies(!showReplies)
										}
									>
										<div className={'flex'}>
											{replies.map(
												(r, i) =>
													i < 2 && (
														<Avatar
															fullName={`${r.user.first_name} ${r.user.last_name}`}
															image={
																r.user.avatar
																	?.avatar_url
															}
															containerClassName={
																'border-none w-10 h-10'
															}
															className={
																'w-8 h-8'
															}
														/>
													),
											)}
										</div>

										<p>{replies.length} replies</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{showReplies &&
				replies.map((c) => (
					<div
						className={'flex items-start gap-2 mb-4 ml-10 '}
						key={c.id}
					>
						<Avatar
							fullName={`${c.user.first_name} ${c.user.last_name}`}
							image={c.user.avatar?.avatar_url}
							containerClassName={'border-none w-10 h-10'}
							className={'w-8 h-8'}
						/>

						<div className={'flex-1'}>
							<p className={'text-sm'}>
								{c.user.first_name} {c.user.last_name}
							</p>
							<p className={'text-sm break-all '}>{c.text}</p>
							<p
								className={
									'text-sm text-neutral-500 text-right '
								}
							>
								{moment(Number(c.updated_at)).fromNow()}
							</p>
						</div>
					</div>
				))}

			{openReply && (
				<React.Fragment>
					<Divider />
					<div className={'flex gap-2 items-start mt-2'}>
						<Avatar
							fullName={`${mainComment.user.first_name} ${mainComment.user.last_name}`}
							image={mainComment.user.avatar?.avatar_url}
							containerClassName={'border-none w-10 h-10'}
							className={'w-8 h-8'}
						/>
						<div
							className={
								'flex flex-1 items-start bg-saphireLight rounded-lg  gap-0  min-w-[270px]'
							}
						>
							<textarea
								className="text-left text-sm mt-2 bg-saphireLight w-full resize-none border-0 outline-none"
								onChange={(e) => setReplyText(e.target.value)}
								placeholder="Write a comment ✍️"
								value={replyText}
							/>
							<div>
								<button
									className={`rounded-full h-[30px] w-[30px] p-[6px] pl-[7.5px] mt-2 flex items-center justify-center ${
										replyText.length > 0
											? 'bg-primary'
											: 'bg-gray'
									}`}
									onClick={handleReplyComment}
									disabled={replyText.length < 1}
								>
									<ArrowUp
										className={
											replyText.length > 0
												? 'text-white w-5 h-5'
												: 'text-grayedLabel w-5 h-5'
										}
									/>
								</button>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

const CommentsBox: React.FC<{
	caseId: number;
	comments: ICommentThread[];
	revalidateComments: () => void;
}> = ({ caseId, comments, revalidateComments }) => {
	const currentImageId = useSelector(
		(state: RootState) => state.ui.selectedImageId,
	);
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const handleCommentSave = async (value: string) => {
		await CommentService.createNewThread(
			{
				image_id: currentImageId,
				text: value,
				case_id: caseId,
			},
			currentWorkspaceSlug,
		);
		revalidateComments();
	};

	return (
		<div
			className={
				'shadow-md rounded-md mt-4 w-full mr-10 bg-white p-5 max-h-[75vh]  overflow-x-hidden  '
			}
		>
			<p className={'text-base font-semibold mb-1'}>Comments</p>

			<NewCommentInput handleOnSubmit={handleCommentSave} />
			<div>
				{comments.map((comment) => (
					<EachComment
						comment={comment}
						key={comment.id}
						revalidateComments={revalidateComments}
					/>
				))}
			</div>
		</div>
	);
};

export default CommentsBox;
