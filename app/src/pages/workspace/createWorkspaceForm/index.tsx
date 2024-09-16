import React, { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryBtn, { PrimaryBtn } from '../../../components/shared/form/btn';
import InputField from '../../../components/shared/form/input';
import useWorkspaceFormValidation from '../../../core/utilities/hooks/useWorkspaceFormValidation';
import {
	createWorkspace,
	getAllWorkspaces,
	uploadWorkspaceImage,
} from '../../../core/redux/actions/workspaceActions';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import { notifyError } from '../../../components/shared/form/toast';

const CreateWorkspaceForm = (props: {
	handleHideCreateWorkspace: () => void;
}) => {
	const imgRef = useRef(null);
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { loading } = useSelector((state: RootState) => state.workspace);
	const { clearState, runValidation, formErrors } =
		useWorkspaceFormValidation();

	const [workspaceImg, setWorkspaceImg] = useState('/placeholder-img.svg');
	const [workspaceName, setWorkspaceName] = useState('');

	const handleFileDrop = (files: File[]) => {
		if (files.length > 0 && files[0].type.includes('image')) {
			setWorkspaceImg(URL.createObjectURL(files[0]));
		} else {
			notifyError('Please select a valid image file');
		}
	};

	const handleSubmit = async (
		e: SyntheticEvent,
		fromOnChange?: boolean | false,
	) => {
		e.preventDefault();

		let numErrors: number;
		if (!fromOnChange) {
			numErrors = runValidation({ name: workspaceName });
		} else {
			return;
		}

		if (numErrors > 0) return;

		if (workspaceName) {
			// dispatch(uploadWorkspaceImage()) --- need workspace slug here as per api so need some api changes here
			try {
				await dispatch(
					createWorkspace({ name: workspaceName, type: 'personal' }),
				).unwrap();
				if (location.pathname === '/workspace/create')
					navigate('/dashboard');
				dispatch(getAllWorkspaces());
				props.handleHideCreateWorkspace();
			} catch (error: any) {
				console.log('Error creating workspace = ', error);
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setWorkspaceName(e.target.value);
		// handleSubmit(e, true);
	};

	return (
		<>
			<form
				className="primary-card bg-white flex flex-col gap-5 p-5 w-full md:px-16 md:py-16 lg:px-24 lg:py-16 z-50"
				onSubmit={handleSubmit}
			>
				<h2 className="font-bold leading-10 text-left mb-10">
					Create your workspace
				</h2>
				<Dropzone
					onDrop={(acceptedFiles) => handleFileDrop(acceptedFiles)}
				>
					{({ getRootProps, getInputProps }) => (
						<>
							<div
								className="flex p-4 border border-dashed rounded-xl gap-5 mb-4"
								{...getRootProps()}
							>
								<div
									className={`rounded-xl bg-primaryPastelDream flex ${
										workspaceImg === '/placeholder-img.svg'
											? 'p-4'
											: 'p-0'
									} `}
								>
									<img
										src={workspaceImg}
										alt=""
										className={`${
											workspaceImg ===
											'/placeholder-img.svg'
												? 'w-6'
												: 'w-28'
										}`}
									/>
								</div>
								<p className="flex items-center gap-2">
									<img
										src="/uploader.svg"
										alt="uploader"
										className="w-6"
									/>
									<span>
										Drop an image or browse from your
										computer
									</span>
								</p>
								<input
									type="file"
									ref={imgRef}
									{...getInputProps()}
								/>
							</div>
						</>
					)}
				</Dropzone>
				<div className="flex items-center flex-wrap md:flex-nowrap w-full gap-4">
					<div className="w-full">
						<InputField
							name={'workspaceName'}
							type={'text'}
							label={'What is the name of your workspace?'}
							errors={formErrors.name}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					<PrimaryBtn
						classes="p-6 h-12 w-36 flex items-center justify-center"
						type={'submit'}
						disabled={loading}
					>
						{loading ? 'loading...' : 'Save'}
					</PrimaryBtn>
					{location.pathname === '/workspace/create' ? (
						''
					) : (
						<SecondaryBtn
							classes="px-8 pb-3 h-12 w-36"
							onClick={
								props.handleHideCreateWorkspace
									? props.handleHideCreateWorkspace
									: () => {
											//
									  }
							}
						>
							Cancel
						</SecondaryBtn>
					)}
				</div>
			</form>
		</>
	);
};

export default CreateWorkspaceForm;
