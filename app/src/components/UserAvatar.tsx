import React, { SyntheticEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOutClickHandler from '../core/utilities/hooks/useOutClickHandler';
import {
	useFileValidation,
	FileType,
} from '../core/utilities/hooks/useFileValidation';
import { AppDispatch, RootState } from '../core/redux/store/store';
import {
	changeUserAvatar,
	getUserProfile,
	removeUserAvatar,
} from '../core/redux/actions/userProfileActions';
import { notifyError } from './shared/form/toast';
import {
	changePatientAvatar,
	removePatientAvatar,
} from '../core/redux/actions/patientActions';
import { setPatientAvatarChange } from '../core/redux/reducers/patientSlice';

const UserAvatar = (props: { isPatient?: boolean }) => {
	const { isPatient = false } = props;
	const [profilePicDropdownVisible, setProfilePicDropdownVisible] =
		useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	const { userProfile, loading } = useSelector(
		(state: RootState) => state.userProfile,
	);

	const { selectedPatient, patientDetail } = useSelector(
		(state: RootState) => state.patient,
	);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const userAvatar = isPatient
		? patientDetail?.avatar_url
		: userProfile?.user_avatar?.avatar_url;

	const fileInput = useRef<HTMLInputElement>(null);

	const ref = useRef(null);
	useOutClickHandler(
		() => profilePicDropdownVisible && setProfilePicDropdownVisible(false),
	);
	const handleChangePicture = (e: SyntheticEvent) => {
		fileInput.current?.click();
		e.stopPropagation();
	};

	const handleRemovePicture = async (e: SyntheticEvent) => {
		if (!fileInput.current) return;
		e.stopPropagation();
		if (isPatient) {
			try {
				if (selectedPatient && workspaceInfo) {
					await dispatch(
						removePatientAvatar({
							patient_id: selectedPatient.id,
							workspace: workspaceInfo.slug,
						}),
					);
					dispatch(setPatientAvatarChange({ avatar_url: '' }));
				} else {
					notifyError(
						'Something went wrong. Please try again later.',
					);
				}
			} catch (error: any) {
				console.log('error removing picture for patient = ', error);
			}
		} else {
			await dispatch(removeUserAvatar());
			dispatch(getUserProfile());
		}
		setProfilePicDropdownVisible(false);
		fileInput.current.value = '';
	};

	const uploadAndRefreshAvatar = async (file: File) => {
		if (isPatient) {
			if (selectedPatient && workspaceInfo) {
				try {
					await dispatch(
						changePatientAvatar({
							patient_id: selectedPatient.id,
							workspace: workspaceInfo.slug,
							file,
						}),
					);
				} catch (error: any) {
					console.log('error removing picture for patient = ', error);
				}
			} else {
				notifyError('Something went wrong. Please try again later.');
			}
		} else {
			await dispatch(changeUserAvatar({ file }));
			dispatch(getUserProfile());
		}
	};

	const uploadPhoto = (e: SyntheticEvent) => {
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

		if (!(validationResult.messages.length > 0))
			uploadAndRefreshAvatar(renamedFile);

		validationResult.messages.map((errorMessage) =>
			notifyError(errorMessage),
		);

		setProfilePicDropdownVisible(false);
	};

	return (
		<>
			<div className="rounded-full w-36 border border-primary m-auto p-2 relative bg-white micd-shadow">
				<img
					src={userAvatar || '/default-user-pp.png'}
					className={
						'object-cover rounded-full aspect-square h-[126px] w-[126px]'
					}
				/>

				<input
					type="file"
					ref={fileInput}
					style={{ display: 'none' }}
					onChange={uploadPhoto}
				/>

				<div className="bg-white rounded-full w-8 h-8 flex items-center justify-center p-[6px] absolute bottom-[1px] right-5 micd-shadow">
					{userAvatar && (
						<img
							className="cursor-pointer"
							src="/edit.svg"
							alt="edit"
							onClick={(e: SyntheticEvent) => {
								setProfilePicDropdownVisible(
									!profilePicDropdownVisible,
								);
								e.stopPropagation();
							}}
						/>
					)}

					{!userAvatar && (
						<span
							ref={ref}
							onClick={handleChangePicture}
							className="cursor-pointer"
						>
							➕
						</span>
					)}
				</div>
			</div>
			{profilePicDropdownVisible && (
				<div
					ref={ref}
					className="cursor-pointer absolute rounded-sm border-mdGray drop-shadow-lg flex flex-col gap-0 w-1/2 left-1/2 bg-white "
				>
					<span
						className="w-full pl-2 pt-4 pb-4 pr-10 hover:bg-saphireLight"
						onClick={handleChangePicture}
					>
						Change Picture
					</span>
					<hr className="w-full" />
					<span
						className="w-full pl-2 pb-4 pt-4 pr-10 hover:bg-saphireLight"
						onClick={handleRemovePicture}
					>
						Remove Picture
					</span>
				</div>
			)}
		</>
	);
};

export default UserAvatar;
