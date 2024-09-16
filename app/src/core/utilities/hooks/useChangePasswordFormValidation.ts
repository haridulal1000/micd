import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';
import { IChangePasswordError } from '../../interfaces/auth.interface';

function useChangePasswordFormValidation() {
	const [formErrors, setFormErrors] = useState<IChangePasswordError>({
		email: [],
		password: [],
		repeatPassword: [],
	});
	const [matchPassword, setMatchPassword] = useState('');
	const [matchRepeatPassword, setMatchRepeatPassword] = useState('');

	const clearState = (): void => {
		setFormErrors({
			email: [],
			password: [],
			repeatPassword: [],
		});
	};

	const runValidation = (validationObj: {
		email?: string;
		password?: string;
		repeat_password?: string;
	}): number => {
		let totalErrs: string[] = [];

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

export default useChangePasswordFormValidation;
