import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CaseCard from '../HFSummary/CaseCard';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { getFullName } from '../../../../core/utilities/name';
import { getAllCasesOfPatient } from '../../../../core/redux/actions/patientActions';
import { IPatientCase } from '../../../../core/interfaces/case.interface';
import { getShortMonthName } from '../../../../core/utilities/dateTime';
import PatientProfile from '../../profile';
import Drawer from '../../../../components/ui/drawer';
import AddAppointmentForm, {
	defaultAppointmentFormValues,
} from '../../../appointments/add-appointment-form';
import { AppointmentInputs } from '../../../../core/services/appointment-service';
import ShareCaseModal from '../../../../components/7d-components/share-case/ShareCaseModal';

const HFCaseLibrary = () => {
	const dispatch: AppDispatch = useDispatch();
	const urlParams = useParams();

	const [openAddAppointmentDrawer, setOpenAddAppointmentDrawer] =
		useState(false);
	const [openShareCaseModalForCase, setOpenShareCaseModalForCase] =
		React.useState<number>(0);
	const [appointmentToEdit, setAppointmentToEdit] = React.useState<
		(AppointmentInputs & { id?: number }) | undefined
	>(defaultAppointmentFormValues);

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const { selectedPatient, allCasesOfPatient, pageInfo, loading } =
		useSelector((state: RootState) => state.patient);

	useEffect(() => {
		(async () => {
			if (selectedPatient && workspaceInfo) {
				try {
					await dispatch(
						getAllCasesOfPatient({
							patientId: selectedPatient.id,
							workspaceId: workspaceInfo.slug,
						}),
					);
				} catch (error: any) {
					console.log(
						'error getting cases in HF case page = ',
						error,
					);
				}
			}
		})();
	}, [selectedPatient, workspaceInfo]);

	const handleOpenAddAppointmentDrawer = (
		e: SyntheticEvent,
		caseId: string,
	) => {
		const appointmentData = {
			...defaultAppointmentFormValues,
			patientId: urlParams.patientId || '',
			case: caseId,
		};

		setAppointmentToEdit(appointmentData);
		setOpenAddAppointmentDrawer(!openAddAppointmentDrawer);
	};

	return (
		<div className="flex gap-2">
			<div className="bg-backgroundGray flex-[5] p-4">
				{selectedPatient && (
					<p className="font-extrabold">
						{getFullName(
							selectedPatient?.first_name,
							selectedPatient?.last_name,
						)}{' '}
						: Case Library
					</p>
				)}
				<>
					{loading && (
						<span className="test-loading">Data Loading......</span>
					)}

					{allCasesOfPatient &&
						Object.entries(allCasesOfPatient).length > 0 &&
						Object.keys(allCasesOfPatient).map((date: string) => (
							<>
								<div className="text-primary my-4">
									{getShortMonthName(date)}
								</div>
								{allCasesOfPatient[date].map(
									(caseDetails: IPatientCase) => (
										<CaseCard
											setShareCaseModalfor={(
												caseId: number,
											) =>
												setOpenShareCaseModalForCase(
													caseId,
												)
											}
											caseDetails={caseDetails}
											handleOpenAddAppointmentDrawer={
												handleOpenAddAppointmentDrawer
											}
										/>
									),
								)}
							</>
						))}
				</>
			</div>
			<div className="flex-[2]">
				<PatientProfile />
			</div>

			<Drawer
				isOpen={openAddAppointmentDrawer}
				setOpen={setOpenAddAppointmentDrawer}
			>
				<AddAppointmentForm
					isUpdate={false}
					defaultValues={appointmentToEdit}
					handleCloseDrawer={() => {
						setAppointmentToEdit(undefined);
						setOpenAddAppointmentDrawer(false);
					}}
				/>
			</Drawer>
			<ShareCaseModal
				caseId={openShareCaseModalForCase}
				open={!!openShareCaseModalForCase}
				setOpen={() => setOpenShareCaseModalForCase(0)}
			/>
		</div>
	);
};
export default HFCaseLibrary;
