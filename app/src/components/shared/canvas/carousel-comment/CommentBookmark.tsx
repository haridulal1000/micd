import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearEmptyBookmarks,
	hideAllBookmarkComments,
	selectBookmarkById,
	toggleBookmarkCommentVisibility,
} from '../../../../core/redux/reducers/imageCarouselSlice';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { ISliderBookmark } from '../../../../core/interfaces/imageSlider.interface';
import CommentCard from './CommentCard';

interface ICommentBookmarkProps {
	bookmarkId: string | number;
	xCoordinate: number;
	yCoordinate: number;
}

const CommentBookmark = (props: ICommentBookmarkProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const bookmarkSize = 40;

	const { canvasWidth, canvasHeight } = useSelector(
		(state: RootState) => state.imageSlider,
	);

	const thisBookmark: ISliderBookmark = useSelector((state: RootState) =>
		selectBookmarkById(state, props.bookmarkId),
	);

	const toggleBookmarkVisAndClearOtherBookmarks = () => {
		dispatch(clearEmptyBookmarks());
		dispatch(hideAllBookmarkComments());
		dispatch(
			toggleBookmarkCommentVisibility({
				bookmarkId: thisBookmark.id,
			}),
		);
	};

	return (
		<>
			<div
				className={`hover:bg-gradient-rainbow bg-[#527DF5] rounded-full rounded-br-none p-[1px] absolute
					${
						thisBookmark && thisBookmark.commentBoxVisible
							? 'bg-gradient-rainbow'
							: 'bg-transparent'
					}`}
				style={{
					top: props.yCoordinate * canvasHeight - bookmarkSize,
					left: props.xCoordinate * canvasWidth - bookmarkSize,
					height: bookmarkSize,
					width: bookmarkSize,
				}}
				onClick={toggleBookmarkVisAndClearOtherBookmarks}
			>
				<img
					style={{
						height: bookmarkSize,
						width: bookmarkSize,
					}}
					src="/test-profile-pic.png"
					className={`rounded-full rounded-br-none hover:bg-gradient-rainbow absolute
						${
							thisBookmark && thisBookmark.commentBoxVisible
								? 'bg-gradient-rainbow'
								: 'bg-transparent'
						}`}
				/>
			</div>
			{thisBookmark && thisBookmark.commentBoxVisible && (
				<div
					className="bg-white w-1/3 rounded-lg rounded-tl-none shadow-lg absolute"
					style={{
						top: props.yCoordinate * canvasHeight + 5,
						left: props.xCoordinate * canvasWidth + 5,
					}}
				>
					<CommentCard bookmarkId={thisBookmark.id} />
				</div>
			)}
		</>
	);
};

export default CommentBookmark;
