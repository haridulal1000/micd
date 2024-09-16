import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IAppointment } from '../../core/interfaces/appointment.interface';
import { RootState } from '../../core/redux/store/store';
import AppointmentService from '../../core/services/appointment-service';
import SecondaryBtn from '../../components/shared/form/btn';
import { AppointmentActions } from '../../core/redux/reducers/appointmentSlice';
import { Button } from '../../components/ui/button';
import Modal from '../../components/ui/modal';

type CancelAppointmentDialogProps = {
	appointment: IAppointment;
	open: boolean;
	setOpen: (open: boolean) => void;
};

const CancelAppointmentDialog: React.FC<CancelAppointmentDialogProps> = ({
	appointment,
	open,
	setOpen,
}) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [cancelReason, setCancelReason] = React.useState('');
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const dispatch = useDispatch();

	const cancelAppointment = async () => {
		setIsLoading(true);
		const cancelled = await AppointmentService.cancelAppointment(
			appointment.id,

			currentWorkspaceSlug ?? '',
			cancelReason,
		);
		dispatch(
			AppointmentActions.updateCancelledAppointment({
				cancellation_note: cancelled.cancellation_note,
				id: cancelled.id,
			}),
		);

		if (cancelled) setOpen(false);
		setIsLoading(false);
	};

	return (
		<Modal
			open={open}
			className={
				'bg-white shadow-2xl rounded-lg p-4 sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
			}
			onRequestClose={() => setOpen(false)}
		>
			<h1 className="text-zinc-800 text-2xl font-medium leading-9 text-center">
				Cancel Appointment
			</h1>
			<p className={'text-center my-4'}>
				Please state your reasons for the cancellation of your
				appointment with{' '}
				<span className={'font-semibold'}>
					{appointment.patient_name}
				</span>{' '}
				on{' '}
				<span className={'font-semibold'}>
					{moment(Number(appointment.date)).format('Do MMM')}
				</span>
				,{' '}
				<span className={'font-semibold'}>{`${moment(
					Number(appointment.start_at),
				).format('hh:mm a')} - ${moment(
					Number(appointment.end_at),
				).format('hh:mm a')}`}</span>
			</p>

			<textarea
				placeholder={'Write a note ✍️'}
				className="micd-input w-full h-32 border border-gray-300 rounded-md p-2 "
				value={cancelReason}
				onChange={(e) => setCancelReason(e.target.value)}
			/>
			<div className={'flex items-center jus'}>
				<Button
					onClick={cancelAppointment}
					disabled={!cancelReason || isLoading}
				>
					{isLoading ? 'Cancelling' : 'Cancel Appointment'}
				</Button>

				<SecondaryBtn onClick={() => setOpen(false)}>
					Cancel
				</SecondaryBtn>
			</div>
		</Modal>
	);
};

export default CancelAppointmentDialog;
