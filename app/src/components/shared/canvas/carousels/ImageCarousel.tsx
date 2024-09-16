import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useImageSlider from '../hooks/useImageSlider';
import {
	ISliderBookmark,
	ISliderState,
} from '../../../../core/interfaces/imageSlider.interface';
import { RootState } from '../../../../core/redux/store/store';
import {
	setCanvasDims,
	setCurrentImageIndex,
} from '../../../../core/redux/reducers/imageCarouselSlice';
import CommentBookmark from '../carousel-comment/CommentBookmark';

interface ICanvasProps {
	onCanvasClick: (event: MouseEvent, sliderImageId: number) => void;
	enableComments: boolean;
}

const ImageSlider = (props: ICanvasProps) => {
	const dispatch = useDispatch();
	const { sliderImages, currentImageIndex }: ISliderState = useSelector(
		(state: RootState) => state.imageSlider,
	);

	const [currentImageBookmarks, setCurrentImageBookmarks] = useState<
		ISliderBookmark[]
	>([]);

	const canvasRef = useImageSlider(
		sliderImages.map((sliderImage) => sliderImage.imageSource),
		currentImageIndex,
	);

	const nextImg = () =>
		currentImageIndex + 1 >= sliderImages.length
			? dispatch(setCurrentImageIndex(0))
			: dispatch(setCurrentImageIndex(currentImageIndex + 1));

	const prevImg = () =>
		currentImageIndex - 1 < 0
			? dispatch(setCurrentImageIndex(sliderImages.length - 1))
			: dispatch(setCurrentImageIndex(currentImageIndex - 1));

	useEffect(() => {
		if (canvasRef.current)
			dispatch(
				setCanvasDims({
					width: canvasRef.current.width,
					height: canvasRef.current.height,
				}),
			);
	}, [canvasRef.current]);

	useEffect(() => {
		if (!sliderImages || currentImageIndex < 0) return;
		const currentBMs = sliderImages[currentImageIndex].bookmarks;

		if (currentBMs) setCurrentImageBookmarks([...currentBMs]);
		else setCurrentImageBookmarks([]);
	}, [currentImageIndex, sliderImages]);

	return (
		<div className="relative">
			<canvas
				id="slider"
				className="w-full"
				ref={canvasRef}
				onClick={(event: MouseEvent) =>
					props.onCanvasClick(
						event,
						sliderImages[currentImageIndex].id,
					)
				}
			/>
			<div className="flex justify-between pr-4 pl-4 -mt-10">
				<img
					className="cursor-pointer"
					src="/slider-prev.svg"
					onClick={prevImg}
				/>
				<img
					className="cursor-pointer"
					src="/slider-next.svg"
					onClick={nextImg}
				/>
			</div>

			{props.enableComments &&
				canvasRef.current &&
				currentImageBookmarks && (
					<>
						{currentImageBookmarks.map(
							(bookmark: ISliderBookmark, index) => (
								<CommentBookmark
									key={index}
									bookmarkId={bookmark.id}
									xCoordinate={bookmark.scaledX}
									yCoordinate={bookmark.scaledY}
								/>
							),
						)}
					</>
				)}
		</div>
	);
};

export default ImageSlider;
