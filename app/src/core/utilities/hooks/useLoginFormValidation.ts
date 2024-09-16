import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { ILoginError } from '../../interfaces/auth.interface';
import { validateInput } from '../validators';

function useLoginFormValidator() {
	const [formErrors, setFormErrors] = useState<ILoginError>({
		email: [],
		password: [],
	});

	const clearState = (): void => {
		setFormErrors({ email: [], password: [] });
	};

	const runValidation = (validationObj: {
		email?: string;
		password?: string;
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

			if (typeof passwordErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, password: passwordErrs }));
				totalErrs = [...totalErrs, ...passwordErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, password: [] }));
			}
		}

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useLoginFormValidator;
