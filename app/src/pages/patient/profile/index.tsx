import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import {
	getPatientDetail,
	getPatientNotes,
	updatePatient,
} from '../../../core/redux/actions/patientActions';
import useUpdatePatientFormValidator from '../../../core/utilities/hooks/useUpdatePatientFormValidator';
import { notifySuccess } from '../../../components/shared/form/toast';
import { getFullName } from '../../../core/utilities/name';
import PatientNameEditForm from './PatientNameEditForm';
import PatientDetailEditForm from './PatientDetailEditForm';
import UserAvatar from '../../../components/UserAvatar';
import RemarksBox from '../../7d/remarks-box';
import {
	IAddPatientNoteResponse,
	INotes,
} from '../../../core/interfaces/patient.interface';
import {
	addPatientNoteService,
	deletePatientNoteService,
} from '../../../core/services/patient.service';
import { udpatePatientNotes } from '../../../core/redux/reducers/patientSlice';
import MiniAppointmentList from '../../../components/appointments/MiniAppointmentList';

const PatientProfile = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const { patientDetail, patientNotes } = useSelector(
		(state: RootState) => state.patient,
	);

	const [showNameEditor, setShowNameEditor] = useState<boolean>(false);

	const [firstLoad, setFirstLoad] = useState(true);
	const { formErrors, clearState, runValidation } =
		useUpdatePatientFormValidator();

	useEffect(() => {
		if (selectedPatient && workspaceInfo) {
			dispatch(
				getPatientDetail({
					patient_id: selectedPatient.id,
					workspace: workspaceInfo.slug,
				}),
			);
			dispatch(
				getPatientNotes({
					patientId: selectedPatient.id,
					workspaceSlug: workspaceInfo.slug,
				}),
			);
		}
	}, []);

	// TODO: refactor this to use states to update and manage changes .
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
			(firstName ||
				lastName ||
				age ||
				sex ||
				contactNumber ||
				email ||
				address) &&
			selectedPatient &&
			workspaceInfo
		) {
			const response = await dispatch(
				updatePatient({
					patient_id: selectedPatient.id,
					workspace: workspaceInfo.slug,
					first_name: firstName,
					last_name: lastName,
					age: Number(age),
					sex,
					contact_number: contactNumber,
					email,
					address,
				}),
			);

			if (response.type.includes('fulfilled')) {
				notifySuccess('Patient successfully updated!');
				dispatch(
					getPatientDetail({
						patient_id: selectedPatient.id,
						workspace: workspaceInfo.slug,
					}),
				);
			}
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

	function addPatientNote(text: string): void {
		if (selectedPatient && workspaceInfo) {
			addPatientNoteService(
				selectedPatient.id,
				workspaceInfo.slug,
				text,
			).then((response: AxiosResponse<IAddPatientNoteResponse>) => {
				toast.success('Patient Note Added successfully');
				dispatch(
					udpatePatientNotes({
						type: 'ADD',
						data: response.data,
					}),
				);
			});
		} else {
			toast.error('Patient/Workspace not selected');
		}
	}

	function deleteComment(commentId: number): void {
		if (workspaceInfo) {
			deletePatientNoteService(commentId, workspaceInfo.slug).then(
				(_response: AxiosResponse<IAddPatientNoteResponse>) => {
					toast.success('Patient Note Deleted successfully');
					dispatch(
						udpatePatientNotes({
							type: 'DELETE',
							id: commentId,
						}),
					);
				},
			);
		} else {
			toast.error('Workspace not selected');
		}
	}

	return (
		<>
			<div className=" bg-white shadow-md rounded-md p-5 ">
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
								<p className="font-medium text-2xl caret-transparent break-all">
									{getFullName(
										patientDetail?.first_name ?? '',
										patientDetail?.last_name ?? '',
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
				<div className="mt-5 test-patient-edit-form">
					<PatientDetailEditForm
						patientDetail={patientDetail}
						handleChange={handleChange}
						handleUpdatePatient={handleUpdatePatient}
						handleSelectChange={handleSelectChange}
						formErrors={formErrors}
					/>
				</div>
			</div>
			{patientDetail?.next_appointment && (
				<MiniAppointmentList
					title="Upcoming Appointment"
					appointment={patientDetail.next_appointment}
				/>
			)}

			{patientDetail?.last_appointment && (
				<MiniAppointmentList
					title="Past Appointment"
					appointment={patientDetail.last_appointment}
				/>
			)}
			<RemarksBox
				title="Notes/Remarks"
				handleSave={(comment: string) => {
					addPatientNote(comment);
				}}
				remarks={
					patientNotes?.length > 0
						? patientNotes.map(
								(note: IAddPatientNoteResponse) =>
									({
										id: note.id,
										text: note.text,
										updated_at: note.updated_at,
									} as unknown as INotes),
						  )
						: []
				}
				deleteButton={true}
				handleDelete={(commentId: number) => {
					deleteComment(commentId);
				}}
			/>
		</>
	);
};

export default PatientProfile;
