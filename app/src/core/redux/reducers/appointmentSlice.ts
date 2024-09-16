import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IAppointment,
	IAppointmentMutResponse,
} from '../../interfaces/appointment.interface';

export interface AppointmentState {
	byIds: Record<number, IAppointment>;
	allId: number[];
}

const initialState: AppointmentState = {
	allId: [],
	byIds: {},
};

const appointmentSlice = createSlice({
	name: 'appointments',
	initialState,
	reducers: {
		addAppointment: (
			state: AppointmentState,
			action: PayloadAction<IAppointmentMutResponse>,
		) => {
			state.byIds[action.payload.id] = {
				id: action.payload.id,
				patient_id: action.payload.patient_id,
				workspace_patient_id:
					action.payload.workspace_patient_id || 'N/A',
				patient_name: `${action.payload.first_name} ${action.payload.last_name}`,
				patient_avatar_url: action.payload.avatar_url,
				date: action.payload.date,
				start_at: action.payload.start_at,
				end_at: action.payload.end_at,
				problem: action.payload.problem,
				reason_of_visit: action.payload.reason_of_visit,
				status: action.payload.status,
				cancellation_note: action.payload.cancellation_note,
				case_id: action.payload.case_id
					? String(action.payload.case_id)
					: '',
				case_name: action.payload.case_id
					? String(action.payload.case_id)
					: '',
			};

			if (!state.allId.includes(action.payload.id))
				state.allId.push(action.payload.id);
		},
		addAllAppointments: (
			state: AppointmentState,
			action: PayloadAction<IAppointment[]>,
		) => {
			state.allId = [];
			state.byIds = {};

			action.payload.forEach((appointment) => {
				state.byIds[appointment.id] = appointment;
				state.allId.push(appointment.id);
			});
		},
		updateCancelledAppointment: (
			state: AppointmentState,
			action: PayloadAction<{ cancellation_note: string; id: number }>,
		) => {
			const appointment = state.byIds[action.payload.id];
			appointment.cancellation_note = action.payload.cancellation_note;
		},
	},
});

export const AppointmentActions = appointmentSlice.actions;

export default appointmentSlice.reducer;
