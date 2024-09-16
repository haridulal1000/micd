import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';

interface ICreatePatientError {
	first_name: string[];
	last_name: string[];
	age: string[];
	sex: string[];
	contact_number: string[];
	emergency_contact: string[];
	address: string[];
}

function useCreatePatientFormValidation() {
	const [formErrors, setFormErrors] = useState<ICreatePatientError>({
		first_name: [],
		last_name: [],
		age: [],
		sex: [],
		contact_number: [],
		emergency_contact: [],
		address: [],
	});

	const clearState = (): void => {
		setFormErrors({
			first_name: [],
			last_name: [],
			age: [],
			sex: [],
			contact_number: [],
			emergency_contact: [],
			address: [],
		});
	};

	const runValidation = (validationObj: {
		firstName?: string;
		lastName?: string;
		age?: number;
		sex?: string;
		contactNumber?: string;
		emergencyContact?: string;
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
					first_name: firstNameErrs,
				}));
				totalErrs = [...totalErrs, ...firstNameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, first_name: [] }));
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
				setFormErrors((prev) => ({ ...prev, last_name: lastNameErrs }));
				totalErrs = [...totalErrs, ...lastNameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, last_name: [] }));
			}
		}

		if (validationObj.age !== undefined) {
			const ageErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Age is required',
					},
					{
						type: ValidatorsListEnum.age,
						message: 'Age cannot be negative or zero',
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

		if (validationObj.sex !== undefined) {
			const sexErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Sex is required',
					},
					{
						type: ValidatorsListEnum.sex,
						message:
							'Sex can only be one of male, female, or other',
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

		if (validationObj.contactNumber !== undefined) {
			const contactNumberErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Contact number is required',
					},
					{
						type: ValidatorsListEnum.phone,
						message: 'Invalid phone number',
					},
				],
				validationObj.contactNumber,
			);
			if (typeof contactNumberErrs !== 'boolean') {
				setFormErrors((prev) => ({
					...prev,
					contact_number: contactNumberErrs,
				}));
				totalErrs = [...totalErrs, ...contactNumberErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, contact_number: [] }));
			}
		}

		if (validationObj.emergencyContact !== undefined) {
			const emergencyContactErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Emergency contact number is required',
					},
					{
						type: ValidatorsListEnum.phone,
						message: 'Invalid phone number',
					},
				],
				validationObj.emergencyContact,
			);
			if (typeof emergencyContactErrs !== 'boolean') {
				setFormErrors((prev) => ({
					...prev,
					emergency_contact: emergencyContactErrs,
				}));
				totalErrs = [...totalErrs, ...emergencyContactErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, emergency_contact: [] }));
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

export default useCreatePatientFormValidation;
