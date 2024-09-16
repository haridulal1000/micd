import getAxiosInstance from './interceptor';
import {
	IGetAllPatientsResponse,
	IGetPatientDetailDets,
	IPatientRequest,
	ICreatePatientDets,
	IUpdatePatientDets,
	IChangePatientAvatarDets,
	IChangePatientAvatarResponse,
	IDeletePatientAvatarDets,
	IRecentPatientsResponse,
} from '../interfaces/patient.interface';
import { IPatientCaseResponse } from '../interfaces/case.interface';
import { notifyError } from '../../components/shared/form/toast';

const getPatientDetailService = async (
	getPatientDetailDets: IGetPatientDetailDets,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: getPatientDetailDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(
		`patient/${getPatientDetailDets.patient_id}`,
		axiosConfig,
	);
};

const getRecentPatientsService = async (
	workspaceSlug: string,
): Promise<IRecentPatientsResponse[]> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('patients/recent', axiosConfig);
};

const updatePatientService = async (updatePatientDets: IUpdatePatientDets) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: updatePatientDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.patch(
		`patient/${updatePatientDets.patient_id}`,
		updatePatientDets,
		axiosConfig,
	);
};

const create = async (createPatientDets: ICreatePatientDets) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: createPatientDets.workspace_slug,
		},
	};

	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('patient', createPatientDets, axiosConfig);
};

export const getAllPatientsService = async (
	patientRequest: IPatientRequest,
): Promise<IGetAllPatientsResponse> => {
	const queryParams = {
		...(patientRequest.search && { search: patientRequest.search }),
		...(patientRequest.page && { page: patientRequest.page }),
		...(patientRequest.sort && {
			sort: patientRequest.sort,
			order: patientRequest.order || 'asc',
		}),
	};

	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: patientRequest.workspace,
		},
		...(Object.keys(queryParams).length > 0 && { params: queryParams }),
	};

	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get('patients', axiosConfig);
};

export const getAllCasesOfPatientService = async (
	patientId: number,
	workspaceId: string = '',
): Promise<IPatientCaseResponse> => {
	const axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
			Workspace: workspaceId,
		},
	};

	const axiosInstance = await getAxiosInstance();
	const res = await axiosInstance.get(
		`patient/${patientId}/cases`,
		axiosConfig,
	);
	return res.data as IPatientCaseResponse;
};

const changePatientAvatar = async (
	changeAvatarDets: IChangePatientAvatarDets,
): Promise<IChangePatientAvatarResponse> => {
	const axiosConfig = {
		headers: {
			'content-type': 'multipart/form-data',
			Workspace: changeAvatarDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		`patient/${changeAvatarDets.patient_id}/avatar`,
		{ file: changeAvatarDets.file },
		axiosConfig,
	);
};

const removePatientAvatar = async (
	removePatientAvatarDets: IDeletePatientAvatarDets,
): Promise<void> => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: removePatientAvatarDets.workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete(
		`patient/${removePatientAvatarDets.patient_id}/avatar`,
		axiosConfig,
	);
};
export const getPatientNotesService = async (
	patientId: number | null,
	workspace_slug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace_slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(`patient/${patientId}/notes`, axiosConfig);
};
export const addPatientNoteService = async (
	patientId: number | null,
	workspace_slug: string,
	remarks: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace_slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		'patient/note',
		{ patient_id: patientId, text: remarks },
		axiosConfig,
	);
};
export const deletePatientNoteService = async (
	noteId: number | null,
	workspace_slug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace_slug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete(`patient/note/${noteId}`, axiosConfig);
};
export const getAllGeneralImagesService = async (
	patientId: number | null,
	currentWorkspaceSlug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: currentWorkspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(`patient/${patientId}/images`, axiosConfig);
};

export const uploadGeneralImageService = async (
	patientId: number | null,
	currentWorkspaceSlug: string,
	image: string,
	description: string,
	imageName: string,
) => {
	const formData = new FormData();
	const file = await fetch(image)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Failed to fetch image: ${response.status} ${response.statusText}`,
				);
			}
			return response.blob();
		})
		.catch((error) => {
			notifyError(error.message);
			throw error;
		});
	formData.append(
		'file',
		new File([file], imageName, {
			type: file.type,
		}),
	);
	formData.append('description', description);
	const axios = await getAxiosInstance();
	return axios.post(`patient/${patientId}/image`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Workspace: currentWorkspaceSlug,
		},
	});
};
export const deleteGeneralImageService = async (
	patientId: number | null,
	currentWorkspaceSlug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: currentWorkspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete(`patient/image/${patientId}`, axiosConfig);
};

export default {
	create,
	getAllPatientsService,
	getRecentPatientsService,
	getPatientDetailService,
	updatePatientService,
	changePatientAvatar,
	removePatientAvatar,
};
