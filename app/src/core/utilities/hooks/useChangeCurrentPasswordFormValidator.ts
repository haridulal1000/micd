import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';

interface IChangePasswordError {
	currentPassword: string[];
	password: string[];
	repeatPassword: string[];
}

function useChangePasswordFormValidation() {
	const [formErrors, setFormErrors] = useState<IChangePasswordError>({
		currentPassword: [],
		password: [],
		repeatPassword: [],
	});
	const [matchPassword, setMatchPassword] = useState('');
	const [matchRepeatPassword, setMatchRepeatPassword] = useState('');

	const clearState = (): void => {
		setFormErrors({
			currentPassword: [],
			password: [],
			repeatPassword: [],
		});
	};

	const runValidation = (validationObj: {
		currentPassword?: string;
		password?: string;
		repeatPassword?: string;
	}): number => {
		let totalErrs: string[] = [];

		if (validationObj.currentPassword !== undefined) {
			const currentPasswordErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Current password is required',
					},
					{
						type: ValidatorsListEnum.password,
						message: 'Please input a valid currentPassword',
					},
				],
				validationObj.currentPassword,
			);
			if (typeof currentPasswordErrs !== 'boolean') {
				setFormErrors((prev) => ({
					...prev,
					currentPassword: currentPasswordErrs,
				}));
				totalErrs = [...totalErrs, ...currentPasswordErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, currentPassword: [] }));
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
			if (validationObj.repeatPassword !== undefined) {
				if (validationObj.password === validationObj.repeatPassword) {
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

		if (validationObj.repeatPassword !== undefined) {
			setMatchRepeatPassword(validationObj.repeatPassword);
			if (validationObj.password !== undefined) {
				if (validationObj.password === validationObj.repeatPassword) {
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
			} else if (matchPassword !== validationObj.repeatPassword) {
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
