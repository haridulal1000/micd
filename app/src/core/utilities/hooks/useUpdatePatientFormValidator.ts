import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';
import { GenderEnum } from '../../interfaces/patient.interface';

interface IUpdatePatientError {
	firstName: string[];
	lastName: string[];
	sex: string[];
	age: string[];
	email: string[];
	contactNumber: string[];
	address: string[];
}

function useUpdatePatientFormValidator() {
	const [formErrors, setFormErrors] = useState<IUpdatePatientError>({
		firstName: [],
		lastName: [],
		sex: [],
		age: [],
		email: [],
		contactNumber: [],
		address: [],
	});

	const clearState = (): void => {
		setFormErrors({
			firstName: [],
			lastName: [],
			sex: [],
			age: [],
			email: [],
			contactNumber: [],
			address: [],
		});
	};

	const runValidation = (validationObj: {
		firstName?: string;
		lastName?: string;
		sex?: string;
		age?: number;
		email?: string;
		contactNumber?: string;
		address?: string;
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

		if (validationObj.sex !== undefined) {
			const sexErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Sex is required',
					},
				],
				validationObj.sex,
			);
			if (typeof sexErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, sex: sexErrs }));
				totalErrs = [...totalErrs, ...sexErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, sex: [] }));
			}
		}

		if (validationObj.age !== undefined) {
			const ageErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Enter valid age',
					},
					{
						type: ValidatorsListEnum.age,
						message: 'Enter valid age',
					},
				],
				validationObj.age,
			);
			if (typeof ageErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, age: ageErrs }));
				totalErrs = [...totalErrs, ...ageErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, age: [] }));
			}
		}

		if (validationObj.email !== undefined) {
			const emailErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.email,
						message: 'Please enter valid email',
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

		if (validationObj.contactNumber !== undefined) {
			const contactNumberErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.phone,
						message: 'Enter valid contact number.',
					},
					{
						type: ValidatorsListEnum.required,
						message: 'Contact number is required',
					},
				],
				validationObj.contactNumber,
			);
			if (typeof contactNumberErrs !== 'boolean') {
				setFormErrors((prev) => ({
					...prev,
					contactNumber: contactNumberErrs,
				}));
				totalErrs = [...totalErrs, ...contactNumberErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, contactNumber: [] }));
			}
		}

		if (validationObj.address !== undefined) {
			const addressErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Address is required',
					},
				],
				validationObj.address,
			);
			if (typeof addressErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, address: addressErrs }));
				totalErrs = [...totalErrs, ...addressErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, address: [] }));
			}
		}

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useUpdatePatientFormValidator;
