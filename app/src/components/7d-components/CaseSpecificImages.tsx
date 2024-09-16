import React from 'react';
import { useSelector } from 'react-redux';
import { PlusIcon } from 'lucide-react';
import Slider from 'react-slick';
import Divider from '../ui/divider';
import { ICaseImage } from '../../core/interfaces/case.interface';
import PreviewImageModal from '../image-uploader-components/PreviewImageModal';
import { RootState } from '../../core/redux/store/store';
import ImageUploaderModal from '../image-uploader-components/ImageUploaderModal';
import CaseService from '../../core/services/case-service';
import ImageLightBoxSlider from '../ui/ImageLightBoxSlider';
import NoImageFoundCard from '../ui/NoImageFoundCard';

const CaseSpecificImages: React.FC<{
	caseId: number;
	images: ICaseImage[];
	revalidateCaseDetails: () => void;
}> = ({ caseId, images, revalidateCaseDetails }) => {
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [allImages, setAllImages] = React.useState<string[]>(
		images.map((img) => img.thumbnail_url),
	);
	const [showImageUploaderModal, setShowImageUploaderModal] =
		React.useState<boolean>(false);
	const [open, setOpen] = React.useState<boolean>(false);
	const [selectedImageIndex, setSelectedImageIndex] =
		React.useState<number>(0);
	const sliderRef = React.useRef<Slider>();

	const handleRemoveImage = async (toBeDeletedImage: string) => {
		const imageToDelete = images.find(
			(img) => img.thumbnail_url === toBeDeletedImage,
		);

		if (!imageToDelete) return;

		await CaseService.removeCaseImage(
			currentWorkspaceSlug,
			imageToDelete?.id,
		);

		revalidateCaseDetails();
	};

	React.useEffect(() => {
		setAllImages(images.map((img) => img.thumbnail_url));
	}, [images]);

	return (
		<div className={'my-4'}>
			<div className={'flex items-center justify-between'}>
				<h6 className={'text-xl font-semibold'}>
					Case Specific Images
				</h6>
				<div
					className={'cursor-pointer'}
					onClick={() => setShowImageUploaderModal(true)}
				>
					<PlusIcon className={'w-5 h-5'} />
				</div>
			</div>
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
				handleRemoveImage={(img) => handleRemoveImage(img)}
				images={allImages}
				imageDetails={images}
			/>

			{showImageUploaderModal && (
				<ImageUploaderModal
					caseId={caseId}
					open={showImageUploaderModal}
					onClose={() => setShowImageUploaderModal(false)}
					afterUpdate={() => revalidateCaseDetails()}
				/>
			)}

			{images.length > 0 && open && (
				<PreviewImageModal
					open={open}
					selectedImageIndex={selectedImageIndex}
					setOpen={setOpen}
					images={images}
					title={'Case Specific Images'}
				/>
			)}
		</div>
	);
};

export default CaseSpecificImages;
