import React from 'react';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CssUtils from '../../core/utilities/css-utils';

const Carousel: React.FC<{
	images: string[];
	onChange?: (index: number) => void;
	initialSlideIndex?: number;
	sliderRef?: React.MutableRefObject<Slider | undefined>;
	imageClassName?: HTMLDivElement['className'];
	sliderContainerClassName?: HTMLDivElement['className'];
}> = ({
	images,
	onChange,
	initialSlideIndex,
	sliderRef,
	imageClassName,
	sliderContainerClassName,
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
			className={sliderContainerClassName}
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
				<div className={''} key={image}>
					<img
						key={image}
						src={image}
						alt={`Slide ${index}`}
						className={CssUtils.cn(
							' w-full rounded object-cover',
							imageClassName,
						)}
					/>
				</div>
			))}
		</Slider>
	</div>
);

export default Carousel;
