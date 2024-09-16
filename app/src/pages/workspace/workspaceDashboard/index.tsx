import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import { AddBtn } from '../../../components/shared/form/btn';
import 'react-calendar/dist/Calendar.css';
import Greeting from '../../../components/greeting';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import Drawer from '../../../components/ui/drawer';
import AddAppointmentForm from '../../appointments/add-appointment-form';
import { AppointmentInputs } from '../../../core/services/appointment-service';
import { getUpcomingAppointmentsFromAWorkspace } from '../../../core/redux/actions/workspaceActions';
import RecentAppointmentList from '../recentAppointmentList';
import { IUpcomingAppointmentsForAWorkspace } from '../../../core/interfaces/appointment.interface';
import {
	getAllPatients,
	getRecentPatients,
} from '../../../core/redux/actions/patientActions';
import RecentPatients from '../../../components/patients/RecentPatients';
import {
	IPatient,
	IRecentPatientsResponse,
} from '../../../core/interfaces/patient.interface';
import DentistFormsService, {
	DentistFormCheckResponse,
} from '../../../core/services/dentist-forms-service';
import { setSelectedPatient } from '../../../core/redux/reducers/patientSlice';

interface ICalendarCustomStyle {
	date: Date;
	view: string;
}

const ListUpcomingAppointmentsTable = (props: {
	upcomingAppointmentsForAWorkspace:
		| IUpcomingAppointmentsForAWorkspace[]
		| null;
	handleOpenAddAppointmentDrawer: (e: SyntheticEvent) => void;
	handlePatientClick: (patientId: number) => void;
}) => (
	<div className="mr-10 flex h-3/4 justify-center gap-5  w-full bg-white ">
		{props.upcomingAppointmentsForAWorkspace &&
		props.upcomingAppointmentsForAWorkspace.length !== 0 ? (
			<div className="w-full">
				<div className="flex justify-between pt-10 px-5">
					<h4 className="font-semibold">Upcoming Appointments</h4>
					<AddBtn
						onClick={(e: SyntheticEvent) =>
							props.handleOpenAddAppointmentDrawer(e)
						}
						classes="px-8 py-2"
					>
						Add Appointment
					</AddBtn>
				</div>
				<RecentAppointmentList
					upcomingAppointmentsForAWorkspace={
						props.upcomingAppointmentsForAWorkspace
					}
					handlePatientClick={props.handlePatientClick}
				/>
			</div>
		) : (
			<div className="flex flex-col w-2/5  h-64 gap-5 items-center justify-center">
				<img
					src="/workspaceDefaultImage.svg"
					alt="workspace default image"
				/>
				<p>No Appointments yet!</p>
				<AddBtn
					onClick={(e: SyntheticEvent) =>
						props.handleOpenAddAppointmentDrawer(e)
					}
					classes="px-8 py-2"
				>
					Add Appointment
				</AddBtn>
			</div>
		)}
	</div>
);

