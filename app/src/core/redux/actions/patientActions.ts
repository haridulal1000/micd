import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	IAddPatientNoteResponse,
	IChangePatientAvatarDets,
	IChangePatientAvatarResponse,
	ICreatePatientDets,
	ICreatePatientResponse,
	IDeletePatientAvatarDets,
	IGetAllPatientsResponse,
	IGetPatientDetailDets,
	IGetPatientDetailResponse,
	IPatientRequest,
	IRecentPatientsResponse,
	IUpdatePatientDets,
	IUpdatePatientResponse,
	IWorkspaceSlug,
} from '../../interfaces/patient.interface';
import patientService, {
	getAllCasesOfPatientService,
	getAllPatientsService,
	getPatientNotesService,
} from '../../services/patient.service';
import { IPatientCaseResponse } from '../../interfaces/case.interface';

export const getPatientDetail = createAsyncThunk<
	IGetPatientDetailResponse,
	IGetPatientDetailDets
>(
	'patientDetail',
	async (requestBody: IGetPatientDetailDets, { rejectWithValue }) => {
		try {
			const res: any = await patientService.getPatientDetailService(
				requestBody,
			);
			return res.data as IGetPatientDetailResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const getRecentPatients = createAsyncThunk<
	IRecentPatientsResponse[],
	IWorkspaceSlug
>('recentPatients', async (IWorkspaceSlug, { rejectWithValue }) => {
	try {
		const res: any = await patientService.getRecentPatientsService(
			IWorkspaceSlug.slug,
		);
		return res.data as IRecentPatientsResponse[];
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const updatePatient = createAsyncThunk<
	IUpdatePatientResponse,
	IUpdatePatientDets
>(
	'updatePatient',
	async (requestBody: IUpdatePatientDets, { rejectWithValue }) => {
		try {
			const res: any = await patientService.updatePatientService(
				requestBody,
			);
			return res.data as IUpdatePatientResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const changePatientAvatar = createAsyncThunk<
	IChangePatientAvatarResponse,
	IChangePatientAvatarDets
>(
	'patient/avatar',
	async (
		changePatientAvatarDets: IChangePatientAvatarDets,
		{ rejectWithValue },
	) => {
		try {
			const res: any = await patientService.changePatientAvatar(
				changePatientAvatarDets,
			);
			return res.data as IChangePatientAvatarResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const removePatientAvatar = createAsyncThunk<
	void,
	IDeletePatientAvatarDets
>(
	'patient/avatar',
	async (
		removePatientAvatarDest: IDeletePatientAvatarDets,
		{ rejectWithValue },
	) => {
		try {
			return await patientService.removePatientAvatar(
				removePatientAvatarDest,
			);
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

export const getAllPatients = createAsyncThunk<
	IGetAllPatientsResponse,
	IPatientRequest
>('patients', async (patientDets: IPatientRequest, { rejectWithValue }) => {
	try {
		const res: any = await getAllPatientsService(patientDets);
		return res.data as IGetAllPatientsResponse;
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const createPatient = createAsyncThunk<
	ICreatePatientResponse[],
	ICreatePatientDets
>('patient', async (requestBody: ICreatePatientDets, { rejectWithValue }) => {
	try {
		const res: any = await patientService.create(requestBody);
		return res.data as ICreatePatientResponse[];
	} catch (error: any) {
		if (error.response && error.response.data.description) {
			return rejectWithValue(error.response.data.description);
		}
		return rejectWithValue(error.message);
	}
});

export const getAllCasesOfPatient = createAsyncThunk<
	IPatientCaseResponse,
	{ patientId: number; workspaceId: string }
>(
	'patient_case',
	async (
		requestBody: { patientId: number; workspaceId: string },
		{ rejectWithValue },
	) => {
		try {
			const res: any = await getAllCasesOfPatientService(
				requestBody.patientId,
				requestBody.workspaceId,
			);
			return res as IPatientCaseResponse;
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);

// for patient notes
export const getPatientNotes = createAsyncThunk<
	IAddPatientNoteResponse[],
	{ patientId: number; workspaceSlug: string }
>(
	'get_patient_notes',
	async (
		requestBody: { patientId: number; workspaceSlug: string },
		{ rejectWithValue },
	) => {
		try {
			const res: any = await getPatientNotesService(
				requestBody.patientId,
				requestBody.workspaceSlug,
			);
			if (res.data && res.data.length > 0) {
				return res.data as IAddPatientNoteResponse[];
			}
			return [];
		} catch (error: any) {
			if (error.response && error.response.data.description) {
				return rejectWithValue(error.response.data.description);
			}
			return rejectWithValue(error.message);
		}
	},
);
