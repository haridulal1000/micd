import {
	IValidationError,
	IValidatorsInput,
} from '../interfaces/validators.interface';

const regex = {
	// eslint-disable-next-line prefer-regex-literals
	email: new RegExp(
		'^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
	),
	// eslint-disable-next-line prefer-regex-literals
	url: new RegExp('^http(s?):\\/\\/\\S+(\\/\\S+)*(\\/)?$'),
	// eslint-disable-next-line prefer-regex-literals
	price: new RegExp(/^\d+(\.\d{1,2})?$/),
	// eslint-disable-next-line prefer-regex-literals
	password: new RegExp('^[a-zA-Z0-9!@#$&()\\-`.+,/"]{8,}$'),
	// eslint-disable-next-line prefer-regex-literals
	alphanumeric: new RegExp('^[a-zA-Z0-9]+$'),
	// eslint-disable-next-line prefer-regex-literals
	phone: new RegExp(/^[\d+ -]{3,20}$/),
	// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" stronger regex
};

export class Validators {
	required(value: any, message: string): IValidationError | boolean {
		if (!value || !value.toString().trim().length) {
			return { error: true, message };
		}
		return false;
	}

	email(value: string, message: string): IValidationError | boolean {
		if (value) {
			const result = regex.email.test(value);
			if (!result) return { error: true, message };
		}
		return false;
	}

	price(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			const result = regex.price.test(value);
			if (!result) {
				return { error: true, message };
			}
		}

		return false;
	}

	password(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			const result = regex.password.test(value);

			if (!result) {
				return { error: true, message };
			}
		}

		return false;
	}

	alphanumeric(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			const result = regex.alphanumeric.test(value);

			if (!result) {
				return { error: true, message };
			}
		}

		return false;
	}

	age(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			const result = value > 0;

			if (!result) {
				return { error: true, message };
			}
		}

		return false;
	}

	phone(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			const result = regex.phone.test(value);

			if (!result) {
				return { error: true, message };
			}
		}

		return false;
	}

	sex(value: any, message: string): IValidationError | boolean {
		const length = value ? value.toString().length : 0;

		if (length > 0) {
			if (!['male', 'female', 'other'].includes(value)) {
				return { error: true, message };
			}
		}

		return false;
	}
}

export const validateInput = (
	validators: IValidatorsInput[],
	value: any,
): string[] | boolean => {
	const errors: string[] = [];
	const validation = new Validators();
	validators.forEach((validator) => {
		const error = validation[validator.type](value, validator.message);
		if (typeof error !== 'boolean') errors.push(error.message);
	});

	if (errors.length > 0) return errors;
	return false;
};
