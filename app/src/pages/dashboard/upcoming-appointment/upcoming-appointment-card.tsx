import React from 'react';
import { IGetUpcomingAppointmentsFromAllWorkspaces } from '../../../core/interfaces/appointment.interface';
import DateTimeRainbowPill from '../../../components/date-time-rainbow-pill';

export interface IDetailedUpcomingAppointmentProps {
	appointments: IGetUpcomingAppointmentsFromAllWorkspaces[];
}

export const makeDateTimeString = (timestamp: number): string =>
	new Date(timestamp)
		.toLocaleString('default', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: 'numeric',
			hour12: true,
		})
		.toUpperCase();

const DetailedUpcomingAppointmentCard = (
	props: IDetailedUpcomingAppointmentProps,
) => (
	<>
		<div className="test-upcoming-appointments-card flex gap-1 mb-6">
			<p className="text-xl font-medium w-4/5">Upcoming Appointments</p>
			<p className="text-lg cursor-pointer text-primary w-1/5 text-end align-bottom">
				View all
			</p>
		</div>
		<div className="py-4">
			{props.appointments && props.appointments.length > 0 ? (
				props.appointments.map(
					(
						appointment: IGetUpcomingAppointmentsFromAllWorkspaces,
					) => (
						<div
							className="test-upcoming-appointment flex flex-row gap-2 mb-6 cursor-pointer"
							key={appointment.start_at}
						>
							<div className="flex flex-row gap-2 w-1/2 xl:w-3/5 grow">
								<img
									src="/rainbow-appointment.svg"
									height="20px"
									width="20px"
								/>
								<div className="flex flex-col overflow-hidden">
									<p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
										{appointment.patient_name}
									</p>
									<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
										{appointment.workspace_name}
									</p>
								</div>
							</div>
							<div className="p-[1px]">
								<DateTimeRainbowPill
									{...{
										value: makeDateTimeString(
											parseInt(appointment.start_at, 10),
										),
									}}
								/>
							</div>
						</div>
					),
				)
			) : (
				<div className="flex flex-col mt-8 items-center justify-items-center gap-4">
					<img src="/workspaceDefaultImage.svg" />
					<p className="font-semibold">No upcoming appointments!</p>
				</div>
			)}
		</div>
	</>
);

export default DetailedUpcomingAppointmentCard;
