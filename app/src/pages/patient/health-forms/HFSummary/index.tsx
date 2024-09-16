import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import BasicChart from './BasicChart';
import HistoryChart from './HistoryChart';
import CaseCard from './CaseCard';
import { notifyError } from '../../../../components/shared/form/toast';
import {
	IPatientCase,
	IPatientCaseResponse,
} from '../../../../core/interfaces/case.interface';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { getPatientDetail } from '../../../../core/redux/actions/patientActions';
import { getShortMonthName } from '../../../../core/utilities/dateTime';
import PatientProfile from '../../profile';
import Drawer from '../../../../components/ui/drawer';
import AddAppointmentForm, {
	defaultAppointmentFormValues,
} from '../../../appointments/add-appointment-form';
import { AppointmentInputs } from '../../../../core/services/appointment-service';
import ShareCaseModal from '../../../../components/7d-components/share-case/ShareCaseModal';
import { getPatientQuestionnaireSummary } from '../../../../core/redux/actions/questionnaireActions';
import Spinner from '../../../../components/ui/Spinner';

const HFSummary = () => {
	const dispatch = useDispatch<AppDispatch>();

	const location = useLocation();
	const urlParams = useParams();

	const [openAddAppointmentDrawer, setOpenAddAppointmentDrawer] =
		useState(false);
	const [openShareCaseModalForCase, setOpenShareCaseModalForCase] =
		React.useState<number>(0);
	const [appointmentToEdit, setAppointmentToEdit] = React.useState<
		(AppointmentInputs & { id?: number }) | undefined
	>(defaultAppointmentFormValues);

	const { loading, patientDetail } = useSelector(
		(state: RootState) => state.patient,
	);

	const { patientQuestionnaireSummary, waitingForSummary } = useSelector(
		(state: RootState) => state.questionnaire,
	);

	const handleOpenAddAppointmentDrawer = (
		e: SyntheticEvent,
		caseId: string,
	) => {
		// e.preventDefault();
		const appointmentData = {
			...defaultAppointmentFormValues,
			patientId: urlParams.patientId || '',
			case: caseId,
		};

		setAppointmentToEdit(appointmentData);
		setOpenAddAppointmentDrawer(!openAddAppointmentDrawer);
	};

	const getDetailsOfPatient = async (
		patientId: number,
		workspaceSlug: string,
	) => {
		try {
			await dispatch(
				getPatientDetail({
					patient_id: patientId,
					workspace: workspaceSlug,
				}),
			);
			dispatch(
				getPatientQuestionnaireSummary({
					patientId,
					workspaceSlug,
				}),
			);
		} catch (error: any) {
			console.error(
				'error getting patient details on summary page == ',
				error,
			);
		}
	};

	useEffect(() => {
		try {
			if (
				location.state &&
				location?.state?.workspace_slug &&
				location?.state?.patient_id
			) {
				getDetailsOfPatient(
					parseInt(location.state.patient_id, 10),
					location.state.workspace_slug,
				);
			} else if (urlParams?.workspaceSlug && urlParams?.patientId) {
				getDetailsOfPatient(
					parseInt(urlParams.patientId, 10),
					urlParams.workspaceSlug,
				);
			}
		} catch (err: any) {
			notifyError('Please make sure you are using the correct path');
			// history.back();
		}
	}, [location]);

	const groupCasesByStartDate = (patientRecentCases: IPatientCase[]) => {
		// Create an empty dictionary-like object
		const groupedData: IPatientCaseResponse = {};

		// Loop through the array and group by month and year of start_date
		patientRecentCases.forEach((item: IPatientCase) => {
			const startDate = new Date(parseInt(item.start_date, 10));
			const yearMonthKey = `${startDate.getFullYear()}-${
				startDate.getMonth() + 1
			}`;

			if (!groupedData[yearMonthKey]) {
				groupedData[yearMonthKey] = [];
			}

			groupedData[yearMonthKey].push(item);
		});

		return groupedData;
	};

	return (
		<div style={{ overflow: 'auto' }}>
			<div className="flex gap-4">
				<div className="flex-[5]">
					<div className="flex">
						<div className="flex-[5]">
							{waitingForSummary ? (
								<div
									className={
										'flex items-center justify-center h-96'
									}
								>
									<Spinner />
								</div>
							) : (
								<HistoryChart
									summary={patientQuestionnaireSummary}
								/>
							)}
						</div>
						<div className="flex-[3]">
							<BasicChart />
						</div>
					</div>
					<div className="bg-white p-4 mt-4">
						<div>Recent Cases</div>
						<>
							{loading && (
								<span className="test-loading">
									Data Loading......
								</span>
							)}

							{!loading &&
								patientDetail &&
								patientDetail?.recent_cases.length > 0 &&
								Object.keys(
									groupCasesByStartDate(
										patientDetail.recent_cases,
									),
								).map((date: string) => (
									<>
										<div className="text-primary my-4">
											{getShortMonthName(date)}
										</div>
										{patientDetail?.recent_cases.map(
											(caseDetails: IPatientCase) => (
												<CaseCard
													caseDetails={caseDetails}
													handleOpenAddAppointmentDrawer={
														handleOpenAddAppointmentDrawer
													}
													setShareCaseModalfor={(
														caseId: number,
													) =>
														setOpenShareCaseModalForCase(
															caseId,
														)
													}
												/>
											),
										)}
									</>
								))}
						</>
					</div>
				</div>

				<div className="flex-[2]">
					<PatientProfile />
				</div>
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

export default HFSummary;
