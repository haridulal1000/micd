import React from 'react';
import Slider from 'react-slick';
import Divider from '../ui/divider';
import NoImageFoundCard from '../ui/NoImageFoundCard';
import { ICaseImage } from '../../core/interfaces/case.interface';
import ImageLightBoxSlider from '../ui/ImageLightBoxSlider';
import PreviewImageModal from '../image-uploader-components/PreviewImageModal';

const GeneralChartingImages: React.FC<{
	images: ICaseImage[];
}> = ({ images }) => {
	const [allGeneralChartingImages, setAllGeneralChartingImages] =
		React.useState<string[]>(images.map((img) => img.thumbnail_url));

	const [open, setOpen] = React.useState<boolean>(false);
	const [selectedImageIndex, setSelectedImageIndex] =
		React.useState<number>(0);
	const sliderRef = React.useRef<Slider>();

	React.useEffect(() => {
		setAllGeneralChartingImages(images.map((img) => img.thumbnail_url));
	}, [images]);

	return (
		<div className={'my-4'}>
			<h6 className={'text-xl font-semibold'}>General Charting Images</h6>
			<Divider />
			{images.length === 0 && <NoImageFoundCard />}
			<ImageLightBoxSlider
				sliderRef={sliderRef}
				onChange={(index) => {
					setSelectedImageIndex(index);
				}}
				onImageClick={(index) => {
					setOpen(true);
					setSelectedImageIndex(index);
				}}
				images={allGeneralChartingImages}
				imageDetails={images}
			/>

			{images.length > 0 && open && (
				<PreviewImageModal
					open={open}
					selectedImageIndex={selectedImageIndex}
					setOpen={setOpen}
					images={images}
					title={'Tooth specific Images'}
				/>
			)}
		</div>
	);
};

export default GeneralChartingImages;
