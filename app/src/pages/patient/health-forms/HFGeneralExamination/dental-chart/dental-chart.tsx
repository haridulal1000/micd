import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import {
	ExaminationCodeEnum,
	FieldDisplayTypeEnum,
	FieldTypeEnum,
} from '../../../../../core/enums/teeth.enum';
import { ICreateWorkspaceResponse } from '../../../../../core/interfaces/workspace.interface';
import {
	IExaminationResponse,
	IFieldItem,
	IFieldOption,
	IFieldValue,
} from '../../../../../core/interfaces/teeth.interface';
import {
	getToothExaminationService,
	updateToothExaminationFieldService,
} from '../../../../../core/services/teeth.service';
import CollapseComponent from '../../../../../components/collapse/collapse';
import ToggleListComponent from '../../../../../components/toggle-list/toggle-llist';
import RadioInputComponent from '../../../../../components/radio-input/radio';
import { IWorkspaceSlug } from '../../../../../core/interfaces/patient.interface';
import SelectInputComponent from '../../../../../components/select-input/select-input';
import Spinner from '../../../../../components/ui/Spinner';
import { notifySuccess } from '../../../../../components/shared/form/toast';
import CheckboxComponent from '../../../../../components/check-box/checkbox';
import TextInputComponent from '../../../../../components/text-input/text-input';

