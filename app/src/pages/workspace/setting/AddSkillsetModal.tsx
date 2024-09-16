import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../../../components/shared/form/input';
import SelectField from '../../../components/ui/select-field';
import SecondaryBtn, { PrimaryBtn } from '../../../components/shared/form/btn';
import {
	createNewSkillSetForWorkspace,
	NewSkillSetFormInputs,
	newSkillSetSchema,
	updateSkillSetForWorkspace,
} from '../../../core/services/workspace.service';
import { RootState } from '../../../core/redux/store/store';
import { ISkillSetResponse } from '../../../core/interfaces/workspace.interface';

const AddSkillsetModal: React.FC<{
	onClose: () => void;
	skill?: ISkillSetResponse;
	revalidateSkills: () => Promise<void>;
}> = ({ onClose, revalidateSkills, skill }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const isTryingToUpdate = Boolean(skill);

	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<NewSkillSetFormInputs>({
		defaultValues: {
			skillSetName: skill?.name ?? '',
			level: skill?.level ?? '',
			category: skill?.category ?? '',
		},
		resolver: zodResolver(newSkillSetSchema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<NewSkillSetFormInputs> = async (data) => {
		setIsLoading(true);
		if (skill) {
			await updateSkillSetForWorkspace(slug, skill.id, data);
		} else {
			await createNewSkillSetForWorkspace(slug, data);
		}
		setIsLoading(false);
		await revalidateSkills();
		onClose();
	};

	return (
		<div className="p-8">
			<h3>{isTryingToUpdate ? 'Edit Skillset' : 'Add Skillset'}</h3>
			<p className="mb-8">
				Invite people to join your team so that they can collaborate
				with you.
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="skillSetName"
					control={control}
					render={({ field }) => (
						<InputField
							type="text"
							label="Skill"
							containerClasses="w-1/2 mb-2"
							placeholder="Eg Impression taking"
							errors={
								errors.skillSetName?.message
									? [errors.skillSetName?.message]
									: []
							}
							{...field}
						/>
					)}
				/>

				<div className="w-1/2">
					<div className={'mb-2'}>Level</div>
					<Controller
						name="level"
						control={control}
						render={({ field }) => (
							<SelectField
								placeholder="Search or select "
								options={[
									{ label: 'Basic', value: 'basic' },
									{
										label: 'Intermediate',
										value: 'intermediate',
									},
									{ label: 'Advanced', value: 'advanced' },
								]}
								className="p-4"
								error={errors.level?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={'mt-4'}>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<InputField
								type="text"
								label="Category"
								containerClasses="w-1/2 mb-2"
								placeholder="Eg Impression taking"
								errors={
									errors.category?.message
										? [errors.category?.message]
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
						{isTryingToUpdate ? 'Update Skill' : 'Add Skill'}
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
		</div>
	);
};

export default AddSkillsetModal;
