import React from 'react';
import { PencilLine, Trash2, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Avatar from '../../components/ui/avatar';
import Divider from '../../components/ui/divider';
import { RootState } from '../../core/redux/store/store';
import CancelAppointmentDialog from './cancel-appointment-dialog';
import Modal from '../../components/ui/modal';
import DateTimeRainbowPill from '../../components/date-time-rainbow-pill';

interface AppointmentDetailsDialogProps {
	appointmentId?: number;
	open: boolean;
	setOpen: (open: boolean) => void;
	handleEditAppointment: (id: number) => void;
}

const AppointmentDetailsList = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => (
	<div className={'flex mb-4'}>
		<div className="opacity-50 text-zinc-800 text-base font-normal leading-normal w-32">
			{label}
		</div>
		<div className="text-zinc-800 text-base font-normal leading-normal flex-1 flex items-start">
			{value}
		</div>
	</div>
);

const AppointmentDetailsDialog = ({
	appointmentId,
	open,
	setOpen,
	handleEditAppointment,
}: AppointmentDetailsDialogProps) => {
	if (!appointmentId) return null;
	const [openCancelAppointmentDialog, setOpenCancelAppointmentDialog] =
		React.useState(false);

	const appointment = useSelector(
		(state: RootState) => state.appointments.byIds[appointmentId],
	);

	return (
		<Modal
			open={open}
			onRequestClose={() => setOpen(false)}
			className={'lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'}
		>
			<div className="bg-white rounded-2xl shadow absolute p-4 max-w-3xl min-w-full ">
				<div className={'flex items-end justify-end gap-4'}>
					{!appointment.cancellation_note && (
						<React.Fragment>
							<Trash2
								className={'text-zinc-500 cursor-pointer '}
								onClick={() =>
									setOpenCancelAppointmentDialog(true)
								}
							/>
							<PencilLine
								onClick={() =>
									handleEditAppointment(appointmentId)
								}
								className={'text-zinc-500 cursor-pointer'}
							/>
						</React.Fragment>
					)}

					<X
						className={'text-zinc-500 cursor-pointer'}
						onClick={() => setOpen(false)}
					/>
				</div>

				<div className={'flex items-center gap-4'}>
					<Avatar
						fullName={appointment.patient_name}
						image={appointment.patient_avatar_url}
					/>
					<p className={'text-zinc-800 text-lg font-medium"'}>
						{appointment.patient_name}
					</p>
				</div>

				<Divider />

				{appointment.cancellation_note && (
					<div className={'my-3'}>
						<div className="text-zinc-800 text-base font-medium leading-normal">
							Cancellation Note
						</div>

						<div className="w-full px-4 py-3 bg-blue-50 rounded-lg flex-col justify-start items-start gap-3.5 inline-flex">
							<div className=" text-zinc-800 text-sm font-normal leading-normal">
								{appointment.cancellation_note}
							</div>
						</div>
					</div>
				)}

				<div>
					<AppointmentDetailsList
						label={'Date'}
						value={moment(Number(appointment.start_at)).format(
							'dddd D, MMMM YY',
						)}
					/>

					<div className={'flex mb-4'}>
						<div className="opacity-50 text-zinc-800 text-base font-normal leading-normal w-32 ">
							Time
						</div>

						<DateTimeRainbowPill
							className={'flex-1'}
							value={`${moment(
								Number(appointment.start_at),
							).format('hh:mm a')} - ${moment(
								Number(appointment.end_at),
							).format('hh:mm a')}`}
						/>
					</div>
					<AppointmentDetailsList
						label={'Problem'}
						value={appointment.problem}
					/>
					<AppointmentDetailsList
						label={'Reason of visit'}
						value={appointment.reason_of_visit}
					/>

					{appointment.case_name && (
						<AppointmentDetailsList
							label={'Case'}
							value={appointment.case_name}
						/>
					)}
				</div>

				{!appointment.cancellation_note && (
					<div
						className="text-red-600 text-base font-normal leading-normal cursor-pointer my-4"
						onClick={() => setOpenCancelAppointmentDialog(true)}
					>
						Cancel appointment
					</div>
				)}
				<CancelAppointmentDialog
					appointment={appointment}
					open={openCancelAppointmentDialog}
					setOpen={setOpenCancelAppointmentDialog}
				/>
			</div>
		</Modal>
	);
};
export default AppointmentDetailsDialog;
