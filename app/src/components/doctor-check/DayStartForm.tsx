import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import SecondaryBtn from '../shared/form/btn';
import Card from '../ui/card';
import DentistFormsService, {
	DentistFormInputs,
	FormFieldResponse,
} from '../../core/services/dentist-forms-service';
import { RootState } from '../../core/redux/store/store';
import Spinner from '../ui/Spinner';
import DoctorCheckViewHistoryButton from './DoctorCheckViewHistoryButton';
import DynamicFormFields from '../form-fields/DynamicFormFields';
import { notifySuccess } from '../shared/form/toast';

const DayStartForm = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [collapse, setCollapse] = React.useState(true);
	const [gettingFormFields, setGettingFormFields] = React.useState(false);
	const [formFields, setFormFields] = React.useState<
		FormFieldResponse | undefined
	>();
	const [formState, setFormState] = React.useState<
		DentistFormInputs['fields']
	>([]);

	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

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
			try {
				setIsLoading(true);
				await DentistFormsService.saveDentistForm(
					{
						fields: formState,
						id_code: 'day_start',
					},
					slug,
				);
				notifySuccess('Day start successfully added.', 'Success');
				setIsLoading(false);
			} catch (error: any) {
				console.log('error submitting form == ', error);
			}
		} else {
			setIsFormValid(false);
		}
	};

	React.useEffect(() => {
		setGettingFormFields(true);
		DentistFormsService.getDentistForm('day_start', slug).then((res) => {
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
			<div
				className={'flex items-center justify-between cursor-pointer'}
				onClick={() => setCollapse(!collapse)}
			>
				<p className="text-zinc-800 font-semibold leading-9 ">
					{formFields?.name}
				</p>
				<ChevronDown className={'text-primary w-5 h-5 '} />
			</div>
			<p className={'text-zinc-500 text-sm'}>
				Manage your team members and their account permissions here.
			</p>
			{isFormValid === false && !canSubmitForm() && (
				<p className={'text-red-500 text-sm'}>
					Please fill out all required fields.
				</p>
			)}
			{collapse && (
				<form
					className={'my-3 flex flex-col gap-6'}
					onSubmit={onSubmit}
				>
					<DynamicFormFields
						isFormValid={isFormValid}
						formState={formState}
						formFields={formFields}
						setFormState={setFormState}
					/>
					<div className={'flex items-center justify-end'}>
						<Button
							intent={'blue-primary'}
							className={'w-36'}
							type={'submit'}
							disabled={isLoading}
						>
							{isLoading ? 'Saving' : 'Save'}
						</Button>

						<SecondaryBtn
							onClick={() => setCollapse(!collapse)}
							classes={'w-36'}
							type={'button'}
						>
							Cancel
						</SecondaryBtn>
					</div>
				</form>
			)}
		</Card>
	);
};

export default DayStartForm;
