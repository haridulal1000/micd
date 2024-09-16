import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from '../../../../components/shared/form/input';
import SecondaryBtn, {
	PrimaryBtn,
} from '../../../../components/shared/form/btn';
import { AppDispatch } from '../../../../core/redux/store/store';
import useChangeCurrentPasswordFormValidator from '../../../../core/utilities/hooks/useChangeCurrentPasswordFormValidator';
import { changeCurrentPassword } from '../../../../core/redux/actions/authActions';
import { notifySuccess } from '../../../../components/shared/form/toast';

const changeCurrentPasswordForm = () => {
	const navigate = useNavigate();

	const dispatch: AppDispatch = useDispatch();
	const { formErrors, clearState, runValidation } =
		useChangeCurrentPasswordFormValidator();
	const [firstLoad, setFirstLoad] = useState(true);

	const handleChangeCurrentPassword = async (
		e: SyntheticEvent,
		fromOnChange?: boolean | false,
	) => {
		e.preventDefault();
		if (!fromOnChange) {
			setFirstLoad(false);
			clearState();
		}

		const target = e.target as typeof e.target & {
			currentPassword?: { value: string };
			password?: { value: string };
			repeatPassword?: { value: string };
			name?: string;
			value?: string;
		};

		let currentPassword: string | undefined = target.currentPassword?.value; // type-checks!
		let password: string | undefined = target.password?.value; // type-checks!
		let repeatPassword: string | undefined = target.repeatPassword?.value; // type-checks!

		if (fromOnChange) {
			if (firstLoad) return;
			switch (target.name) {
				case 'currentPassword':
					currentPassword = target.value;
					runValidation({ currentPassword });
					break;
				case 'password':
					password = target.value;
					runValidation({ password });
					break;
				case 'repeatPassword':
					repeatPassword = target.value;
					runValidation({ repeatPassword });
					break;
				default:
					break;
			}
		}

		let numErrors: number;
		if (!fromOnChange) {
			numErrors = runValidation({
				currentPassword,
				password,
				repeatPassword,
			});
		} else {
			return;
		}

		if (numErrors > 0) return;

		if (currentPassword && password && repeatPassword) {
			dispatch(
				changeCurrentPassword({
					current_password: currentPassword,
					new_password: password,
					repeat_new_password: repeatPassword,
				}),
			)
				.unwrap()
				.then(() => {
					notifySuccess('Password changed.');
				});
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleChangeCurrentPassword(e, true);
	};

	return (
		<form onSubmit={handleChangeCurrentPassword}>
			<p className="font-semibold my-5 test-change-password">
				Change Password
			</p>
			<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 text-sm">
				<InputField
					name={'currentPassword'}
					type={'password'}
					label={'Current Password'}
					errors={formErrors.currentPassword}
					onChange={handleChange}
					placeholder="Enter current password"
				/>
				<InputField
					name={'password'}
					type={'password'}
					label={'New Password'}
					errors={formErrors.password}
					onChange={handleChange}
					placeholder="Enter new password"
				/>
				<InputField
					name={'repeatPassword'}
					type={'password'}
					label={'Confirm Password'}
					errors={formErrors.repeatPassword}
					onChange={handleChange}
					placeholder="Repeat new Password"
				/>
			</div>
			<div className="flex flex-wrap gap-4 items-end justify-end">
				<PrimaryBtn type={'submit'} classes=" py-2.5 w-32">
					Save
				</PrimaryBtn>
				<SecondaryBtn
					classes="px-6"
					onClick={() => navigate('/dashboard')}
				>
					Cancel
				</SecondaryBtn>
			</div>
		</form>
	);
};

export default changeCurrentPasswordForm;
