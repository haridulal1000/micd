import React, { ChangeEvent, SyntheticEvent, useRef } from 'react';
import { InlineInputField } from '../../../components/shared/form/input';
import { IGetPatientDetailResponse } from '../../../core/interfaces/patient.interface';
import useUpdatePatientFormValidator from '../../../core/utilities/hooks/useUpdatePatientFormValidator';

const PatientNameEditForm = (props: {
	patientDetail: IGetPatientDetailResponse | null;
	handleUpdatePatient: (e: SyntheticEvent) => void;
	handleNameEditor: () => void;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
	const { formErrors } = useUpdatePatientFormValidator();
	const buttonRef = useRef(null);

	return (
		<form
			onSubmit={(e) => {
				props.handleNameEditor();
				props.handleUpdatePatient(e);
			}}
			data-testid="form"
		>
			<div className="flex flex-col">
				<div className="flex gap-2">
					<InlineInputField
						type="text"
						name="firstName"
						value={props.patientDetail?.first_name}
						classes="w-full"
						onChange={props.handleChange}
						errors={formErrors.firstName}
					/>
					<InlineInputField
						type="text"
						name="lastName"
						value={props.patientDetail?.last_name}
						classes="w-full"
						onChange={props.handleChange}
						errors={formErrors.lastName}
					/>
				</div>
			</div>
			<div className="relative float-right cursor-pointer caret-transparent">
				<div className="w-6 h-6 text-sm  absolute  right-8 rounded-full flex items-center justify-center text-right mb-2 bg-primaryPastelDream hover:bg-success  hover:text-white">
					<button type="submit" ref={buttonRef} onClick={undefined}>
						<img
							className="h-3"
							src="/tickIcon.png"
							alt="cross icon"
						/>
					</button>
				</div>
				<div
					onClick={props.handleNameEditor}
					className="w-6 h-6 text-sm right-1 absolute  rounded-full flex items-center justify-center text-right mb-2 bg-primaryPastelDream hover:bg-primary hover:text-white"
				>
					x
				</div>
			</div>
		</form>
	);
};

export default PatientNameEditForm;
