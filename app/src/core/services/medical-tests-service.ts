import { z } from 'zod';
import getAxiosInstance from './interceptor';
import { MedicalTest } from '../interfaces/medicalTests.interface';

export const MedicalTestsSchema = z.object({
	testId: z.string(),
	value: z
		.string({
			required_error: 'Value is required',
		})
		.nonempty('Value is required'),
	date: z
		.string({
			required_error: 'Date is required',
		})
		.nonempty('Date is required'),
	remarks: z.string(),
});

export type MedicalTestsFormInputs = z.infer<typeof MedicalTestsSchema>;

class MedicalTestsService {
	public static getAllMedicalTests = async (
		currentWorkspaceSlug: string,
	): Promise<MedicalTest[]> => {
		const axiosConfig = {
			headers: {
				'content-type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		};
		const axiosInstance = await getAxiosInstance();
		const res = await axiosInstance.get('medical-tests', axiosConfig);
		return res.data;
	};

	public static createMedicalTestsForPatient = async (
		inputs: MedicalTestsFormInputs,
		patientId: number,
		caseId: number,
		currentWorkspaceSlug: string,
	): Promise<void> => {
		const axiosConfig = {
			headers: {
				'content-type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		};
		const axiosInstance = await getAxiosInstance();
		return axiosInstance.post(
			'patient/medical-test',
			{
				patient_id: patientId,
				case_id: caseId,
				medical_test_id: inputs.testId,
				value: inputs.value,
				test_date: inputs.date,
				remarks: inputs.remarks,
			},
			axiosConfig,
		);
	};

	public static updateMedicalTestsForPatient = async (
		inputs: Omit<MedicalTestsFormInputs, 'testId'>,
		medicalTestId: number,
		currentWorkspaceSlug: string,
	): Promise<void> => {
		const axiosConfig = {
			headers: {
				'content-type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		};
		const axiosInstance = await getAxiosInstance();
		return axiosInstance.patch(
			`patient/medical-test/${medicalTestId}`,
			{
				value: inputs.value,
				test_date: inputs.date,
				remarks: inputs.remarks,
			},
			axiosConfig,
		);
	};

	public static deleteMedicalTestsForPatient = async (
		medicalTestId: number,
		currentWorkspaceSlug: string,
	): Promise<void> => {
		const axiosConfig = {
			headers: {
				'content-type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		};
		const axiosInstance = await getAxiosInstance();
		return axiosInstance.delete(
			`patient/medical-test/${medicalTestId}`,
			axiosConfig,
		);
	};
}

export default MedicalTestsService;
