import React from 'react';
import {
	DentistFormInputs,
	FormFieldResponse,
} from '../../core/services/dentist-forms-service';
import Label from '../ui/label';
import SelectField from '../ui/select-field';
import CustomSelect from '../ui/custom-select';

const DynamicFormFields: React.FC<{
	formFields: FormFieldResponse;
	setFormState: React.Dispatch<
		React.SetStateAction<DentistFormInputs['fields']>
	>;
	formState: DentistFormInputs['fields'];
	isFormValid?: boolean;
}> = ({ formFields, setFormState, formState, isFormValid }) => {
	const allSelectFields = formFields.fields.filter(
		(field) => field.type === 'single_select',
	);

	const allTextFields = formFields.fields.filter(
		(field) => field.type === 'text',
	);

	const isFormReallyValid = isFormValid === false;

	return (
		<div className={'flex flex-col gap-4'}>
			<div
				className={`grid ${
					allSelectFields.length === 1
						? ''
						: 'grid-cols-1 md:grid-cols-2 '
				} gap-4`}
			>
				{allSelectFields.map((field, idx) => {
					const fieldFromState = formState.find(
						(f) => f.id_code === field.id_code,
					);

					const value = fieldFromState?.value_single_select
						? {
								value: String(
									fieldFromState.value_single_select,
								),
								label:
									field.field_options.find(
										(o) =>
											o.id ===
											fieldFromState?.value_single_select,
									)?.value || '',
						  }
						: null;

					return (
						<div key={`dynamic-${idx}`}>
							<Label>
								{field.text}
								{isFormReallyValid &&
									field.required &&
									!fieldFromState?.value_single_select && (
										<span className={'text-red-500'}>
											*
										</span>
									)}
							</Label>
							<CustomSelect
								placeholder="Search or select "
								onChange={(newValue) => {
									const isFieldAlreadyInFormState =
										formState.find(
											(f) => f.id_code === field.id_code,
										);

									if (isFieldAlreadyInFormState) {
										setFormState((prevState) =>
											prevState.map((f) => {
												if (
													f.id_code === field.id_code
												) {
													return {
														id_code: field.id_code,
														value_single_select:
															Number(
																newValue?.value,
															),
													};
												}

												return f;
											}),
										);
										return;
									}

									setFormState((prevState) => [
										...prevState,
										{
											id_code: field.id_code,
											value_single_select: Number(
												newValue?.value,
											),
										},
									]);
								}}
								name={field.id_code}
								value={value}
								options={
									field.field_options.map((o) => ({
										label: o.value,
										value: o.id.toString(),
									})) || []
								}
							/>
						</div>
					);
				})}
			</div>
			<div>
				{allTextFields.map((field, idx) => {
					const fieldFromState = formState.find(
						(f) => f.id_code === field.id_code,
					);

					return (
						<div key={`text-dynamic-${idx}`}>
							<Label>
								{field.text}
								{isFormReallyValid &&
									field.required &&
									!fieldFromState?.value_single_select && (
										<span className={'text-red-500'}>
											*
										</span>
									)}
							</Label>
							<textarea
								value={
									fieldFromState?.value_text
										? fieldFromState.value_text
										: ''
								}
								name={field.id_code}
								placeholder={field.text}
								className="w-full h-32 bg-saphireLight rounded p-2 text-sm"
								onChange={(e) => {
									const isFieldAlreadyInFormState =
										formState.find(
											(f) => f.id_code === field.id_code,
										);

									if (isFieldAlreadyInFormState) {
										setFormState((prevState) =>
											prevState.map((f) => {
												if (
													f.id_code === field.id_code
												) {
													return {
														id_code: field.id_code,
														value_text:
															e.target.value,
													};
												}

												return f;
											}),
										);
										return;
									}

									setFormState((prevState) => [
										...prevState,
										{
											id_code: field.id_code,
											value_text: e.target.value,
										},
									]);
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default DynamicFormFields;
