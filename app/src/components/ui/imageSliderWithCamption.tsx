import React from 'react';

import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CssUtils from '../../core/utilities/css-utils';
import { ICaseImage } from '../../core/interfaces/case.interface';

const ImageSliderWithCaption: React.FC<{
	images: ICaseImage[];
	onChange: (index: number) => void;
	sliderRef?: React.MutableRefObject<Slider | undefined>;
	onImageClicked?: (index: number) => void;
	onDelete?: (image: ICaseImage) => void;
	onDownload?: (image: ICaseImage) => void;
	onClose?: () => void;
	slideShowNumber?: number;
	minimunSlideShowNumber?: number;
}> = ({
	images,
	onChange,
	sliderRef,
	onImageClicked,
	onDownload,
	onDelete,
	slideShowNumber,
	minimunSlideShowNumber,
}) => {
	const [, setCurrentSlide] = React.useState(0);
	return (
		<div className={'image-light-box-slider w-100'}>
			<Slider
				ref={(slider) => {
					if (slider && sliderRef) {
						sliderRef.current = slider;
					}
				}}
				dots={false}
				variableWidth={true}
				adaptiveHeight={true}
				infinite={true}
				focusOnSelect={true}
				slidesToScroll={1}
				slidesToShow={Math.min(
					images.length,
					minimunSlideShowNumber || 1,
				)}
				arrows={true}
				centerMode={true}
				centerPadding={'80px'}
				className={'center '}
				beforeChange={(_current, next) => {
					setCurrentSlide(next);
					onChange(Number(next));
				}}
				responsive={[
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: Math.min(images.length, 4),
						},
					},
					{
						breakpoint: 1290,
						settings: {
							slidesToShow: Math.min(images.length, 3),
						},
					},
					{
						breakpoint: 1080,
						settings: {
							slidesToShow: Math.min(images.length, 3),
						},
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: Math.min(images.length, 2),
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: Math.min(images.length, 1),
						},
					},
				]}
				nextArrow={
					<div>
						<div
							className={
								'bg-white cursor-pointer z-20 rounded-full bottom-12 w-7 h-7 flex items-center justify-center'
							}
						>
							<ChevronRight className={'w-5 h-5 text-primary'} />
						</div>
					</div>
				}
				prevArrow={
					<div>
						<div
							className={
								'bg-white cursor-pointer z-20 rounded-full bottom-12 w-7 h-7 flex items-center justify-center'
							}
						>
							<ChevronLeft className={'w-5 h-5 text-primary'} />
						</div>
					</div>
				}
			>
				{images.map((image, index) => (
					<div
						className="!w-[170px] !h-[150px] rounded-md relative overflow-hidden shadow-lg cursor-pointer mr-4"
						key={image.id}
						onClick={() => {
							if (onImageClicked) onImageClicked(index);
						}}
					>
						<img
							src={image.thumbnail_url}
							alt={`Slide ${index}`}
							className={CssUtils.cn(
								'w-[170px] h-[170px] rounded object-cover ',
							)}
						/>
						<div className="absolute flex top-2 right-2 gap-2">
							<button
								className="icon-container rounded-md !h-8 !w-8 bg-white items-center justify-center flex"
								onClick={(e) => {
									e.stopPropagation();
									if (onDownload) {
										onDownload(image);
									}
								}}
							>
								<i className="download-icon"></i>
							</button>
							<button
								className="icon-container rounded-md !h-8 !w-8 bg-white items-center justify-center flex"
								onClick={(e) => {
									e.stopPropagation();
									if (onDelete) {
										onDelete(image);
									}
								}}
							>
								<i className="delete-small-icon"></i>
							</button>
						</div>
						<div className="absolute bottom-0 left-0 h-[3rem] w-full bg-white px-2">
							<div className="text-lg text-bold w-[120px] overflow-ellipsis overflow-clip whitespace-nowrap">
								{image.file_name}
							</div>
							<div className="text-md w-[120px] whitespace-nowrap text-xs">
								{new Date(
									Number(image.created_at),
								).toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									hour12: true,
								})}
							</div>
							{/* <div className="text-md w-[120px] whitespace-nowrap text-xs"></div> */}
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ImageSliderWithCaption;
