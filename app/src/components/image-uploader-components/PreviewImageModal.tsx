import React from 'react';
import ReactModal from 'react-modal';
import { XIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import moment from 'moment';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Divider from '../ui/divider';
import { ICaseImage } from '../../core/interfaces/case.interface';

const PreviewImageModal: React.FC<{
	images: ICaseImage[];
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	selectedImageIndex: number;
}> = ({ setOpen, open, images, selectedImageIndex }) => {
	const [currentImage, setCurrentImage] = React.useState<ICaseImage>(
		images[selectedImageIndex],
	);

	React.useEffect(() => {
		setCurrentImage(images[selectedImageIndex]);
	}, [selectedImageIndex]);

	React.useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);

	return (
		<ReactModal
			isOpen={open}
			onRequestClose={() => setOpen(false)}
			portalClassName={'preview-image-modal'}
			className={
				'bg-[#22272B] w-[95%] p-4 absolute top-[50%] left-[50%] right-auto bottom-auto -mr[50%] -translate-x-[50%] -translate-y-[50%] z-100'
			}
		>
			<React.Fragment>
				<div
					className={
						'flex items-center justify-between text-white relative'
					}
				>
					<div className={'flex gap-2'}>
						<svg
							width="40"
							height="36"
							viewBox="0 0 40 36"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0.00390625 5.5C0.00390625 4.17392 0.530691 2.90215 1.46837 1.96447C2.40605 1.02678 3.67782 0.5 5.00391 0.5H35.0039C36.33 0.5 37.6018 1.02678 38.5394 1.96447C39.4771 2.90215 40.0039 4.17392 40.0039 5.5V30.5C40.0039 31.8261 39.4771 33.0979 38.5394 34.0355C37.6018 34.9732 36.33 35.5 35.0039 35.5H5.00391C3.67782 35.5 2.40605 34.9732 1.46837 34.0355C0.530691 33.0979 0.00390625 31.8261 0.00390625 30.5V5.5ZM2.50391 28V30.5C2.50391 31.163 2.7673 31.7989 3.23614 32.2678C3.70498 32.7366 4.34087 33 5.00391 33H35.0039C35.6669 33 36.3028 32.7366 36.7717 32.2678C37.2405 31.7989 37.5039 31.163 37.5039 30.5V21.75L28.0614 16.8825C27.827 16.7651 27.5615 16.7243 27.3027 16.766C27.0438 16.8078 26.8046 16.9298 26.6189 17.115L17.3439 26.39L10.6939 21.96C10.4538 21.8001 10.1658 21.7283 9.87875 21.7565C9.59169 21.7848 9.32324 21.9114 9.11891 22.115L2.50391 28ZM15.0039 11.75C15.0039 10.7554 14.6088 9.80161 13.9056 9.09835C13.2023 8.39509 12.2485 8 11.2539 8C10.2593 8 9.30552 8.39509 8.60225 9.09835C7.89899 9.80161 7.50391 10.7554 7.50391 11.75C7.50391 12.7446 7.89899 13.6984 8.60225 14.4017C9.30552 15.1049 10.2593 15.5 11.2539 15.5C12.2485 15.5 13.2023 15.1049 13.9056 14.4017C14.6088 13.6984 15.0039 12.7446 15.0039 11.75Z"
								fill="#FFAB00"
							/>
						</svg>
						<div>
							<p className={'text-sm'}>
								{currentImage.file_name}
							</p>
							<p className={'text-sm'}>
								{currentImage.description},{' '}
								{moment(Number(currentImage.created_at)).format(
									'DD MMM, YYYY hh:mm A ',
								)}
							</p>
						</div>
					</div>
					<div
						onClick={() => setOpen(false)}
						className={'cursor-pointer'}
					>
						<XIcon className={'h-5 w-5'} />
					</div>
				</div>

				<Divider />
				<div className={'mt-4 flex items-center justify-center'}>
					<TransformWrapper initialScale={1} centerOnInit={true}>
						{({ zoomIn, zoomOut }) => (
							<React.Fragment>
								<div
									className={
										'h-10 w-full absolute bottom-12 flex justify-center gap-2 z-10'
									}
								>
									<button
										className={
											'bg-neutral-600 text-white p-2 rounded hover:bg-neutral-700'
										}
										onClick={() => zoomIn()}
									>
										<ZoomInIcon className={'h-5 w-5'} />
									</button>
									<button
										className={
											'bg-neutral-600 text-white p-2 rounded hover:bg-neutral-700'
										}
										onClick={() => zoomOut()}
									>
										<ZoomOutIcon className={' h-5 w-5 '} />
									</button>
								</div>
								<TransformComponent wrapperClass={'w-full'}>
									<img
										className={
											'w-full object-contain h-[80vh]'
										}
										src={
											images[selectedImageIndex].image_url
										}
										alt={
											images[selectedImageIndex].file_name
										}
									/>
								</TransformComponent>
							</React.Fragment>
						)}
					</TransformWrapper>
				</div>
			</React.Fragment>
		</ReactModal>
	);
};

export default PreviewImageModal;
