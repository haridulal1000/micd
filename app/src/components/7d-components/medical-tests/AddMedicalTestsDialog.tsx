import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '../../ui/modal';
import Divider from '../../ui/divider';
import MedicalTestsService, {
	MedicalTestsFormInputs,
	MedicalTestsSchema,
} from '../../../core/services/medical-tests-service';
import InputField from '../../shared/form/input';
import Label from '../../ui/label';
import { PrimaryBtn } from '../../shared/form/btn';
import { RootState } from '../../../core/redux/store/store';
import {
	MedicalTest,
	MedicalTestsResponse,
} from '../../../core/interfaces/medicalTests.interface';
import SelectField from '../../ui/select-field';

const AddMedicalTestsDialog: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
	revalidate: () => void;
	test?: MedicalTestsResponse;
}> = ({ open, setOpen, revalidate, test }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [allMedicalTests, setAllMedicalTests] = React.useState<MedicalTest[]>(
		[],
	);
	const workspace = useSelector(
		(state: RootState) => state.workspace.workspaceInfo,
	);
	const selectedPatient = useSelector(
		(state: RootState) => state.patient.selectedPatient,
	);
	const params = useParams();
	const caseId = parseInt(params.caseId!, 10);

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<MedicalTestsFormInputs>({
		defaultValues: {
			testId: String(test?.medical_test_id) || '',
			value: test?.value || '',
			date: test?.test_date || '',
			remarks: test?.remarks || '',
		},
		resolver: zodResolver(MedicalTestsSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: MedicalTestsFormInputs) => {
		if (selectedPatient && caseId && workspace?.slug) {
			if (test?.id) {
				try {
					setIsLoading(true);
					await MedicalTestsService.updateMedicalTestsForPatient(
						data,
						test.id,
						workspace?.slug || '',
					);
					revalidate();
					setOpen(false);
					setIsLoading(false);
				} catch (error) {
					console.log('error in add = ', error);
					setIsLoading(false);
				}
			} else {
				try {
					setIsLoading(true);
					await MedicalTestsService.createMedicalTestsForPatient(
						data,
						selectedPatient.id,
						caseId,
						workspace?.slug,
					);
					revalidate();
					setOpen(false);
					setIsLoading(false);
				} catch (error) {
					console.log('error in create = ', error);
					setIsLoading(false);
				}
			}
		}
	};

	React.useEffect(() => {
		MedicalTestsService.getAllMedicalTests(workspace?.slug || '').then(
			(res) => {
				setAllMedicalTests(res);
				if (res.length > 0 && !test?.id) {
					setValue('testId', res[0].id.toString());
				}
			},
		);
	}, []);

	const isUpdate = !!test?.id;

	return (
		<Modal
			open={open}
			className={
				'bg-white shadow-2xl rounded-lg p-4  xl:w-[743px] 2xl:w-[743px]'
			}
			onRequestClose={() => setOpen(false)}
		>
			<h6 className={'text-xl'}>
				{isUpdate ? 'Update Medical Test' : 'Add Medical Test'}
			</h6>
			<Divider />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={'grid grid-cols-2 gap-4'}>
					<div className={'flex flex-col'}>
						<Label>Test Name</Label>
						<Controller
							name="testId"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Select test name from the drop down"
									options={allMedicalTests.map((t) => ({
										label: t.name,
										value: t.id.toString(),
									}))}
									className="p-4"
									{...field}
								/>
							)}
						/>
					</div>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<InputField
								type="date"
								label="Date"
								containerClasses="mb-2"
								errors={
									errors.date?.message
										? [errors.date?.message]
										: []
								}
								{...field}
							/>
						)}
					/>
				</div>
				<Controller
					name="value"
					control={control}
					render={({ field }) => (
						<InputField
							type="text"
							label="Value"
							errors={
								errors.value?.message
									? [errors.value?.message]
									: []
							}
							containerClasses=" mb-2"
							placeholder="Enter a value"
							{...field}
						/>
					)}
				/>
				<Controller
					name="remarks"
					control={control}
					render={({ field }) => (
						<React.Fragment>
							<Label>Remarks </Label>
							<textarea
								placeholder={'Enter a short note/remark'}
								className="micd-input w-full h-32   rounded-md p-2 active:outline-none focus:outline-none  "
								{...field}
							/>
						</React.Fragment>
					)}
				/>
				{isLoading}
				<PrimaryBtn
					classes="px-9 py-3"
					disabled={isLoading || Object.keys(errors).length > 0}
					type={'submit'}
				>
					{isUpdate ? (
						<>{isLoading ? 'Updating' : 'Update'}</>
					) : (
						<>{isLoading ? 'Saving' : 'Save'}</>
					)}
				</PrimaryBtn>
			</form>
		</Modal>
	);
};

export default AddMedicalTestsDialog;
