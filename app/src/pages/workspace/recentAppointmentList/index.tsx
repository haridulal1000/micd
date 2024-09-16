import React from 'react';
import { makeDateTimeString } from '../../dashboard/upcoming-appointment/upcoming-appointment-card';
import DateTimeRainbowPill from '../../../components/date-time-rainbow-pill';
import { IUpcomingAppointmentsForAWorkspace } from '../../../core/interfaces/appointment.interface';
import { IRecentPatientsResponse } from '../../../core/interfaces/patient.interface';

const RecentAppointmentList = (props: {
	upcomingAppointmentsForAWorkspace: IUpcomingAppointmentsForAWorkspace[];
	handlePatientClick: (patientId: number) => void;
}) => (
	<div className="relative  bg-white p-3 rounded-2xl w-full">
		<table className="patient-table w-full text-sm text-left text-gray-500">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" className="px-3 py-3 font-light">
						<div className="flex flex-nowrap gap-2">PATIENT ID</div>
					</th>
					<th
						scope="col"
						className="p-3 flex flex-row gap-2 items-center font-light"
					>
						<div className="flex flex-nowrap gap-2">NAME</div>
					</th>
					<th scope="col" className="px-3 py-3 font-light">
						<div className="flex flex-nowrap gap-2">
							REASON OF VISIT
						</div>
					</th>
					<th scope="col" className="px-3 py-3 font-light">
						<div className="flex flex-nowrap gap-2">PROBLEM</div>
					</th>
					<th
						scope="col"
						className="p-3 font-light whitespace-nowrap text-center"
					>
						APPOINTMENT TIME
					</th>
				</tr>
			</thead>
			<tbody>
				{props.upcomingAppointmentsForAWorkspace.map(
					(
						upcomingAppointment: IUpcomingAppointmentsForAWorkspace,
					) => (
						<tr
							key={upcomingAppointment.id}
							className="bg-white cursor-pointer"
						>
							<td className="px-3 py-3">
								{upcomingAppointment.workspace_patient_id ||
									'N/A'}
							</td>
							<td
								scope="row"
								className="flex flex-row items-center gap-3 px-3 py-3 font-medium text-gray-900 whitespace-nowrap"
								onClick={() => {
									props.handlePatientClick(
										upcomingAppointment.patient_id,
									);
								}}
							>
								<div
									style={{
										width: '50px',
										height: '50px',
										borderRadius: '50%',
										fontSize: '20px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										outline: '2px solid #E5ECFF',
										outlineColor: '#E5ECFF',
										outlineOffset: '2px',
										backgroundColor: '#E5ECFF',
									}}
								>
									{upcomingAppointment.patient_name
										.split(' ')
										.map((word) => word[0])
										.join('')}
								</div>
								{upcomingAppointment.patient_name}
							</td>
							<td className="px-3 py-3">
								{upcomingAppointment.reason_of_visit}
							</td>
							<td className="px-3 py-3">
								{upcomingAppointment.problem}
							</td>
							<td className="flex items-center justify-center">
								<DateTimeRainbowPill
									value={makeDateTimeString(
										parseInt(
											upcomingAppointment.start_at,
											10,
										),
									)}
								/>
							</td>
						</tr>
					),
				)}
			</tbody>
		</table>
	</div>
);

export default RecentAppointmentList;
