import React from 'react';
import { useSelector } from 'react-redux';
import { EventClickArg, EventSourceInput } from '@fullcalendar/core';
import moment from 'moment';
import Drawer from '../../components/ui/drawer';
import { AddBtn } from '../../components/shared/form/btn';
import { RootState } from '../../core/redux/store/store';
import AppointmentLoader from './appointment-loader';
import AppointmentDetailsDialog from './appointment-details-dialog';
import AddAppointmentForm from './add-appointment-form';
import FullPageCalender from '../../components/calendars/full-page-calender';
import { AppointmentInputs } from '../../core/services/appointment-service';
import EventContent from '../../components/appointments/EventContent';

const AppointmentsTodayPage = () => {
	const [openAddAppointmentDrawer, setOpenAddAppointmentDrawer] =
		React.useState(false);
	const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<
		number | undefined
	>();
	const [openAppointmentDialog, setOpenAppointmentDialog] =
		React.useState(true);
	const [toEditAppointmentId, setToEditAppointmentId] = React.useState<
		number | undefined
	>();
	const [appointmentToEdit, setAppointmentToEdit] = React.useState<
		(AppointmentInputs & { id: number }) | undefined
	>();

	const appointmentIds = useSelector(
		(state: RootState) => state.appointments.allId,
	);
	const appointments = useSelector(
		(state: RootState) => state.appointments.byIds,
	);

	const handleOpenAddAppointmentDrawer = () => {
		setOpenAddAppointmentDrawer(!openAddAppointmentDrawer);
	};

	const buildEvent = React.useCallback(
		(): EventSourceInput =>
			appointmentIds.map((appointmentId) => {
				const appointment = appointments[appointmentId];
				const startDateInLocal = moment(Number(appointment.start_at))
					.local()
					.toDate();
				const endDateInLocal = moment(Number(appointment.end_at))
					.local()
					.toDate();

				return {
					title: appointment.patient_name,
					start: startDateInLocal,
					end: endDateInLocal,
					id: appointment.id.toString(),
				};
			}),
		[appointmentIds, appointments],
	);

	const handleEventClick = (props: EventClickArg) => {
		const clickedAppointmentId = Number(props.event.id);
		setSelectedAppointmentId(clickedAppointmentId);
		setOpenAppointmentDialog(true);
	};

	const handleEditAppointment = (appointmentId: number) => {
		setToEditAppointmentId(appointmentId);
		setOpenAddAppointmentDrawer(true);
		setOpenAppointmentDialog(false);
	};

	React.useEffect(() => {
		const toEditAppointment = toEditAppointmentId
			? appointments[toEditAppointmentId]
			: undefined;

		if (toEditAppointment) {
			setAppointmentToEdit({
				id: toEditAppointment.id,
				endAt: moment(Number(toEditAppointment.end_at)).format(
					'HH:mm:ss',
				),
				startAt: moment(Number(toEditAppointment.start_at)).format(
					'HH:mm:ss',
				),
				date: moment(Number(toEditAppointment.start_at)).toDate(),
				patientId: String(toEditAppointment.patient_id),
				problem: toEditAppointment.problem,
				case: toEditAppointment.case_name,
				reasonOfVisit: toEditAppointment.reason_of_visit,
			});
		}
	}, [toEditAppointmentId]);

	return (
		<AppointmentLoader>
			<div className="ml-4 p-5 pr-10 z-0 flex flex-row relative h-[calc(100%-4rem)]">
				<div
					className={
						'bg-white p-4 rounded-xl overflow-hidden h-full w-full'
					}
				>
					<FullPageCalender
						events={buildEvent()}
						eventClick={handleEventClick}
						eventContent={({ event: { id }, isPast }) => (
							<EventContent id={Number(id)} isPast={isPast} />
						)}
					/>
				</div>
				<AddBtn
					classes="px-8 py-2 fixed bottom-6 right-5 z-10"
					onClick={handleOpenAddAppointmentDrawer}
				>
					Add Appointments
				</AddBtn>
			</div>

			<AppointmentDetailsDialog
				open={openAppointmentDialog}
				setOpen={setOpenAppointmentDialog}
				appointmentId={selectedAppointmentId}
				handleEditAppointment={handleEditAppointment}
			/>

			<Drawer
				isOpen={openAddAppointmentDrawer}
				setOpen={setOpenAddAppointmentDrawer}
			>
				<AddAppointmentForm
					isUpdate={!!toEditAppointmentId}
					defaultValues={appointmentToEdit}
					handleCloseDrawer={() => {
						setAppointmentToEdit(undefined);
						setToEditAppointmentId(undefined);
						setOpenAddAppointmentDrawer(false);
					}}
				/>
			</Drawer>
		</AppointmentLoader>
	);
};

export default AppointmentsTodayPage;
