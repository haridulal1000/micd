import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../ui/card';
import DentistFormsService, {
	DentistFormInputs,
	FormFieldResponse,
} from '../../core/services/dentist-forms-service';
import { RootState } from '../../core/redux/store/store';
import { Button } from '../ui/button';
import DoctorCheckViewHistoryButton from './DoctorCheckViewHistoryButton';
import Spinner from '../ui/Spinner';
import DynamicFormFields from '../form-fields/DynamicFormFields';
import { notifySuccess } from '../shared/form/toast';

const ComplaintsForm = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [formFields, setFormFields] = React.useState<
		FormFieldResponse | undefined
	>();
	const [formState, setFormState] = React.useState<
		DentistFormInputs['fields']
	>([]);
	const [gettingFormFields, setGettingFormFields] = React.useState(false);

	const [isFormValid, setIsFormValid] = React.useState<boolean | undefined>();

	const canSubmitForm = () => {
		const requiredFields = formFields?.fields.filter(
			(field) => field.required,
		);

		const requiredFieldsInFormState = formState.filter(
			(field) =>
				field.value_bool ||
				field.value_text ||
				field.value_single_select,
		);

		return requiredFields?.length === requiredFieldsInFormState.length;
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (canSubmitForm()) {
			setIsLoading(true);
			await DentistFormsService.saveDentistForm(
				{
					fields: formState,
					id_code: 'complaints',
				},
				slug,
			);
			setIsLoading(false);
			notifySuccess('Complaints successfully added.', 'Success');
			setIsFormValid(true);
			setFormState([]);
		} else {
			setIsFormValid(false);
		}
	};

	React.useEffect(() => {
		setGettingFormFields(true);
		DentistFormsService.getDentistForm('complaints', slug).then((res) => {
			setFormFields(res);
			setGettingFormFields(false);
		});
	}, [slug]);

	if (gettingFormFields) {
		return (
			<div className={'flex items-center justify-center h-96'}>
				<Spinner />
			</div>
		);
	}

	if (!formFields) {
		return null;
	}

	return (
		<Card className={'bg-white rounded p-8'}>
			<DoctorCheckViewHistoryButton />
			<p className="text-zinc-800  font-semibold leading-9 ">
				Complaints
			</p>
			<p className={'text-zinc-500 text-sm'}>
				Manage your team members and their account permissions here.
			</p>
			{isFormValid === false && !canSubmitForm() && (
				<p className={'text-red-500 text-sm'}>
					Please fill out all required fields.
				</p>
			)}
			<form className={'my-3 flex flex-col gap-6'} onSubmit={onSubmit}>
				<DynamicFormFields
					isFormValid={isFormValid}
					formFields={formFields}
					formState={formState}
					setFormState={setFormState}
				/>

				<div className={'flex items-center justify-end'}>
					<Button
						type={'submit'}
						intent={'blue-primary'}
						className={'w-36'}
						disabled={isLoading}
					>
						Save
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default ComplaintsForm;