export interface IDentalChartProps {
	workspace: IWorkspaceSlug | null;
	toothId: number;
	examinationType: ExaminationCodeEnum;
}
function ChartListComponent(props: IDentalChartProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [dentalDetails, setDentalDetails] =
		useState<IExaminationResponse | null>(null);
	const getDentalToothExamination = (toothId: number): void => {
		setIsLoading(true);
		getToothExaminationService(
			toothId,
			ExaminationCodeEnum.TOOTH_SPECIFIC,
			props.workspace?.slug || null,
			true,
		)
			.then(
				(examinationResponse: AxiosResponse<IExaminationResponse>) => {
					setDentalDetails(examinationResponse.data);
					setIsLoading(false);
				},
			)
			.catch(() => {
				setIsLoading(false);
			});
	};
	const getPerioToothExamination = (toothId: number): void => {
		setIsLoading(true);
		getToothExaminationService(
			toothId,
			ExaminationCodeEnum.TOOTH_SPECIFIC,
			props.workspace?.slug || null,
			true,
		)
			.then(
				(examinationResponse: AxiosResponse<IExaminationResponse>) => {
					setDentalDetails(examinationResponse.data);
					setIsLoading(false);
				},
			)
			.catch(() => {
				setIsLoading(false);
			});
	};
	const updateFieldValue = (fieldId: number, updateValue: object): void => {
		console.log('update field', { fieldId, updateValue });

		updateToothExaminationFieldService(
			fieldId,
			updateValue,
			props.workspace?.slug || null,
		).then((response: AxiosResponse<IFieldValue>) => {
			notifySuccess('Field updated successfully');
		});
	};
	useEffect(() => {
		if (props?.toothId && props?.examinationType) {
			if (props?.examinationType === ExaminationCodeEnum.TOOTH_SPECIFIC)
				getDentalToothExamination(props.toothId);
			else getPerioToothExamination(props.toothId);
		}
	}, [props?.examinationType, props?.toothId]);

	return (
		<div>
			{isLoading && (
				<div className="w-full h-full flex justify-center items-center min-h-[25rem]">
					<Spinner />
				</div>
			)}
			<div>
				{!isLoading && (
					<div>
						{dentalDetails?.fields.map((field: IFieldItem) => (
							<CollapseComponent
								fieldValue={field.field_value}
								key={field.id}
								name={field.text}
							>
								{field?.children
									?.filter(
										(fieldChild: IFieldItem) =>
											fieldChild.display ===
											FieldDisplayTypeEnum.HORIZONTAL_SELECT,
									)
									.map((fieldChild: IFieldItem) => (
										<div
											key={fieldChild.id}
											className="grid grid-cols-10 items-center my-4"
										>
											<div className="col-span-2">
												{fieldChild.text}:
											</div>
											<div className="col-span-8">
												<ToggleListComponent
													key={fieldChild.id}
													type={fieldChild.type}
													listItems={
														fieldChild.field_options
													}
													selectedItem={
														fieldChild.type === FieldTypeEnum.SINGLE_SELECT ?
															[fieldChild.field_value.value_single_select
															] : [...fieldChild.field_value.value_multi_select]
													}
													onItemUpdated={(
														selected: number[],
													): void => {
														if (fieldChild.type === FieldTypeEnum.SINGLE_SELECT) {

															updateFieldValue(
																fieldChild
																	?.field_value
																	.id,
																{
																	value_single_select:
																		selected[0],
																},
															);
														} else {
															updateFieldValue(
																fieldChild
																	?.field_value
																	.id,
																{
																	value_multi_select:
																		selected,
																},
															);
														}
													}}
												/>
											</div>
										</div>
									))}
								{field?.children
									?.filter(
										(fieldChild: IFieldItem) =>
											fieldChild.display ===
											FieldDisplayTypeEnum.TEXT,
									)
									.map((fieldChild: IFieldItem) => (
										<div
											key={fieldChild.id}
											className="grid grid-cols-10 items-center my-4"
										>
											<div className="col-span-2">
												{fieldChild.text}:
											</div>
											<div className="col-span-8">

												<div>TEXT HERE</div>
											</div>
										</div>
									))}
								{field?.children
									?.filter(
										(fieldChild: IFieldItem) =>
											fieldChild.display ===
											FieldDisplayTypeEnum.RADIO,
									)
									.map((fieldChild: IFieldItem) => (
										<RadioInputComponent
											key={fieldChild.id}
											fieldChild={fieldChild}
											field_options={
												fieldChild.field_options
											}
											selectedItem={
												fieldChild?.field_value
													?.value_single_select
											}
											onItemUpdated={(
												valueId: number,
												optionId: number,
											) => {
												updateFieldValue(optionId, {
													value_single_select:
														valueId,
												});
											}}
										/>
									))}
								{field?.children
									?.filter(
										(fieldChild: IFieldItem) =>
											fieldChild.display ===
											FieldDisplayTypeEnum.DROP_DOWN_SELECT,
									)
									.map((fieldChild: IFieldItem) => (
										<div
											key={fieldChild?.id}
											className="grid grid-cols-10 items-center my-4"
										>
											<div className="col-span-2">
												{fieldChild.text}
											</div>
											<div className="col-span-8 p-2 bg-primaryPastelDream w-full rounded-sm">
												<SelectInputComponent
													selectedItem={
														fieldChild?.field_value
															?.value_single_select
													}
													fieldChild={fieldChild}
													field_options={
														fieldChild?.field_options
													}
													onItemUpdated={(
														valueId: number,
														optionId: number,
													) => {
														updateFieldValue(
															optionId,
															{
																value_single_select:
																	valueId,
															},
														);
													}}
												/>
											</div>
										</div>
									))}
								{field?.children
									?.filter(
										(fieldChild: IFieldItem) =>
											fieldChild.display ===
											FieldDisplayTypeEnum.CHECK_BOX,
									)
									.map((fieldChild: IFieldItem) => (
										// <CollapseComponent fieldValue={fieldChild.field_value}
										// key={fieldChild.id}
										// name={fieldChild.text}>
										// 	<div>{fieldChild.text}</div>
										// </CollapseComponent>
										<CheckboxComponent field_options={[]} key={fieldChild.id} fieldChild={fieldChild} onItemUpdated={(
											optionId: number,
											value: object,
										) => {
											updateFieldValue(
												optionId,
												value,
											);
										}} />
									))}
							</CollapseComponent>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default ChartListComponent;
