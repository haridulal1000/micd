import { useState } from 'react';
import { ValidatorsListEnum } from '../../interfaces/validators.interface';
import { validateInput } from '../validators';

interface IWorkspaceError {
	name: string[];
}

function useWorkspaceFormValidation() {
	const [formErrors, setFormErrors] = useState<IWorkspaceError>({
		name: [],
	});

	const clearState = (): void => {
		setFormErrors({ name: [] });
	};

	const runValidation = (validationObj: { name?: string }): number => {
		let totalErrs: string[] = [];

		if (validationObj.name !== undefined) {
			const nameErrs: string[] | boolean = validateInput(
				[
					{
						type: ValidatorsListEnum.required,
						message: 'Name is required',
					},
				],
				validationObj.name,
			);
			if (typeof nameErrs !== 'boolean') {
				setFormErrors((prev) => ({ ...prev, name: nameErrs }));
				totalErrs = [...totalErrs, ...nameErrs];
			} else {
				setFormErrors((prev) => ({ ...prev, name: [] }));
			}
		}

		return totalErrs.length;
	};

	return { formErrors, runValidation, clearState };
}

export default useWorkspaceFormValidation;
