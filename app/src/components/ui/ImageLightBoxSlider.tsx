import React from 'react';

import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, DownloadIcon, Trash2 } from 'lucide-react';
import moment from 'moment/moment';
import CssUtils from '../../core/utilities/css-utils';
import { ICaseImage } from '../../core/interfaces/case.interface';
import downloadImage from '../../utils/downloadImage';

const ImageLightBoxSlider: React.FC<{
	images: string[];
	onChange: (index: number) => void;
	sliderRef?: React.MutableRefObject<Slider | undefined>;
	onImageClick?: (index: number) => void;
	imageDetails?: ICaseImage[];
	handleRemoveImage?: (img: string) => void;
}> = ({
	images,
	onChange,
	sliderRef,
	onImageClick,
	imageDetails,
	handleRemoveImage,
}) => {
	const [currentSlide, setCurrentSlide] = React.useState(0);

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
				slidesToShow={Math.min(images.length, 4)}
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
								'cursor-pointer rounded-full bottom-12 w-7 h-7 flex items-center justify-center '
							}
						>
							<ChevronRight className={'w-6 h-6 text-white'} />
						</div>
					</div>
				}
				prevArrow={
					<div>
						<div
							className={
								'cursor-pointer rounded-full bottom-12 w-7 h-7 flex items-center justify-center'
							}
						>
							<ChevronLeft className={'w-6 h-6 text-white'} />
						</div>
					</div>
				}
			>
				{images.map((image, index) => {
					const details = imageDetails?.find(
						(i) => i.thumbnail_url === image,
					);

					return (
						<div
							className={CssUtils.cn(
								'w-full px-1 relative',
								currentSlide !== index && 'opacity-60',
							)}
							key={image}
						>
							<div>
								<div
									className={
										'absolute top-0 right-0 m-2 flex gap-2 items-center'
									}
								>
									{details && (
										<div
											className={
												' p-2 bg-white cursor-pointer rounded'
											}
											onClick={(e) => {
												e.stopPropagation();
												downloadImage(
													image,
													details?.file_name,
												);
											}}
										>
											<DownloadIcon size={16} />
										</div>
									)}

									{handleRemoveImage && details && (
										<div
											className={
												'p-2 bg-white cursor-pointer rounded'
											}
											onClick={(e) => {
												e.stopPropagation();
												handleRemoveImage(image);
											}}
										>
											<Trash2 size={16} />
										</div>
									)}
								</div>
								<img
									src={image}
									alt={`Slide ${index}`}
									onClick={() => onImageClick?.(index)}
									className={CssUtils.cn(
										'w-[228px] h-[228px] rounded object-cover ',
										currentSlide === index &&
											!details &&
											'border-2 border-red-500',
									)}
								/>

								{details && (
									<div
										onClick={() => onImageClick?.(index)}
										className={
											'bg-white cursor-pointer text-grayText w-[228px] bottom-0 p-2 rounded-b flex justify-between flex-col gap-1 shadow min-h-[55px]'
										}
									>
										<span
											className={
												'text-sm  overflow-hidden overflow-ellipsis whitespace-nowrap'
											}
										>
											{details.file_name}
										</span>
										<span className={'text-sm'}>
											{moment(
												Number(details.created_at),
											).format('DD MMM, YYYY hh:mm A ')}
										</span>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
};

export default ImageLightBoxSlider;
