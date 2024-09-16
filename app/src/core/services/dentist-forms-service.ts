import moment from 'moment/moment';
import { SkillSet, UserSkillSet } from '../interfaces/skillsets.interface';
import getAxiosInstance from './interceptor';

type DentistFormType =
	| 'day_start'
	| 'day_end'
	| 'complaints'
	| 'monthly_evaluation';

export interface DentistFormInputs {
	id_code: DentistFormType;
	fields: {
		id_code: string;
		value_text?: string;
		value_bool?: boolean;
		value_single_select?: number;
	}[];
}

export interface FormFieldSavedResponse<T extends DentistFormType> {
	description: string;
	fields: T extends 'complaints'
		? never
		: {
				text: string;
				value: string;
		  }[];
	data: T extends 'complaints'
		? {
				complaint_type: string;
				description: string;
		  }[]
		: never;
	name: string;
}

export interface FormFieldResponse {
	description: string;
	id_code: string;
	name: string;
	fields: {
		field_options: {
			id: number;
			description: string;
			value: string;
		}[];
		id_code: string;
		required: boolean;
		text: string;
		type: 'single_select' | 'text';
	}[];
}

export interface DentistFormCheckResponse {
	day_start: {
		submitted: boolean;
		submission_datetime: string;
	};
	day_end: {
		submitted: boolean;
		submission_datetime: string;
	};
}

class DentistFormsService {
	public static getDentistForm = async (
		type: DentistFormType,
		slug: string,
	): Promise<FormFieldResponse> => {
		const axios = await getAxiosInstance();
		const res = await axios.get(`dentist-form?id_code=${type}`, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: slug,
			},
		});
		return res.data;
	};

	public static saveDentistForm = async (
		data: DentistFormInputs,
		slug: string,
	): Promise<FormFieldResponse> => {
		const axios = await getAxiosInstance();
		const res = await axios.post('dentist-form', data, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: slug,
			},
		});
		return res.data;
	};

	// Only gets one year back and front
	public static getDentistFormData = async <T extends DentistFormType>(
		slug: string,
	): Promise<{
		[key: string]: {
			[key: string]: FormFieldSavedResponse<T>;
		};
	}> => {
		const today = moment();
		const oneYearFromToday = today
			.clone()
			.add(1, 'year')
			.format('YYYY-MM-DD');
		const oneYearBackFromToday = moment()
			.subtract(1, 'year')
			.format('YYYY-MM-DD');

		const axios = await getAxiosInstance();
		const res = await axios.get(
			`dentist-forms-data?start_date=${oneYearBackFromToday}&end_date=${oneYearFromToday}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: slug,
				},
			},
		);
		return res.data;
	};

	public static async createSkillSetForWorkspace(
		workspaceSlug: string,
		skillSet: Pick<SkillSet, 'name' | 'level' | 'category'>,
	): Promise<SkillSet> {
		const axios = await getAxiosInstance();
		const res = await axios.post('workspace/skillsets', skillSet, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: workspaceSlug,
			},
		});
		return res.data;
	}

	public static async getUserSkillSets(
		workspaceSlug: string,
	): Promise<UserSkillSet[]> {
		const axios = await getAxiosInstance();
		const res = await axios.get('user-skillsets', {
			headers: {
				'Content-Type': 'application/json',
				Workspace: workspaceSlug,
			},
		});
		return res.data;
	}

	public static async createUserSkillSets(
		workspaceSlug: string,
		skillSetId: number,
		expertise: UserSkillSet['expertise']['expertise'],
	): Promise<UserSkillSet> {
		const axios = await getAxiosInstance();
		const res = await axios.post(
			'user-skillset',
			{
				skillset_id: skillSetId,
				expertise,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: workspaceSlug,
				},
			},
		);
		return res.data;
	}

	public static async updateUserSkillSets(
		workspaceSlug: string,
		skillSetId: number,
		expertise: UserSkillSet['expertise']['expertise'],
	): Promise<{
		id: number;
		skillset_id: number;
		expertise: UserSkillSet['expertise']['expertise'];
	}> {
		const axios = await getAxiosInstance();
		const res = await axios.patch(
			`user-skillset/${skillSetId}`,
			{
				expertise,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: workspaceSlug,
				},
			},
		);
		return res.data;
	}

	public static async getDentistFormCheck(
		workspaceSlug: string,
	): Promise<DentistFormCheckResponse> {
		const axios = await getAxiosInstance();
		const res = await axios.get('dentist-forms/check', {
			headers: {
				'Content-Type': 'application/json',
				Workspace: workspaceSlug,
			},
		});
		return res.data as DentistFormCheckResponse;
	}
}

export default DentistFormsService;
