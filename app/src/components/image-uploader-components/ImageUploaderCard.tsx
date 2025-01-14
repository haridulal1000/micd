import React, { useRef } from 'react';
import Dropzone from 'react-dropzone';
import { DownloadIcon, Trash2 } from 'lucide-react';
import moment from 'moment';
import { ICaseImage } from '../../core/interfaces/case.interface';
import { Button } from '../ui/button';

const ImageUploaderCard: React.FC<{
	image: string;
	setImage: (image: string) => void;
	setFile?: (file: File) => void;
	onImageClick?: () => void;
	isUploading?: boolean;
	caseImage?: ICaseImage;
	setImageName?: (imageName: string) => void;
}> = ({
	setImage,
	image,
	onImageClick,
	isUploading,
	setFile,
	caseImage,
	setImageName,
}) => {
	const imgRef = useRef(null);

	const handleFileDrop = (files: File[]) => {
		if (setFile) setFile(files[0]);
		if (setImageName) setImageName(files[0].name);
		setImage(URL.createObjectURL(files[0]));
	};

	return (
		<Dropzone
			onDrop={(acceptedFiles) => handleFileDrop(acceptedFiles)}
			accept={{
				'image/jpeg': ['.jpeg'],
				'image/png': ['.png'],
				'image/jpg': ['.jpg'],
			}}
		>
			{({ getRootProps, getInputProps }) => (
				<>
					<div
						className={
							'h-[228px] w-[228px] rounded cursor-pointer relative flex items-center flex-col justify-center my-2 '
						}
						{...getRootProps()}
					>
						{image ? (
							<div
								className={'bg-white overflow-hidden '}
								onClick={(e) => {
									e.stopPropagation();
									if (onImageClick) {
										onImageClick();
									}
								}}
							>
								<img
									src={image}
									alt="uploaded image"
									className={
										'h-full w-full object-cover rounded shadow'
									}
									onClick={(e) => {
										e.stopPropagation();
										if (onImageClick) {
											onImageClick();
										}
									}}
								/>
								{caseImage && (
									<div
										className={
											'absolute bg-white text-grayText w-full bottom-0 p-2 rounded-b flex justify-between flex-col gap-1 shadow min-h-[55px]'
										}
									>
										<span
											className={
												'text-sm  overflow-hidden overflow-ellipsis whitespace-nowrap'
											}
										>
											{caseImage.file_name}
										</span>
										<span className={'text-sm'}>
											{moment(
												Number(caseImage.created_at),
											).format('DD MMM, YYYY hh:mm A ')}
										</span>
									</div>
								)}
							</div>
						) : (
							<React.Fragment>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path
										d="M19 12.9989C18.7348 12.9989 18.4804 13.1043 18.2929 13.2918C18.1054 13.4793 18 13.7337 18 13.9989V14.3789L16.52 12.8989C15.9974 12.3805 15.2911 12.0895 14.555 12.0895C13.8189 12.0895 13.1126 12.3805 12.59 12.8989L11.89 13.5989L9.41 11.1189C8.88012 10.6145 8.17657 10.3332 7.445 10.3332C6.71343 10.3332 6.00988 10.6145 5.48 11.1189L4 12.5989V6.99892C4 6.7337 4.10536 6.47935 4.29289 6.29181C4.48043 6.10428 4.73478 5.99892 5 5.99892H12C12.2652 5.99892 12.5196 5.89356 12.7071 5.70603C12.8946 5.51849 13 5.26414 13 4.99892C13 4.7337 12.8946 4.47935 12.7071 4.29181C12.5196 4.10428 12.2652 3.99892 12 3.99892H5C4.20435 3.99892 3.44129 4.31499 2.87868 4.8776C2.31607 5.44021 2 6.20327 2 6.99892V18.9989C2 19.7946 2.31607 20.5576 2.87868 21.1202C3.44129 21.6828 4.20435 21.9989 5 21.9989H17C17.7956 21.9989 18.5587 21.6828 19.1213 21.1202C19.6839 20.5576 20 19.7946 20 18.9989V13.9989C20 13.7337 19.8946 13.4793 19.7071 13.2918C19.5196 13.1043 19.2652 12.9989 19 12.9989ZM5 19.9989C4.73478 19.9989 4.48043 19.8936 4.29289 19.706C4.10536 19.5185 4 19.2641 4 18.9989V15.4289L6.9 12.5289C7.04691 12.3889 7.24206 12.3108 7.445 12.3108C7.64794 12.3108 7.84309 12.3889 7.99 12.5289L11.16 15.6989L15.46 19.9989H5ZM18 18.9989C17.9986 19.1903 17.9354 19.3762 17.82 19.5289L13.31 14.9989L14.01 14.2989C14.0817 14.2257 14.1673 14.1676 14.2617 14.1279C14.3561 14.0882 14.4576 14.0678 14.56 14.0678C14.6624 14.0678 14.7639 14.0882 14.8583 14.1279C14.9527 14.1676 15.0383 14.2257 15.11 14.2989L18 17.2089V18.9989ZM22.71 4.28892L19.71 1.28892C19.6149 1.19788 19.5028 1.12651 19.38 1.07892C19.1365 0.978902 18.8635 0.978902 18.62 1.07892C18.4972 1.12651 18.3851 1.19788 18.29 1.28892L15.29 4.28892C15.1968 4.38216 15.1228 4.49285 15.0723 4.61467C15.0219 4.73649 14.9959 4.86706 14.9959 4.99892C14.9959 5.26522 15.1017 5.52062 15.29 5.70892C15.4783 5.89722 15.7337 6.00301 16 6.00301C16.2663 6.00301 16.5217 5.89722 16.71 5.70892L18 4.40892V9.99892C18 10.2641 18.1054 10.5185 18.2929 10.706C18.4804 10.8936 18.7348 10.9989 19 10.9989C19.2652 10.9989 19.5196 10.8936 19.7071 10.706C19.8946 10.5185 20 10.2641 20 9.99892V4.40892L21.29 5.70892C21.383 5.80265 21.4936 5.87704 21.6154 5.92781C21.7373 5.97858 21.868 6.00472 22 6.00472C22.132 6.00472 22.2627 5.97858 22.3846 5.92781C22.5064 5.87704 22.617 5.80265 22.71 5.70892C22.8037 5.61596 22.8781 5.50536 22.9289 5.3835C22.9797 5.26164 23.0058 5.13093 23.0058 4.99892C23.0058 4.86691 22.9797 4.7362 22.9289 4.61434C22.8781 4.49248 22.8037 4.38188 22.71 4.28892Z"
										fill="#24272E"
									/>
								</svg>
								<p className={'text-center text-sm'}>
									Drag and drop images here
								</p>
								<p className={'text-center text-sm'}>or</p>
								<Button
									intent={'blue-primary'}
									className={'bg-blue-500'}
								>
									{isUploading ? 'Uploading' : 'Browse files'}
								</Button>
							</React.Fragment>
						)}

						<input type="file" ref={imgRef} {...getInputProps()} />
					</div>
				</>
			)}
		</Dropzone>
	);
};

export default ImageUploaderCard;
