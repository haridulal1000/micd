import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { IGetPatientDetailResponse } from '../../../core/interfaces/patient.interface';
import { PrimarySelectField } from '../../../components/shared/form/select';
import useUpdatePatientFormValidator from '../../../core/utilities/hooks/useUpdatePatientFormValidator';
import { InlineInputField } from '../../../components/shared/form/input';
import DatePicker from '../../../components/shared/form/datePicker';
import { getProperDate, getShortDate } from '../../../core/utilities/dateTime';
import SecondaryBtn, { PrimaryBtn } from '../../../components/shared/form/btn';

const PatientDetailEditForm = (props: {
	patientDetail: IGetPatientDetailResponse | null;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleUpdatePatient: (e: SyntheticEvent) => void;
	handleSelectChange: (e: SyntheticEvent) => void;
	formErrors: any;
}) => {
	const [showInputField, setInputField] = useState<boolean>(false);

	const handleEdit = () => {
		setInputField(!showInputField);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<p className="font-medium text-lg test-form-title">
					General Info
				</p>
				<span className="cursor-pointer" onClick={handleEdit}>
					<img src="/edit.svg" alt="edit icon" />
				</span>
			</div>
			<form
				onSubmit={(e) => {
					setInputField(false);
					props.handleUpdatePatient(e);
				}}
				data-testid="form"
				className="test-patient-detail-edit-form"
			>
				<div className="w-full">
					<div className="mt-2">
						<div
							className={` flex flex-row  text-grayText text-sm items-center ${
								showInputField ? 'mb-4' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Gender</p>
							{showInputField ? (
								<PrimarySelectField
									defaultSelectedValue={
										props?.patientDetail?.sex || 'female'
									}
									name="sex"
									label="Male"
									width={'w-[175px]'}
									options={[
										{
											label: 'Male',
											value: 'male',
										},
										{
											label: 'Female',
											value: 'female',
										},
										{
											label: 'Other',
											value: 'other',
										},
									]}
									setValueCallback={props.handleSelectChange}
								/>
							) : (
								<p className="w-3/5 capitalize">
									{props?.patientDetail?.sex}
								</p>
							)}
						</div>
					</div>
					<div className="mt-2">
						<div
							className={` flex flex-row   text-grayText text-sm items-center ${
								showInputField ? '' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Age</p>
							{showInputField ? (
								<InlineInputField
									value={props?.patientDetail?.age}
									type="text"
									name="age"
									onChange={props.handleChange}
									errors={props.formErrors.age}
								/>
							) : (
								<p className="w-3/5 capitalize">
									{props?.patientDetail?.age} yrs
								</p>
							)}
						</div>
					</div>

					<div className="mt-2">
						<div
							className={` flex flex-row text-grayText text-sm items-center ${
								showInputField ? 'mb-4' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Last Visit</p>

							{showInputField ? (
								<DatePicker
									classes={'text-grayedLabel'}
									width={'9rem'}
									defaultValue={getShortDate(
										parseInt(
											props?.patientDetail?.last_vist ||
												'',
											10,
										),
									)}
								/>
							) : (
								<p className="w-3/5">
									{getProperDate(
										parseInt(
											props?.patientDetail?.last_vist ||
												'',
											10,
										),
									)}
								</p>
							)}
						</div>
					</div>
					<div className="mt-2">
						<div
							className={` flex flex-row text-grayText text-sm items-center ${
								showInputField ? 'mb-4' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Reg Date</p>
							{showInputField ? (
								<DatePicker
									classes={'text-grayedLabel'}
									width={'9rem'}
									defaultValue={getShortDate(
										parseInt(
											props?.patientDetail
												?.registration_date || '',
											10,
										),
									)}
								/>
							) : (
								<p className="w-3/5">
									{getProperDate(
										parseInt(
											props?.patientDetail
												?.registration_date || '',
											10,
										),
									)}
								</p>
							)}
						</div>
					</div>
					<div className="mt-2">
						<div
							className={` flex flex-row text-grayText text-sm items-center  ${
								showInputField ? '' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Email</p>
							{showInputField ? (
								<InlineInputField
									type="email"
									name="email"
									value={props.patientDetail?.email}
									classes="w-40"
									onChange={props.handleChange}
									errors={props.formErrors.email}
								/>
							) : (
								<p className="w-3/5 break-words">
									{props.patientDetail?.email}
								</p>
							)}
						</div>
					</div>
					<div className="mt-2">
						<div
							className={`flex flex-row text-grayText text-sm items-center ${
								showInputField ? '' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Contact No</p>
							{showInputField ? (
								<InlineInputField
									type="text"
									name="contactNumber"
									value={props.patientDetail?.contact_number}
									classes="w-40"
									onChange={props.handleChange}
									errors={props.formErrors.contactNumber}
								/>
							) : (
								<p className="w-3/5">
									{props.patientDetail?.contact_number}
								</p>
							)}
						</div>
					</div>
					<div className="mt-2">
						<div
							className={` flex flex-row text-grayText text-sm items-center ${
								showInputField ? '' : 'mb-8'
							}`}
						>
							<p className="w-2/5 text-grayedLabel">Address</p>
							{showInputField ? (
								<InlineInputField
									type="text"
									name="address"
									value={props.patientDetail?.address}
									classes="w-40"
									onChange={props.handleChange}
									errors={props.formErrors.address}
								/>
							) : (
								<p className="w-3/5">
									{props.patientDetail?.address}
								</p>
							)}
						</div>
					</div>
				</div>
				{showInputField ? (
					<div className="flex gap-6 mt-10">
						<span>
							<PrimaryBtn
								classes="px-12 py-3 font-light"
								type={'submit'}
							>
								Save
							</PrimaryBtn>
						</span>
						<span>
							<SecondaryBtn
								classes="px-8 py-2"
								type={'button'}
								onClick={() => {
									setInputField(false);
								}}
							>
								Cancel
							</SecondaryBtn>
						</span>
					</div>
				) : (
					''
				)}
			</form>
		</div>
	);
};

export default PatientDetailEditForm;
