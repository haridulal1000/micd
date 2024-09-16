import React from 'react';
import moment from 'moment/moment';
import ImageCommentPointerAvatar from './ImageCommentPointerAvatar';
import { ICommentThread } from '../../../core/interfaces/comment.interface';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';
import Avatar from '../../ui/avatar';

const ImageCommentSection: React.FC<{
	comment: ICommentThread;
}> = ({ comment }) => {
	const [showComment, setShowComment] = React.useState(false);
	const ref = useOutClickHandler(() => {
		setShowComment(false);
	});
	const [showReplies, setShowReplies] = React.useState(false);

	const replies = comment.comments.slice(1, comment.comments.length);
	const mainComment = comment.comments[0];

	if (!comment.x_coordinate || !comment.y_coordinate) return null;

	return (
		<div
			ref={ref}
			style={{
				position: 'absolute',
				left: `${Number(comment.x_coordinate) - 44}px`,
				top: `${Number(comment.y_coordinate) - 44}px`,
			}}
		>
			<div onClick={() => setShowComment(!showComment)}>
				<ImageCommentPointerAvatar
					avatar={comment.comments[0].user.avatar?.avatar_url}
					username={`${comment.comments[0].user.first_name} ${comment.comments[0].user.last_name}`}
				/>
			</div>
			{showComment && (
				<div
					className={
						'min-w-[18rem] bg-saphireLight p-2 rounded-lg rounded-tl-none ml-10'
					}
				>
					<div className={'flex items-start gap-2 '}>
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
									className={'flex items-center justify-end'}
								>
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
																	r.user
																		.avatar
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
					{showReplies &&
						replies.map((c) => (
							<div
								className={'flex items-start gap-2 mb-4 ml-10'}
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
									<p className={'text-sm'}>{c.text}</p>
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
				</div>
			)}
		</div>
	);
};

export default ImageCommentSection;
