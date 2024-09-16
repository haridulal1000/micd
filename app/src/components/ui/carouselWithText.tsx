import React, { Ref } from 'react';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import placeHolderImage from '../../assets/images/placeholder-image.png';
import { ICaseImage } from '../../core/interfaces/case.interface';

const CarouselWithText: React.FC<{
	images: ICaseImage[];
	onChange?: (index: number) => void;
	initialSlideIndex?: number;
	sliderRef?: React.MutableRefObject<Slider | undefined>;
	onDelete?: (image: ICaseImage) => void;
	onDownload?: (image: ICaseImage) => void;
	onClose?: () => void;
}> = ({
	images,
	onChange,
	initialSlideIndex,
	sliderRef,
	onDownload,
	onClose,
	onDelete,
}) => (
	<div className={'p-2 custom-carousel'}>
		<Slider
			ref={(slider) => {
				if (slider && sliderRef) {
					sliderRef.current = slider;
				}
			}}
			beforeChange={(_current, next) => onChange?.(Number(next))}
			dots={false}
			infinite={true}
			arrows={true}
			centerMode={true}
			slidesToShow={1}
			slidesToScroll={1}
			centerPadding={'0px'}
			nextArrow={
				<div>
					<div
						className={
							'bg-white cursor-pointer z-20 rounded-full bottom-12 w-7 h-7 flex items-center justify-center'
						}
					>
						<ArrowRight className={'w-5 h-5 text-primary'} />
					</div>
				</div>
			}
			prevArrow={
				<div>
					<div
						className={
							'bg-white cursor-pointer z-20 rounded-full bottom-[50%] w-7 h-7 flex items-center justify-center'
						}
					>
						<ArrowLeft className={'w-5 h-5 text-primary'} />
					</div>
				</div>
			}
			initialSlide={initialSlideIndex ?? 0}
		>
			{images.map((image, index) => (
				<div className={''} key={image.image_url}>
					<div className="flex justify-between w-full">
						<div className="flex gap-2 items-center mb-2">
							<img src={placeHolderImage} />
							<span className="text-white">
								{image.description}
							</span>
						</div>
						<div className="flex gap-2 items-center mb-2">
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
									if (onClose) {
										onClose();
									}
								}}
							>
								<i className="exit-small-icon !h-4 !w-4"></i>
							</button>
						</div>
					</div>
					<img
						key={image.image_url}
						src={image.image_url}
						alt={`Slide ${index}`}
						className={'h-[400px] w-full rounded object-cover'}
					/>
				</div>
			))}
		</Slider>
	</div>
);

export default CarouselWithText;
