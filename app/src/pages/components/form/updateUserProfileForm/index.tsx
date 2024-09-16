import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from '../../../../components/shared/form/input';
import SecondaryBtn, {
	PrimaryBtn,
} from '../../../../components/shared/form/btn';
import { IUserProfileResponse } from '../../../../core/interfaces/userProfile.interface';
import { AppDispatch } from '../../../../core/redux/store/store';
import useUpdateUserProfileFormValidator from '../../../../core/utilities/hooks/useUpdateUserProfileFormValidator';
import { updateUserProfile } from '../../../../core/redux/actions/userProfileActions';
import { notifySuccess } from '../../../../components/shared/form/toast';

const updateUserProfileForm = (props: {
	userProfile: IUserProfileResponse | null;
	loading: boolean;
}) => {
	const navigate = useNavigate();

	const dispatch: AppDispatch = useDispatch();
	const { formErrors, clearState, runValidation } =
		useUpdateUserProfileFormValidator();
	const [firstLoad, setFirstLoad] = useState(true);

	const [firstNameValue, setFirstNameValue] = useState(
		props.userProfile?.first_name,
	);
	const [lastNameValue, setLastNameValue] = useState(
		props.userProfile?.last_name,
	);

	const handleUpdateUserProfile = async (
		e: SyntheticEvent,
		fromOnChange?: boolean | false,
	) => {
		e.preventDefault();
		if (!fromOnChange) {
			setFirstLoad(false);
			clearState();
		}

		const target = e.target as typeof e.target & {
			firstName?: { value: string };
			lastName?: { value: string };
			name?: string;
			value?: string;
		};

		let firstName: string | undefined = target.firstName?.value; // type-checks!
		let lastName: string | undefined = target.lastName?.value; // type-checks!

		if (fromOnChange) {
			if (firstLoad) return;
			switch (target.name) {
				case 'firstName':
					firstName = target.value;
					runValidation({ firstName });
					break;
				case 'lastName':
					lastName = target.value;
					runValidation({ lastName });
					break;
				default:
					break;
			}
		}

		let numErrors: number;
		if (!fromOnChange) {
			numErrors = runValidation({
				firstName,
				lastName,
			});
		} else {
			return;
		}

		if (numErrors > 0) return;

		if (firstName && lastName) {
			dispatch(
				updateUserProfile({
					first_name: firstName,
					last_name: lastName,
				}),
			)
				.unwrap()
				.then(() => {
					notifySuccess('User Profile Updated.');
				});
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleUpdateUserProfile(e, true);
	};

	return (
		<form onSubmit={handleUpdateUserProfile}>
			<p className="font-semibold my-5">Profile Information</p>
			<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 text-sm">
				<InputField
					name={'firstName'}
					type={'text'}
					label={'First Name'}
					value={firstNameValue}
					errors={formErrors.firstName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setFirstNameValue(e.target.value);
						handleChange(e);
					}}
					placeholder="Enter a valid firstname"
				/>
				<InputField
					name={'lastName'}
					type={'text'}
					label={'Last Name'}
					value={lastNameValue}
					errors={formErrors.lastName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setLastNameValue(e.target.value);
						handleChange(e);
					}}
					placeholder="Enter a valid lastname"
				/>
				<InputField
					name={'email'}
					type={'email'}
					label={'Email'}
					value={props.userProfile?.email}
					disabled="true"
				/>
				<InputField
					name={'role'}
					type={'text'}
					label={'Role'}
					value={'Dentist'}
					disabled="true"
				/>
			</div>
			<div className="flex flex-wrap gap-4 items-end justify-end">
				<PrimaryBtn
					type={'submit'}
					disabled={
						props.userProfile?.first_name === firstNameValue &&
						props.userProfile?.last_name === lastNameValue
					}
					classes={'py-2.5 w-32'}
				>
					{props.loading ? 'Loading...' : 'Save'}
				</PrimaryBtn>
				<SecondaryBtn
					classes="px-6"
					type={'button'}
					onClick={() => navigate('/dashboard')}
				>
					Cancel
				</SecondaryBtn>
			</div>
		</form>
	);
};

export default updateUserProfileForm;
