import React, { SyntheticEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import CssUtils from '../../../core/utilities/css-utils';
import InputField from '../../../components/shared/form/input';
import WorkspaceSkillset from './WorkspaceSkillset';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import ServiceCodes from './ServiceCodes';
import {
	FileType,
	useFileValidation,
} from '../../../core/utilities/hooks/useFileValidation';
import {
	notifyError,
	notifySuccess,
} from '../../../components/shared/form/toast';
import {
	getAllWorkspaces,
	removeWorkspaceImage,
	updateWorkspaceName,
	uploadWorkspaceImage,
} from '../../../core/redux/actions/workspaceActions';
import useDebounce from '../../../core/utilities/hooks/useDebouce';

const WorkspaceSettings = () => {
	const dispatch: AppDispatch = useDispatch();

	const workspaceInfo = useSelector(
		(state: RootState) =>
			state.workspace.allWorkspaces?.[0] || state.workspace.workspaceInfo,
	);
	const [workspaceName, setWorkspaceName] = React.useState(
		workspaceInfo?.name ?? '',
	);

	const debouncedWorkspaceName = useDebounce(workspaceName, 1000);

	const fileInput = useRef<HTMLInputElement>(null);

	const handleChangePicture = (e: SyntheticEvent) => {
		fileInput.current?.click();
		e.stopPropagation();
	};

	const removeImage = async () => {
		if (workspaceInfo?.slug) {
			try {
				await dispatch(
					removeWorkspaceImage(workspaceInfo.slug),
				).unwrap();
				notifySuccess('Workspace image removed successfully');
				dispatch(getAllWorkspaces());
			} catch (error: any) {
				console.log('Unable to upload image to workspace', error);
			}
		}
	};

	const uploadPhoto = async (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;

		const _file = target.files[0];
		const renamedFile = new File([_file], _file.name.toLowerCase(), {
			type: _file.type,
		});
		const validationResult = useFileValidation(
			renamedFile,
			FileType.USER_AVATAR_IMAGE,
		);

		if (validationResult.error && validationResult.messages.length > 0) {
			validationResult.messages.map((errorMessage) =>
				notifyError(errorMessage),
			);
			return;
		}
		if (workspaceInfo?.slug) {
			try {
				await dispatch(
					uploadWorkspaceImage({
						slug: workspaceInfo.slug,
						file: renamedFile,
					}),
				).unwrap();
				notifySuccess('Workspace image uploaded successfully');
				dispatch(getAllWorkspaces());
			} catch (error: any) {
				console.log('Unable to upload image to workspace', error);
			}
		}
	};

	React.useEffect(() => {
		if (
			workspaceInfo?.slug &&
			debouncedWorkspaceName !== workspaceInfo?.name
		) {
			dispatch(
				updateWorkspaceName({
					slug: workspaceInfo.slug,
					workspaceDetails: {
						name: workspaceName,
					},
				}),
			);
			notifySuccess('Workspace name updated successfully');
			dispatch(getAllWorkspaces());
		}
	}, [debouncedWorkspaceName]);

	return (
		<div
			id="workspace-settings-container"
			className="flex items-center justify-center"
		>
			<div id="workspace-settings" className="w-4/6">
				<h2 className="font-bold mb-14 text-grayText">
					Workspace Settings
				</h2>

				<div
					className={CssUtils.cn(
						'primary-card min-h-[300px] w-full p-8 mb-6',
					)}
				>
					<h3 className="font-semibold ">Workspace overview</h3>
					<div className="flex pt-6">
						<div>
							<div className="bg-saphireLight rounded-2xl mb-5">
								<img
									src={
										workspaceInfo?.image_url ||
										'/placeholder-img.svg'
									}
									className="h-28 rounded-2xl w-28 object-cover"
									alt=""
								/>
							</div>
							<p
								className="text-center text-primary cursor-pointer"
								onClick={() => removeImage()}
							>
								Remove
							</p>
						</div>

						<div className="ml-5 w-2/5 mt-5 mr-14">
							<p className="mb-5">
								We recommend the use of image below than 5mb for
								workspace image.
							</p>
							<input
								type="file"
								ref={fileInput}
								style={{ display: 'none' }}
								onChange={uploadPhoto}
							/>
							<button
								className="border-solid border-primary border-2 px-5 py-2 rounded-3xl text-primary flex items-center gap-1"
								onClick={handleChangePicture}
							>
								<img src="/uploader-bold.svg" alt="" />
								<span>Upload image</span>
							</button>
						</div>

						<div className="flex-1 mt-7">
							<p>Workspace Name</p>
							<InputField
								name=""
								type="text"
								placeholder="Eg: MICDSoft"
								value={workspaceName}
								onChange={(e) => {
									setWorkspaceName(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>

				<WorkspaceSkillset />
				<ServiceCodes />
			</div>
		</div>
	);
};

export default WorkspaceSettings;
