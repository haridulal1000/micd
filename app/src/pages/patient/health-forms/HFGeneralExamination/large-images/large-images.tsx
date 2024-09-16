import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import ImageUploaderCard from '../../../../../components/image-uploader-components/ImageUploaderCard';
import Modal from '../../../../../components/ui/modal';
import { Button } from '../../../../../components/ui/button';
import SecondaryBtn from '../../../../../components/shared/form/btn';
import { ICaseImage } from '../../../../../core/interfaces/case.interface';
import ImageSliderWithCaption from '../../../../../components/ui/imageSliderWithCamption';
import ModalHeaderComponent from '../../../../../components/shared/modal-header/modal-header';
import downloadImage from '../../../../../utils/downloadImage';
import PreviewImageModal from '../../../../../components/image-uploader-components/PreviewImageModal';
import noImageFound from '../../../../../assets/images/no-image-found.png';

export interface ILargeImageProps {
	workSpaceSlug: string;
	itemId: number | null;
	images: ICaseImage[];
	slideShowNumber?: number;
	minimumSlideShowNumber?: number;
	onToothImageAdded: (images: ICaseImage[]) => void;
	onImageDeleted: (image: ICaseImage) => void;
	onImageUploaded: (
		uploadImage: string,
		uploadImageDescription: string,
		uploadImageName: string,
	) => void;
}

function LargeImagesComponent(props: ILargeImageProps) {
	const imageSliderRef = React.useRef<Slider | undefined>();
	const carouselRef = React.useRef<Slider>();
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [uploadImage, setUploadImage] = React.useState<string>('');
	const [uploadImageName, setUploadImageName] = React.useState<string>('');
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
	const [uploadingImageDescription, setUploadingImageDescription] =
		useState<string>('');
	const [itemImage, setToothImage] = useState<string>(
		'/upload-folder-icon.svg',
	);
	const imgRef = useRef(null);

	useEffect(() => {
		if (selectedImageIndex === 0 || selectedImageIndex)
			carouselRef.current?.slickGoTo(selectedImageIndex);
	}, [selectedImageIndex]);

	const handleImageChange = (image: string) => {
		setUploadImage(image);
	};
	const handleUploadImage = async () => {
		props.onImageUploaded(
			uploadImage,
			uploadingImageDescription,
			uploadImageName,
		);
		setUploadImage('');
		setUploadImageName('');
		setIsUploading(false);
		setIsModalOpen(false);
		setUploadingImageDescription('');
	};
	const handleFileDrop = (files: File[]) => {
		handleImageChange(URL.createObjectURL(files[0]));
		setIsModalOpen(true);
	};

	return (
		<div className="p-5">
			<div className="py-4">
				<ModalHeaderComponent
					text={`Attachments  (${props.images.length})`}
					addButton={true}
					optionsButton={true}
					onAdd={() => {
						setIsModalOpen(true);
					}}
				/>
			</div>

			<Modal
				open={isFullScreen}
				onRequestClose={() => setIsFullScreen(false)}
				className="border-0 outline-none bg-transparent mx-auto w-fit h-fit mt-4"
			>
				{props.images?.length > 0 && !isModalOpen && (
					<div>
						<PreviewImageModal
							open={isFullScreen}
							images={props.images}
							title="Dental Image"
							setOpen={setIsFullScreen}
							selectedImageIndex={selectedImageIndex}
						/>
					</div>
				)}
			</Modal>
			{isFullScreen && (
				<div
					id="modal-overlay"
					className="fixed left-0 top-0 w-screen h-screen bg-black opacity-75"
					onClick={() => setIsFullScreen(false)}
				></div>
			)}

			{props.images?.length === 0 && (
				<div className="w-full">
					<img src={noImageFound} className="object-cover my-2" />
				</div>
			)}
			{!isFullScreen && (
				<div>
					<div className="flex gap-2">
						{props.images.length > 0 && !isModalOpen && (
							<div className="grow h-full min-w-[30rem]">
								<ImageSliderWithCaption
									sliderRef={imageSliderRef}
									onChange={(index) => {
										setSelectedImageIndex(index);
									}}
									images={props.images}
									onImageClicked={() => setIsFullScreen(true)}
									onDownload={(outputImage: ICaseImage) => {
										downloadImage(outputImage.image_url);
									}}
									onDelete={(outputImage: ICaseImage) => {
										if (props.onImageDeleted)
											props.onImageDeleted(outputImage);
									}}
									slideShowNumber={props.slideShowNumber}
									minimunSlideShowNumber={
										props.minimumSlideShowNumber
									}
								/>
							</div>
						)}
					</div>
				</div>
			)}
			<Modal
				open={isModalOpen}
				className={'bg-white shadow-2xl rounded-lg p-4 w-[30rem]'}
			>
				<h1 className="text-zinc-800 text-2xl font-medium leading-9 text-center">
					Upload an Image
				</h1>
				<div className={'flex items-center justify-center'}>
					<ImageUploaderCard
						isUploading={isUploading}
						image={uploadImage}
						setImageName={(imageName: string) => {
							setUploadImageName(imageName);
						}}
						setImage={(i) => handleImageChange(i)}
					/>
				</div>
				<textarea
					placeholder={'Write a description ✍️'}
					className="micd-input w-full h-32 border border-gray-300 rounded-md p-2 "
					value={uploadingImageDescription}
					onChange={(e) =>
						setUploadingImageDescription(e.target.value)
					}
				/>
				<div className={'flex items-center jus'}>
					<Button
						onClick={handleUploadImage}
						disabled={!uploadImage || isUploading}
					>
						{isUploading ? 'Uploading' : 'Upload'}
					</Button>

					<SecondaryBtn onClick={() => setIsModalOpen(false)}>
						Cancel
					</SecondaryBtn>
				</div>
			</Modal>
		</div>
	);
}

function arePropsEqual(
	prevProps: ILargeImageProps,
	nextProps: ILargeImageProps,
) {
	return (
		prevProps.itemId === nextProps.itemId &&
		prevProps.workSpaceSlug === nextProps.workSpaceSlug &&
		prevProps.images?.length === nextProps.images?.length
	);
}

export default React.memo(LargeImagesComponent, arePropsEqual);
