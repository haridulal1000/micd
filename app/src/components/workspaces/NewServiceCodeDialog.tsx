import React from 'react';
import { useSelector } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../ui/modal';
import { RootState } from '../../core/redux/store/store';
import {
	createWorkspaceServiceCode,
	ServiceCodeFormInputs,
	serviceCodeSchema,
	updateServiceCodeForWorkspace,
} from '../../core/services/workspace.service';
import InputField from '../shared/form/input';
import SecondaryBtn, { PrimaryBtn } from '../shared/form/btn';
import SelectField from '../ui/select-field';
import Label from '../ui/label';
import { IWorkspaceServiceCode } from '../../core/interfaces/workspace.interface';

const NewServiceCodeDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	serviceCode?: IWorkspaceServiceCode;
	revalidateServiceCode: () => Promise<void>;
}> = ({ open, onClose, revalidateServiceCode, serviceCode }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ServiceCodeFormInputs>({
		defaultValues: {
			name: serviceCode?.name ?? '',
			treatmentCost: Number(serviceCode?.treatment_cost) || 0,
			biologicalCost: serviceCode?.biological_cost ?? '',
			totalVisits: Number(serviceCode?.total_visits) || 0,
			code: serviceCode?.code ?? '',
		},
		resolver: zodResolver(serviceCodeSchema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<ServiceCodeFormInputs> = async (data) => {
		try {
			setIsLoading(true);
			if (serviceCode) {
				await updateServiceCodeForWorkspace(slug, serviceCode.id, data);
			} else {
				await createWorkspaceServiceCode(slug, data);
			}

			await revalidateServiceCode();
			onClose();

			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			className={
				'bg-white shadow-2xl rounded-lg p-4 sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
			}
			open={open}
			onRequestClose={onClose}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				{serviceCode ? (
					<h3>Edit Service Code</h3>
				) : (
					<h3>Add new Service Code</h3>
				)}
				<p className="mb-8">
					Invite people to join your team so that they can collaborate
					with you.
				</p>
				<div className={'grid grid-cols-2 gap-4'}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<InputField
								type="text"
								label="Service Name"
								containerClasses=" mb-2"
								placeholder="Eg Impression taking"
								errors={
									errors.name?.message
										? [errors.name?.message]
										: []
								}
								{...field}
							/>
						)}
					/>
					<Controller
						name="treatmentCost"
						control={control}
						render={({ field }) => (
							<InputField
								type="text"
								label="Treatment Cost"
								containerClasses="mb-2"
								placeholder="Enter treatment cost"
								errors={
									errors.treatmentCost?.message
										? [errors.treatmentCost?.message]
										: []
								}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={'grid grid-cols-2 gap-4'}>
					<div className={'flex flex-col'}>
						<label className="mb-2">Biological Cost</label>
						<Controller
							name="biologicalCost"
							control={control}
							render={({ field }) => (
								<SelectField
									placeholder="Search or select "
									options={[
										{ label: 'High', value: 'high' },
										{
											label: 'Medium',
											value: 'medium',
										},
										{ label: 'Low', value: 'low' },
									]}
									className=""
									error={errors.biologicalCost?.message}
									{...field}
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="totalVisits"
							control={control}
							render={({ field }) => (
								<InputField
									type="text"
									label="Times"
									containerClasses=" mb-2"
									placeholder="Eg 5 times"
									errors={
										errors.totalVisits?.message
											? [errors.totalVisits?.message]
											: []
									}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
				<div className={'grid grid-cols-2 gap-4'}>
					<Controller
						name="code"
						control={control}
						render={({ field }) => (
							<InputField
								type="text"
								label="Service code"
								containerClasses=" mb-2"
								placeholder="Enter service code"
								errors={
									errors.code?.message
										? [errors.code?.message]
										: []
								}
								{...field}
							/>
						)}
					/>
				</div>

				<div className="flex items-center justify-end gap-2">
					<PrimaryBtn
						classes="px-9 py-3"
						disabled={isLoading}
						type={'submit'}
					>
						{serviceCode
							? 'Update Service Code'
							: 'Add Service Code'}
					</PrimaryBtn>
					<SecondaryBtn
						classes="px-8"
						type={'button'}
						onClick={onClose}
					>
						Cancel
					</SecondaryBtn>
				</div>
			</form>
		</Modal>
	);
};

export default NewServiceCodeDialog;
