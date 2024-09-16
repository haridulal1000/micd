import { ICaseCreateBody } from '../interfaces/problems.interface';
import getAxiosInstance from './interceptor';

export const getProblemsService = async (
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
	return axiosInstance.get(`patient/${patientId}/problems`, axiosConfig);
};
export const createCaseService = async (
	requestBody: ICaseCreateBody,
	workspace: string | null,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.post('case', requestBody, axiosConfig);
};
export const updateProblemsService = async (
	problemId: number | null,
	workspace: string | null,
	keyValue: object,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.patch(
		`patient/problem/${problemId}`,
		keyValue,
		axiosConfig,
	);
};
export const deleteProblemsService = async (
	problemId: number | null,
	workspace: string | null,
) => {
	const axiosConfig = {
		headers: {
			'content-type': 'application/json',
			Workspace: workspace,
		},
	};
	const axiosInstance = await getAxiosInstance();
	return axiosInstance.delete(`patient/problem/${problemId}`, axiosConfig);
};
