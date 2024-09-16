export interface MedicalTest {
	id: number;
	name: string;
	description: string;
}

export interface MedicalTestsResponse {
	case_id: number;
	id: number;
	medical_test_id: number;
	medical_test_name: string;
	patient_id: number;
	remarks: string;
	test_date: string;
	value: string;
}
