import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../ui/modal';
import ImageUploaderCard from './ImageUploaderCard';
import CaseService from '../../core/services/case-service';
import { RootState } from '../../core/redux/store/store';
import { Button } from '../ui/button';
import SecondaryBtn from '../shared/form/btn';

const ImageUploaderModal: React.FC<{
	open: boolean;
	caseId?: number;
	onClose: () => void;
	afterUpdate: () => void;
}> = ({ open, caseId, onClose, afterUpdate }) => {
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [uploadImage, setUploadImage] = React.useState<string>('');
	const [file, setFile] = React.useState<File | undefined>();
	const [description, setDescription] = React.useState<string>('');
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const handleImageChange = async (toBeUploadedImage: string) => {
		if (toBeUploadedImage) {
			setIsUploading(true);
			setUploadImage(toBeUploadedImage);
			setIsUploading(false);
		}
	};

	const handleUploadImage = async () => {
		setIsUploading(true);
		if (caseId && file) {
			await CaseService.uploadCaseImage(
				caseId,
				currentWorkspaceSlug,
				description,
				file,
			);
			setIsUploading(false);
			onClose();
			afterUpdate();
			setUploadImage('');
		}
	};

	return (
		<Modal
			open={open}
			onRequestClose={onClose}
			className={
				'bg-white shadow-2xl rounded-lg p-4 focus-visible:outline-none  sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
			}
		>
			<h1 className="text-zinc-800 text-2xl font-medium leading-9 text-center">
				Upload Case Specific Images
			</h1>
			<div className={'flex items-center justify-center'}>
				<ImageUploaderCard
					isUploading={isUploading}
					image={uploadImage}
					setImage={(i) => handleImageChange(i)}
					setFile={(f) => setFile(f)}
				/>
			</div>
			<textarea
				placeholder={'Write a description ✍️'}
				className="micd-input w-full h-32 border border-gray-300 rounded-md p-2 "
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className={'flex items-center jus'}>
				<Button
					onClick={handleUploadImage}
					disabled={!uploadImage || isUploading}
				>
					{isUploading ? 'Uploading' : 'Upload'}
				</Button>

				<SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
			</div>
		</Modal>
	);
};

export default ImageUploaderModal;
