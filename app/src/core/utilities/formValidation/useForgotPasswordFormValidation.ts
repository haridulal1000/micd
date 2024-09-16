import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';
import { IForgotPasswordError } from '../../interfaces/auth.interface';

function useForgotPasswordFormValidator() {
	const [formErrors, setFormErrors] = useState<IForgotPasswordError>({
		email: [],
	});

	const clearState = (): void => {
		setFormErrors({ email: [] });
	};

	const runValidation = (validationObj: { email?: string }): number => {
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

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useForgotPasswordFormValidator;
