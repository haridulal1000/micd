import {
	AccessWorkspaceData,
	ICaseAccess,
	ICaseDetailsDecideStage,
	ICaseDetailsDeliverStage,
	ICaseDetailsDesignStage,
	ICaseDetailsDetectStage,
	ICaseDetailsDiscussStage,
	ICaseDetailsDocumentStage,
	ICaseDetailsStageDetails,
	ICaseProblemSummary,
	ICaseTreatment,
} from '../interfaces/case.interface';
import getAxiosInstance from './interceptor';

export enum CaseStage {
	DOCUMENT = 'document',
	DETECT = 'detect',
	DISCUSS = 'discuss',
	DESIGN = 'design',
	DISPLAY = 'display',
	DECIDE = 'decide',
	DELIVER = 'deliver',
}

export type CaseDetailsReturnType<S> = S extends CaseStage.DETECT
	? ICaseDetailsDetectStage
	: S extends CaseStage.DOCUMENT
	? ICaseDetailsDocumentStage
	: S extends CaseStage.DISCUSS
	? ICaseDetailsDiscussStage
	: S extends CaseStage.DESIGN
	? ICaseDetailsDesignStage
	: S extends CaseStage.DISPLAY
	? ICaseDetailsDesignStage
	: S extends CaseStage.DECIDE
	? ICaseDetailsDecideStage
	: S extends CaseStage.DELIVER
	? ICaseDetailsDeliverStage
	: never;

class CaseService {
	/**
	 * Fetches the details of case including general images,
	 * case specific images, tooth specific images and
	 * case notes of document stage
	 * */
	public static getCaseDetails = async <S extends CaseStage>(
		caseId: number,
		currentWorkspaceSlug: string,
		stage: S,
	): Promise<CaseDetailsReturnType<S>> => {
		const axios = await getAxiosInstance();
		const res = await axios.get(`case/${caseId}/${stage}`, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		});

		return res.data;
	};

	/**
	 * Uploads new image for a given case. Endpoint currently accepts
	 * jpeg and png files. The maximum size allowed is 10 MB.
	 */
	public static uploadCaseImage = async (
		caseId: number,
		currentWorkspaceSlug: string,
		description: string,
		file: File,
	): Promise<ICaseDetailsDocumentStage> => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('description', description);

		const axios = await getAxiosInstance();
		const res = await axios.post(`case/${caseId}/image`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Workspace: currentWorkspaceSlug,
			},
		});

		return res.data as ICaseDetailsDocumentStage;
	};

	public static removeCaseImage = async (
		currentWorkspaceSlug: string,
		imageId: number,
	): Promise<void> => {
		const axios = await getAxiosInstance();
		// Why this is patient image rather than case image? IDK
		await axios.delete(`patient/image/${imageId}`, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		});
	};

	public static updateImageDescription = async (
		currentWorkspaceSlug: string,
		imageId: number,
		description: string,
	): Promise<void> => {
		const axios = await getAxiosInstance();
		await axios.patch(
			`patient/image/${imageId}`,
			{
				description,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);
	};

	public static addNoteToCaseAtStage = async (
		currentWorkspaceSlug: string,
		stage: CaseStage,
		note: string,
		caseId?: number,
	): Promise<ICaseDetailsStageDetails> => {
		const axios = await getAxiosInstance();
		const res = await axios.post(
			'case/note',
			{
				text: note,
				case_id: caseId,
				stage,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as ICaseDetailsStageDetails;
	};

	public static getCaseStage = (currentStep: number) => {
		switch (currentStep) {
			case 0:
				return CaseStage.DOCUMENT;
			case 1:
				return CaseStage.DETECT;
			case 2:
				return CaseStage.DISCUSS;
			case 3:
				return CaseStage.DESIGN;
			case 4:
				return CaseStage.DISPLAY;
			case 5:
				return CaseStage.DECIDE;
			default:
				return CaseStage.DELIVER;
		}
	};

	public static addAccessForCase = async (
		caseId: number,
		currentWorkspaceSlug: string,
		accessType: 'read' | 'write',
		userId: number,
	): Promise<ICaseAccess> => {
		const axios = await getAxiosInstance();
		const res = await axios.post(
			'case/access',
			{
				case_id: caseId,
				access_type: accessType,
				user_id: userId,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as ICaseAccess;
	};

	public static addTreatment = async (
		currentWorkspaceSlug: string,
		serviceCodeId: number,
		urgency: string,
		patientConcern: string,
		problemCategory: string,
		treatmentCategory: string,
		caseId?: number,
	): Promise<ICaseTreatment> => {
		const axios = await getAxiosInstance();
		const res = await axios.post(
			'case/treatment',
			{
				case_id: caseId,
				service_code_id: serviceCodeId,
				urgency,
				patient_concern: patientConcern,
				problem_category: problemCategory,
				treatment_category: treatmentCategory, // promotive_and_preventive, curative_and_rehabilitative, beauty_and_glamour
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as ICaseTreatment;
	};

	public static updateTreatment = async (
		currentWorkspaceSlug: string,
		treatmentId: number,
		updates: {
			status?: ICaseTreatment['status'];
			decision?: ICaseTreatment['decision'];
		},
	): Promise<ICaseTreatment> => {
		const axios = await getAxiosInstance();
		const res = await axios.patch(
			`case/treatment/${treatmentId}`,
			updates,
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as ICaseTreatment;
	};

	public static getCaseProblemSummary = async (
		slug: string,
		caseId: number,
	): Promise<ICaseProblemSummary> => {
		const axios = await getAxiosInstance();
		const res = await axios.get(`case/${caseId}/problems-summary`, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: slug,
			},
		});

		return res.data;
	};

	public static getSharedCases = async (
		slug: string | null = null,
	): Promise<AccessWorkspaceData[]> => {
		const axios = await getAxiosInstance();

		const config = slug
			? {
					headers: {
						'Content-Type': 'application/json',
						Workspace: slug,
					},
			  }
			: {
					headers: {
						'Content-Type': 'application/json',
					},
			  };

		const res = await axios.get('case/accesses', config);

		return res.data;
	};
}

export default CaseService;
