import React from 'react';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Divider from '../ui/divider';
import Label from '../ui/label';
import SelectField from '../ui/select-field';
import { Button } from '../ui/button';
import { getWorkspaceServiceCodes } from '../../core/services/workspace.service';
import { IWorkspaceServiceCode } from '../../core/interfaces/workspace.interface';
import { RootState } from '../../core/redux/store/store';
import CaseService from '../../core/services/case-service';
import { treatmentCategories } from './7d-constants';

const generalPlanningSchema = z.object({
	problemCategory: z.string({
		required_error: 'Problem category is required',
	}),
	treatmentCategory: z.string({
		required_error: 'Treatment category is required',
	}),
	serviceCode: z.string({
		required_error: 'Service code is required',
	}),
	patientConcern: z.string({
		required_error: 'Patient concern is required',
	}),
	urgency: z.string({
		required_error: 'Urgency is required',
	}),
});

type GeneralPlanningInputs = z.infer<typeof generalPlanningSchema>;

const GeneralPlanningSection: React.FC<{
	revalidateCaseDetails: () => void;
}> = ({ revalidateCaseDetails }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();
	const [serviceCodes, setServiceCodes] = React.useState<
		IWorkspaceServiceCode[]
	>([]);

	React.useEffect(() => {
		getWorkspaceServiceCodes(slug).then((res) => {
			setServiceCodes(res);
		});
	}, []);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isValid },
	} = useForm<GeneralPlanningInputs>({
		defaultValues: {},
		resolver: zodResolver(generalPlanningSchema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<GeneralPlanningInputs> = async (data) => {
		setIsLoading(true);
		await CaseService.addTreatment(
			slug,
			Number(data.serviceCode),
			data.patientConcern,
			data.urgency,
			data.problemCategory,
			data.treatmentCategory,
			parseInt(params?.caseId!, 10),
		);
		revalidateCaseDetails();
		reset();
		setIsLoading(false);
	};

	return (
		<div className={'my-4'}>
			<h6 className={'text-xl font-semibold'}>Treatment Plan</h6>
			<Divider />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={'flex flex-col space-y-3'}
			>
				<div
					className={
						'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
					}
				>
					<div>
						<Label>Problem Category</Label>
						<Controller
							name="problemCategory"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={[
										{
											label: 'Promotive and Preventive',
											value: 'promotive_and_preventive',
										},
										{
											label: 'Curative and Rehabilitative',
											value: 'curative_and_rehabilitative',
										},
										{
											label: 'Beauty and Glamour',
											value: 'beauty_and_glamour',
										},
									]}
									error={errors.problemCategory?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div>
						<Label>Treatment Category</Label>
						<Controller
							name="treatmentCategory"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={treatmentCategories}
									error={errors.treatmentCategory?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div>
						<Label>Service code</Label>
						<Controller
							name="serviceCode"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={serviceCodes.map((code) => ({
										label: code.name,
										value: String(code.id),
									}))}
									error={errors.serviceCode?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div>
						<Label>Patient Concern</Label>
						<Controller
							name="patientConcern"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={[
										{ label: 'Low', value: 'low' },
										{ label: 'Medium', value: 'medium' },
										{ label: 'High', value: 'high' },
									]}
									error={errors.patientConcern?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div>
						<Label>Urgency</Label>
						<Controller
							name="urgency"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={[
										{ label: 'Low', value: 'low' },
										{ label: 'Medium', value: 'medium' },
										{ label: 'High', value: 'high' },
									]}
									error={errors.urgency?.message}
									{...field}
								/>
							)}
						/>
					</div>
				</div>

				<div>
					<Button
						type={'submit'}
						intent={'blue-primary'}
						className={'rounded-full w-[271px]'}
						disabled={!isValid || isLoading}
					>
						{isLoading ? 'Saving...' : 'Enter'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default GeneralPlanningSection;
