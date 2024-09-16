import React, { useEffect, useState } from 'react';
import { INextAppointment } from '../../core/interfaces/patient.interface';
import { getProperDate } from '../../core/utilities/dateTime';
import DateTimeRainbowPill from '../date-time-rainbow-pill';

export interface MiniAppointmentListProps {
	appointment: INextAppointment;
	title: string;
}

export const makeDateTimeString = (timestamp: number): string =>
	new Date(timestamp)
		.toLocaleString('default', {
			hour: '2-digit',
			minute: 'numeric',
			hour12: true,
		})
		.toUpperCase();

const MiniAppointmentList = (props: MiniAppointmentListProps) => {
	const [isPastAppointment, setIsPastAppointment] = useState(false);

	useEffect(() => {
		if (props?.title?.toLowerCase().includes('past')) {
			setIsPastAppointment(true);
		}
	}, []);

	return (
		<div className="shadow-md rounded-md mt-4 w-full mr-10 bg-white p-5 max-h-[75vh]  overflow-x-hidden ">
			<div className="test-upcoming-appointments-card flex gap-1 mb-6">
				<p className="text-sm font-medium w-4/5">{props.title}</p>
				{/* <p className="text-sm cursor-pointer text-primary w-1/5 text-end align-bottom"> */}
				{/*	View */}
				{/* </p> */}
			</div>
			<div
				className={`test-upcoming-appointment p-4 rounded-lg flex flex-row gap-2 mb-6 cursor-pointer ${
					isPastAppointment
						? 'bg-transparent border border-solid border-neutralMidnight'
						: 'bg-midnightBlue'
				}`}
			>
				<div className="flex flex-row gap-2 w-1/2 xl:w-3/5 grow">
					<img
						src={
							isPastAppointment
								? '/disabled-appointment.svg'
								: '/rainbow-appointment.svg'
						}
						height="20px"
						width="20px"
					/>
					<div className="flex flex-col overflow-hidden">
						<p
							className={`overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium ${
								isPastAppointment && 'text-neutralMidnight'
							}`}
						>
							{getProperDate(
								parseInt(props.appointment.date, 10),
							)}
						</p>
					</div>
				</div>
				<div className="">
					<DateTimeRainbowPill
						{...{
							value: makeDateTimeString(
								parseInt(props.appointment.start_at, 10),
							),
							isPast: isPastAppointment,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MiniAppointmentList;
