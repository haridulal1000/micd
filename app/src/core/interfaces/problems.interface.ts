import getAxiosInstance from '../services/interceptor';
import {
	PatientsConcernEnum,
	ProblemStatusEnum,
} from '../enums/problem-box.enum';

export interface IProblem {
	id: number;
	patient_id: number;
	examination: string;
	problem: string;
	status: ProblemStatusEnum;
	tooth_number_universal: number;
	tooth_number_palmer: number;
	tooth_number_fdi: number;
	patient_concern: PatientsConcernEnum;
	case_id?: number;
	workspace_problem_id: string;
}

export interface ICaseCreateBody {
	start_date: string;
	problems: number[];
	patient_concern: PatientsConcernEnum | null;
	patient_id: number | null;
}
