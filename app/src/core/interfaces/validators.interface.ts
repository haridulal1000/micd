export interface IValidationError {
	error: boolean;
	message: string;
}

export interface IValidatorsInput {
	type: ValidatorsListEnum;
	message: string;
}

export enum ValidatorsListEnum {
	required = 'required',
	email = 'email',
	password = 'password',
	price = 'price',
	age = 'age',
	alphanumeric = 'alphanumeric',
	phone = 'phone',
	sex = 'sex',
}
