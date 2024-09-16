import { ExaminationCodeEnum } from '../enums/teeth.enum';
import {
	IGetPatientDetailDets,
	IPatient,
} from '../interfaces/patient.interface';
import getAxiosInstance from './interceptor';

export const getTeethService = async (
	patientId: number | null,
	workspace: string | null,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(`patient/${patientId}/teeth`, axiosConfig);
};
export const getToothExaminationService = async (
	toothId: number | null,
	examinationId: ExaminationCodeEnum,
	workspace: string | null,
	withChildren: boolean | null = false,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(
		`examination?patient_tooth_id=${toothId}&id_code=${examinationId}&with_children=${withChildren}`,
		axiosConfig,
	);
};
export const updateToothExaminationFieldService = async (
	fieldId: number | null,
	requestBody: object,
	workspace: string | null,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post(
		`examination/field_value/${fieldId}`,
		requestBody,
		axiosConfig,
	);
};

export const getAllTooththImagesService = async (
	toothId: number | null,
	currentWorkspaceSlug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: currentWorkspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(`tooth/${toothId}/images`, axiosConfig);
};

export const uploadTooththImageService = async (
	toothId: number | null,
	currentWorkspaceSlug: string,
	image: string,
	description: string,
	imageName: string,
) => {
	const formData = new FormData();
	const file = await fetch(image).then((r) => r.blob());
	formData.append(
		'file',
		new File([file], imageName, {
			type: file.type,
		}),
	);

	formData.append('description', description);

	const axios = await getAxiosInstance();
	return axios.post(`tooth/${toothId}/image`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Workspace: currentWorkspaceSlug,
		},
	});
};
export const deleteTooththImageService = async (
	toothId: number | null,
	currentWorkspaceSlug: string,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: currentWorkspaceSlug,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete(`patient/image/${toothId}`, axiosConfig);
};
export const getToothNotesService = async (
	toothId: number | null,
	workspace: string | null,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.get(`tooth/${toothId}/notes`, axiosConfig);
};
export const addToothNoteService = async (
	toothId: number | null,
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
		'tooth/note',
		{ patient_tooth_id: toothId, text: remarks },
		axiosConfig,
	);
};
export const deleteToothNoteService = async (
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
	return axiosInstance.delete(`tooth/note/${noteId}`, axiosConfig);
};