const WorkspaceDashboard = () => {
	const navigate = useNavigate();

	const dispatch: AppDispatch = useDispatch();

	const [value, setValue] = useState(new Date());
	const [dentistCheckedResponse, setDentistCheckedResponse] = useState<
		DentistFormCheckResponse | undefined
	>();
	const [unitChecked] = useState<boolean>(false);
	const calendarRef = useRef<typeof Calendar | null>(null);
	const [openAddAppointmentDrawer, setOpenAddAppointmentDrawer] =
		useState(false);
	const [appointmentToEdit, setAppointmentToEdit] = React.useState<
		(AppointmentInputs & { id: number }) | undefined
	>();

	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);
	const { workspaceInfo, upcomingAppointmentsForAWorkspace } = useSelector(
		(state: RootState) => state.workspace,
	);
	const { recentPatientsDetail, allPatientsInfo, selectedPatient } =
		useSelector((state: RootState) => state.patient);

	useEffect(() => {
		if (workspaceInfo?.slug) {
			try {
				dispatch(
					getUpcomingAppointmentsFromAWorkspace({
						workspaceSlug: workspaceInfo.slug,
					}),
				);
				dispatch(getAllPatients({ workspace: workspaceInfo.slug }));
				dispatch(getRecentPatients({ slug: workspaceInfo.slug }));
			} catch (error: any) {
				console.log('error getting data for upcoming appp == ', error);
			}
		}
	}, [workspaceInfo]);

	const tileClassName = ({ date, view }: ICalendarCustomStyle) => {
		if (view === 'month' && date.getDay() === 0) {
			return 'sunday-tile';
		}
		return null;
	};

	const handleTodayDate = () => {
		const calendar = calendarRef.current as typeof Calendar;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		calendar?.setActiveStartDate(new Date(), 'next');
	};

	const handleOpenAddAppointmentDrawer = () => {
		// e.preventDefault();
		setAppointmentToEdit(undefined);
		setOpenAddAppointmentDrawer(!openAddAppointmentDrawer);
	};

	const handlePatientClick = (patientId: number) => {
		const selectedPatientInPatientsList = allPatientsInfo?.find(
			(patient: IPatient) => patient.id === patientId,
		);
		dispatch(setSelectedPatient(selectedPatientInPatientsList));

		// needed navigate url sample: http://localhost:3000/workspace/0044eab0-7a6b-4656-8485-8061fe9c2943/patients/228/summary

		navigate(
			`/workspace/${workspaceInfo?.slug}/patients/${patientId}/summary`,
			{
				state: {
					workspace_slug: workspaceInfo?.slug,
					patient_id: patientId,
				},
			},
		);
	};

	React.useEffect(() => {
		if (workspaceInfo?.slug) {
			DentistFormsService.getDentistFormCheck(workspaceInfo?.slug).then(
				(res) => {
					setDentistCheckedResponse(res);
				},
			);
		}
	}, [workspaceInfo?.slug]);

	return (
		<div className="ml-4c pl-5 pr-10 z-0 flex flex-row h-full">
			<div className="w-3/4 test-appointment-card pr-8">
				{userProfile && <Greeting userProfile={userProfile} />}
				<ListUpcomingAppointmentsTable
					handleOpenAddAppointmentDrawer={
						handleOpenAddAppointmentDrawer
					}
					upcomingAppointmentsForAWorkspace={
						upcomingAppointmentsForAWorkspace
					}
					handlePatientClick={handlePatientClick}
				/>
			</div>
			<div className="w-1/4  mt-8 test-calendar">
				<div className="grid grid-cols-2">
					<p>Calendar</p>
					<div
						className="justify-self-end text-primary text-sm cursor-pointer hover:font-semibold"
						onClick={handleTodayDate}
					>
						Today
					</div>
				</div>
				<Calendar
					ref={calendarRef}
					value={value}
					calendarType={'US'}
					tileClassName={tileClassName}
				/>

				{dentistCheckedResponse && (
					<React.Fragment>
						<div className=" mt-5 grid grid-cols-2 test-unit-checklist">
							<p>Dental Unit Checklist</p>
							<Link
								to={`/workspace/${workspaceInfo?.slug}/doctor-check`}
							>
								<p className="justify-self-end text-sm text-primary cursor-pointer hover:font-semibold">
									Check Now
								</p>
							</Link>
						</div>

						{dentistCheckedResponse?.day_start.submitted && (
							<Link
								to={`/workspace/${workspaceInfo?.slug}/doctor-check/daily-evaluation-history`}
								className={'cursor-pointer text-grayText'}
							>
								<div className=" mt-4 p-3 flex flex-row items-center gap-2 bg-primaryPastelDream rounded-md">
									<img
										src="/checkedIcon.svg"
										alt="checked icon"
									/>
									<p className="text-sm flex flex-row items-center gap-2">
										<span className={'text-xs'}>
											Checked
										</span>
										<span className="ml-3 text-xs">
											{moment(
												Number(
													dentistCheckedResponse
														?.day_start
														.submission_datetime,
												),
											).format('DD/MM/YYYY')}
										</span>
										|
										<span className="text-xs">
											{moment(
												Number(
													dentistCheckedResponse
														?.day_start
														.submission_datetime,
												),
											).format('hh:mm A')}
										</span>
									</p>
								</div>
							</Link>
						)}

						{!dentistCheckedResponse?.day_start.submitted && (
							<div className=" mt-4 p-3 flex flex-row items-center gap-2 bg-primaryRed rounded-md">
								<img className="" src="/info.svg" alt="info" />
								<p className="text-sm text-accent">
									Please go through your daily checklist
								</p>
							</div>
						)}
					</React.Fragment>
				)}

				<div className=" mt-4 grid grid-cols-2 test-recent-patients">
					<p>Recent Patients</p>
					<p
						onClick={() =>
							navigate(
								`/workspace/${workspaceInfo?.slug}/patients`,
							)
						}
						className="justify-self-end text-sm text-primary cursor-pointer hover:font-semibold"
					>
						All Patients
					</p>
				</div>
				{recentPatientsDetail && recentPatientsDetail.length > 0 ? (
					recentPatientsDetail.map(
						(recentPatient: IRecentPatientsResponse) => (
							<RecentPatients
								handleRecentPatientClik={handlePatientClick}
								recentPatientDetails={recentPatient}
							/>
						),
					)
				) : (
					<div className=" mt-5 flex flex-col items-center gap-2">
						<img src="/folder.svg" alt="folder icon" />
						<p>No recent patients</p>
					</div>
				)}
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
		</div>
	);
};

export default WorkspaceDashboard;
