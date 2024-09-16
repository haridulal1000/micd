import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addComment,
	selectCommentsByBookmarkId,
} from '../../../../core/redux/reducers/imageCarouselSlice';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { ISliderComment } from '../../../../core/interfaces/imageSlider.interface';
import { InlineInput } from '../../form/input';

interface ICommentCard {
	bookmarkId: string | number;
}

const CommentCard = (props: ICommentCard) => {
	const dispatch = useDispatch<AppDispatch>();
	const comments = useSelector((state: RootState) =>
		selectCommentsByBookmarkId(state, props.bookmarkId),
	);

	const [comment, setComment] = useState<ISliderComment | null>(null);
	const [replyCountString, setReplyCountString] = useState<string>('');
	const [uniqueReplyAvatars, setReplyAvatars] = useState<Set<string>>(
		new Set([]),
	);

	const saveComment = (value: string) => {
		dispatch(
			addComment({
				bookmarkId: props.bookmarkId,
				commentText: value,
				userAvatarUrl: '/profile-pic.png',
			}),
		);
	};

	useEffect(() => {
		if (!comments) return;
		const [first, ...rest] = comments;
		setComment(first);
		setReplyAvatars(
			new Set(rest.map((reply: ISliderComment) => reply.userAvatarUrl)),
		);

		if (rest.length === 0) setReplyCountString('No Replies');
		else if (rest.length === 1) setReplyCountString('1 Reply');
		else setReplyCountString(`${rest.length} Replies`);
	}, [comments]);

	if (!comments || comments.length < 1)
		return (
			<InlineInput
				saveInputCallback={saveComment}
				userAvatar={'/test-profile-pic.png'}
			/>
		);

	return (
		<div className="bg-saphireLight rounded-lg rounded-tl-none w-full p-4">
			<div className="flex items-start">
				<img
					width={30}
					height={30}
					src="/default-user-pp.png"
					className="rounded-full mr-4"
				/>
				<div className="flex flex-col">
					<p className="pt-1 pb-3 font-semibold">
						{comment?.userName}
					</p>
					<p>{comment?.text}</p>
					{uniqueReplyAvatars && (
						<div className="flex mt-3">
							{[...uniqueReplyAvatars].map(
								(avatarUrl: string, index: number) => (
									<img
										width={30}
										height={30}
										src={avatarUrl}
										className="rounded-full pr-1"
										key={index}
									/>
								),
							)}
							<p className="pt-2 pl-2 text-grayedLabel">
								{replyCountString}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CommentCard;
