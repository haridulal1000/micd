import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import UserAvatar from '../../../../components/UserAvatar';
import PatientNameEditForm from '../PatientNameEditForm';
import { getFullName } from '../../../../core/utilities/name';
import PatientDetailEditForm from '../PatientDetailEditForm';
import DetailedUpcomingAppointmentCard, {
	IDetailedUpcomingAppointmentProps,
} from '../../../dashboard/upcoming-appointment/upcoming-appointment-card';
import RemarksBox from '../../../7d/remarks-box';
import useUpdatePatientFormValidator from '../../../../core/utilities/hooks/useUpdatePatientFormValidator';
import { IGetPatientDetailResponse } from '../../../../core/interfaces/patient.interface';

function PatientInfo() {
	// TODO: this page/component is not used anywhere so we should delete this. Confirm before deleting with team
	const upcomingAppointments: IDetailedUpcomingAppointmentProps = {
		appointments: [
			{
				date: '2017/12/13',
				patient_name: 'Patient Name',
				start_at: '2017/12/13',
				workspace_name: 'Workspace Name',
			},
		],
	};

	// adding static patientDetail for the design
	const patientDetail: IGetPatientDetailResponse = {
		first_name: 'First',
		last_name: 'Last',
		sex: 'Male',
		age: 25,
		avatar_url: '',
		email: 'email@example.com',
		contact_number: '9877445566',
		emergency_contact: '7788994455',
		address: 'Kathmandu',
		registration_date: '2023/05/12',
		last_vist: '2023/06/16',
		next_appointment: {
			date: '2023/05/12',
			start_at: '2023/05/12',
			end_at: '2023/05/12',
			problem: 'Headache',
			reason_of_visit: 'Chest pain',
			status: 'Fine',
			cancellation_note: 'Stable now',
		},
		last_appointment: {
			date: '2023/05/12',
			start_at: '2023/05/12',
			end_at: '2023/05/12',
			problem: 'Headache',
			reason_of_visit: 'Chest pain',
			status: 'Stable now',
			cancellation_note: 'Stable on the day of inspection',
		},
		recent_cases: [],
		notes: [],
	};
	const [showNameEditor, setShowNameEditor] = useState<boolean>(false);
	const [firstLoad, setFirstLoad] = useState(true);
	const { formErrors, clearState, runValidation } =
		useUpdatePatientFormValidator();
	useEffect(() => {
		// dispatch(
		// 	getPatientDetail({
		// 		patient_id: selectedPatient.id,
		// 		workspace: workspaceInfo.slug,
		// 	}),
		// );
	}, []);
	const handleUpdatePatient = async (
		e: SyntheticEvent,
		fromOnChange?: boolean | false,
	) => {
		e.preventDefault();
		if (!fromOnChange) {
			setFirstLoad(false);
			clearState();
		}
		const target = e.target as typeof e.target & {
			firstName: { value: string };
			lastName: { value: string };
			age?: { value: number };
			contactNumber?: { value: string };
			sex?: { value: string };
			email?: { value: string };
			address?: { value: string };
			value?: string;
			name?: string;
		};
		let firstName: string | undefined = target.firstName?.value;
		let lastName: string | undefined = target.lastName?.value;
		let age: number | undefined = target.age?.value; // type-checks!
		let sex: string | undefined = target.sex?.value;
		let contactNumber: string | undefined = target.contactNumber?.value; // type-checks!
		let email: string | undefined = target.email?.value; // type-checks!
		let address: string | undefined = target.address?.value; // type-checks!
		if (fromOnChange) {
			if (firstLoad) return;
			switch (target.name) {
				case 'firstName':
					firstName = target.value; // lint fails without radix arg :(
					runValidation({ firstName });
					break;
				case 'lastName':
					lastName = target.value; // lint fails without radix arg :(
					runValidation({ lastName });
					break;
				case 'age':
					age = target.value ? parseInt(target.value, 10) : 0; // lint fails without radix arg :(
					runValidation({ age });
					break;
				case 'sex':
					sex = target.value;
					runValidation({ sex });
					break;
				case 'contactNumber':
					contactNumber = target.value;
					runValidation({ contactNumber });
					break;
				case 'email':
					email = target.value;
					runValidation({ email });
					break;
				case 'address':
					address = target.value;
					runValidation({ address });
					break;
				default:
					break;
			}
		}
		let numErrors: number;
		if (!fromOnChange) {
			numErrors = runValidation({
				firstName,
				lastName,
				age,
				sex,
				contactNumber,
				email,
				address,
			});
		} else {
			return;
		}
		if (numErrors > 0) return;
		if (
			firstName ||
			lastName ||
			age ||
			sex ||
			contactNumber ||
			email ||
			address
		) {
			// const response = await dispatch(
			// 	updatePatient({
			// 		patient_id: selectedPatient.id,
			// 		workspace: workspaceInfo.slug,
			// 		first_name: firstName,
			// 		last_name: lastName,
			// 		age: Number(age),
			// 		sex,
			// 		contact_number: contactNumber,
			// 		email,
			// 		address,
			// 	}),
			// );
			// if (response.type.includes('fulfilled')) {
			// 	notifySuccess('Patient successfully updated!');
			// 	dispatch(
			// 		getPatientDetail({
			// 			patient_id: selectedPatient.id,
			// 			workspace: workspaceInfo.slug,
			// 		}),
			// 	);
			// }
		}
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleUpdatePatient(e, true);
	};
	const handleSelectChange = (e: SyntheticEvent) => {
		handleUpdatePatient(e, true);
	};
	const handleNameEditor = () => {
		setShowNameEditor(!showNameEditor);
	};
	return (
		<div className="flex-[3] bg-white p-4">
			<div className="flex relative flex-col justify-center gap-6">
				<div className="test-patient-avatar">
					<UserAvatar isPatient={true} />
				</div>
				<div className=" flex items-center justify-center  gap-2 test-patient-name-update-form">
					{showNameEditor ? (
						<PatientNameEditForm
							handleChange={handleChange}
							patientDetail={patientDetail}
							handleUpdatePatient={handleUpdatePatient}
							handleNameEditor={handleNameEditor}
						/>
					) : (
						<>
							<p className="font-medium text-2xl caret-transparent">
								{getFullName(
									patientDetail?.first_name,
									patientDetail?.last_name,
								)}
							</p>
							<span
								className="cursor-pointer"
								onClick={handleNameEditor}
							>
								<img src="/edit.svg" alt="edit icon" />
							</span>
						</>
					)}
				</div>
				<hr className="mt-2" />
			</div>
			<div className="my-5 test-patient-edit-form">
				<PatientDetailEditForm
					patientDetail={patientDetail}
					handleChange={handleChange}
					handleUpdatePatient={handleUpdatePatient}
					handleSelectChange={handleSelectChange}
					formErrors={formErrors}
				/>
			</div>
			<DetailedUpcomingAppointmentCard appointments={[]} />
			<RemarksBox
				remarks={[
					{
						dateAdded: '2023/11/23',
						remark: 'Sample Remarks',
					},
				]}
				title="Remark1"
				handleSave={() => {
					console.log('handle save');
				}}
			/>
		</div>
	);
}

export default PatientInfo;
