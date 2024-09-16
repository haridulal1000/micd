import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';
import { IRegisterDets, ISignUpError } from '../../interfaces/auth.interface';

function useRegisterFormValidator() {
	const [formErrors, setFormErrors] = useState<ISignUpError>({
		email: [],
		password: [],
		repeatPassword: [],
		firstName: [],
		lastName: [],
	});
	const [matchPassword, setMatchPassword] = useState('');
	const [matchRepeatPassword, setMatchRepeatPassword] = useState('');

	const clearState = (): void => {
		setFormErrors({
			email: [],
			password: [],
			repeatPassword: [],
			firstName: [],
			lastName: [],
		});
	};

	const runValidation = (validationObj: IRegisterDets): number => {
		let totalErrs: string[] = [];

		if (validationObj.first_name !== undefined) {
			const firstNameErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'First name is required',
					},
				],
				validationObj.first_name,
			);
			if (typeof firstNameErrs !== 'boolean') {
				setFormErrors((prev) => ({
					...prev,
					firstName: firstNameErrs,
				}));
				totalErrs = [...totalErrs, ...firstNameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, firstName: [] }));
			}
		}

		if (validationObj.last_name !== undefined) {
			const lastNameErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Last name is required',
					},
				],
				validationObj.last_name,
			);
			if (typeof lastNameErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, lastName: lastNameErrs }));
				totalErrs = [...totalErrs, ...lastNameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, lastName: [] }));
			}
		}

		if (validationObj.email !== undefined) {
			const emailErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Email is required',
					},
					{
						type: ValidatorsListEnum.email,
						message: 'Please input a valid email',
					},
				],
				validationObj.email,
			);
			if (typeof emailErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, email: emailErrs }));
				totalErrs = [...totalErrs, ...emailErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, email: [] }));
			}
		}

		if (validationObj.password !== undefined) {
			setMatchPassword(validationObj.password);
			const passwordErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Password is required',
					},
					{
						type: ValidatorsListEnum.password,
						message:
							'Password needs to be more than 8 characters long',
					},
				],
				validationObj.password,
			);
			if (validationObj.repeat_password !== undefined) {
				if (validationObj.password === validationObj.repeat_password) {
					setFormErrors((prev) => ({ ...prev, repeatPassword: [] }));
				} else {
					const repeatPasswordErrs: string[] = [
						'Confirm password needs to match password',
					];
					setFormErrors((prev) => ({
						...prev,
						repeatPassword: repeatPasswordErrs,
					}));
					totalErrs = [...totalErrs, ...repeatPasswordErrs];
				}
			} else if (matchRepeatPassword !== validationObj.password) {
				const repeatPasswordErrs: string[] = [
					'Confirm password needs to match password',
				];
				setFormErrors((prev) => ({
					...prev,
					repeatPassword: repeatPasswordErrs,
				}));
				totalErrs = [...totalErrs, ...repeatPasswordErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, repeatPassword: [] }));
			}

			if (typeof passwordErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, password: passwordErrs }));
				totalErrs = [...totalErrs, ...passwordErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, password: [] }));
			}
		}

		if (validationObj.repeat_password !== undefined) {
			setMatchRepeatPassword(validationObj.repeat_password);
			if (validationObj.password !== undefined) {
				if (validationObj.password === validationObj.repeat_password) {
					setFormErrors((prev) => ({ ...prev, repeatPassword: [] }));
				} else {
					const repeatPasswordErrs: string[] = [
						'Confirm password needs to match password',
					];
					setFormErrors((prev) => ({
						...prev,
						repeatPassword: repeatPasswordErrs,
					}));
					totalErrs = [...totalErrs, ...repeatPasswordErrs];
				}
			} else if (matchPassword !== validationObj.repeat_password) {
				const repeatPasswordErrs: string[] = [
					'Confirm password needs to match password',
				];
				setFormErrors((prev) => ({
					...prev,
					repeatPassword: repeatPasswordErrs,
				}));
				totalErrs = [...totalErrs, ...repeatPasswordErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, repeatPassword: [] }));
			}
		}

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useRegisterFormValidator;
