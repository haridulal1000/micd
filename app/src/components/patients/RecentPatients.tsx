import React from 'react';
import { IRecentPatientsResponse } from '../../core/interfaces/patient.interface';
import {
	getDateForRecentPatients,
	getTimeForRecentPatients,
} from '../../core/utilities/dateTime';

const RecentPatients = (props: {
	recentPatientDetails: IRecentPatientsResponse;
	handleRecentPatientClik: (patientId: number) => void;
}) => (
	<div
		className="flex flex-row justify-between mb-6 cursor-pointer"
		key={props.recentPatientDetails.id}
		onClick={() =>
			props.handleRecentPatientClik(props.recentPatientDetails.id)
		}
	>
		<div className="flex flex-col overflow-hidden">
			<p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
				{props.recentPatientDetails.first_name}{' '}
				{props.recentPatientDetails.last_name}
			</p>
			<p className="overflow-hidden text-ellipsis text-neutralMidnight  whitespace-nowrap text-sm">
				{props.recentPatientDetails.workspace_patient_id || 'N/A'}
			</p>
		</div>
		<div className="flex flex-col overflow-hidden">
			<p className="overflow-hidden text-ellipsis text-neutralMidnight whitespace-nowrap text-sm font-medium">
				{getDateForRecentPatients(
					+props.recentPatientDetails.updated_at,
				)}
			</p>
			<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
				{getTimeForRecentPatients(
					+props.recentPatientDetails.updated_at,
				)}
			</p>
		</div>
	</div>
);

export default RecentPatients;
