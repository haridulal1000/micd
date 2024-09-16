import { createSlice } from '@reduxjs/toolkit';
import {
	IAddPatientNoteResponse,
	IAllPatientsState,
	ICreatePatientInitialState,
	IPatient,
} from '../../interfaces/patient.interface';
import {
	changePatientAvatar,
	createPatient,
	getAllCasesOfPatient,
	getAllPatients,
	getPatientDetail,
	getPatientNotes,
	getRecentPatients,
	updatePatient,
} from '../actions/patientActions';

const initialState: IAllPatientsState = {
	loading: false,
	error: null,
	success: false,
	allPatientsInfo: null,
	recentPatientsDetail: [],
	pageInfo: null,
	patientDetail: null,
	selectedPatient: null,
	allCasesOfPatient: null,
	patientNotes: [],
};

const patientSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		setSelectedPatient: (state, action) => {
			state.selectedPatient = action.payload;
		},
		setPatientAvatarChange: (state, action) => {
			state.patientDetail = state.patientDetail && {
				...state.patientDetail,
				avatar_url: action.payload.avatar_url,
			};
		},
		setAppointmentToPatient: (state, action) => {
			state.allPatientsInfo =
				state.allPatientsInfo &&
				state.allPatientsInfo.map((patient: IPatient) => {
					if (patient.id === action.payload.patinetId) {
						return {
							...patient,
							next_appointment: action.payload.appointmentDetail,
						};
					}
					return patient;
				});
		},
		udpatePatientNotes: (state, action) => {
			switch (action.payload.type) {
				case 'ADD':
					state.patientNotes = [
						...state.patientNotes,
						{ ...action.payload.data },
					];
					break;
				case 'DELETE':
					state.patientNotes = state.patientNotes.filter(
						(notes: IAddPatientNoteResponse) =>
							notes.id !== action.payload.id,
					);
				default:
					break;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllPatients.pending, (state: IAllPatientsState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			getAllPatients.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.allPatientsInfo = action.payload.results;
				state.pageInfo = action.payload.info;
			},
		);
		builder.addCase(
			getAllPatients.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.allPatientsInfo = null;
			},
		);
		builder.addCase(
			getRecentPatients.pending,
			(state: IAllPatientsState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getRecentPatients.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.recentPatientsDetail = action.payload;
			},
		);
		builder.addCase(
			getRecentPatients.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.recentPatientsDetail = [];
			},
		);
		builder.addCase(
			createPatient.pending,
			(state: ICreatePatientInitialState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			createPatient.fulfilled,
			(state: ICreatePatientInitialState) => {
				state.loading = false;
				state.error = null;
				state.success = true;
			},
		);
		builder.addCase(
			createPatient.rejected,
			(state: ICreatePatientInitialState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
			},
		);

		builder.addCase(
			getPatientDetail.pending,
			(state: IAllPatientsState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getPatientDetail.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.patientDetail = action.payload;
			},
		);
		builder.addCase(
			getPatientDetail.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
			},
		);
		// get patient notes
		builder.addCase(getPatientNotes.pending, (state: IAllPatientsState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			getPatientNotes.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.patientNotes = action.payload;
			},
		);
		builder.addCase(
			getPatientNotes.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
			},
		);

		builder.addCase(
			changePatientAvatar.pending,
			(state: IAllPatientsState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			changePatientAvatar.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.patientDetail = state.patientDetail && {
					...state.patientDetail,
					avatar_url: action.payload.avatar_url,
				};
			},
		);
		builder.addCase(
			changePatientAvatar.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
			},
		);

		builder.addCase(updatePatient.pending, (state: IAllPatientsState) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			updatePatient.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
			},
		);
		builder.addCase(
			updatePatient.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
			},
		);

		builder.addCase(
			getAllCasesOfPatient.pending,
			(state: IAllPatientsState) => {
				state.loading = true;
				state.error = null;
			},
		);
		builder.addCase(
			getAllCasesOfPatient.fulfilled,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.allCasesOfPatient = action.payload || null;
			},
		);
		builder.addCase(
			getAllCasesOfPatient.rejected,
			(state: IAllPatientsState, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
				state.success = false;
				state.allCasesOfPatient = null;
			},
		);
	},
});

export const {
	setSelectedPatient,
	setPatientAvatarChange,
	setAppointmentToPatient,
	udpatePatientNotes,
} = patientSlice.actions;
export default patientSlice.reducer;
