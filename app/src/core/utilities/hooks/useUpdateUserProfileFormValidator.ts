import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';

interface IUpdateUserProfileError {
	firstName: string[];
	lastName: string[];
}

function useUpdateUserProfileFormValidator() {
	const [formErrors, setFormErrors] = useState<IUpdateUserProfileError>({
		firstName: [],
		lastName: [],
	});

	const clearState = (): void => {
		setFormErrors({
			firstName: [],
			lastName: [],
		});
	};

	const runValidation = (validationObj: {
		firstName?: string;
		lastName?: string;
	}): number => {
		let totalErrs: string[] = [];

		if (validationObj.firstName !== undefined) {
			const firstNameErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'First name is required',
					},
				],
				validationObj.firstName,
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

		if (validationObj.lastName !== undefined) {
			const lastNameErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Last name is required',
					},
				],
				validationObj.lastName,
			);
			if (typeof lastNameErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, lastName: lastNameErrs }));
				totalErrs = [...totalErrs, ...lastNameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, lastName: [] }));
			}
		}

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useUpdateUserProfileFormValidator;
