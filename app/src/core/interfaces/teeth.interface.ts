import TeethTypeEnum, {
	FieldDisplayTypeEnum,
	FieldTypeEnum,
} from '../enums/teeth.enum';

export interface IToothGeneralDetails {
	patient_tooth_id: number;
	index: number;
	name: string;
	type: TeethTypeEnum;
	universal: number;
	palmer: number;
	fdi: number;
	thumbnail: string | null;
	image_top: string | null;
	image_right: string | null;
	image_left: string | null;
	status_id: string | null;
	tooth_status: { [key: string]: string }[];
}
export interface IFieldValue {
	id: number;
	field_id: number;
	value_text: string;
	value_bool: boolean;
	value_single_select: number;
	value_multi_select: number[];
}
export interface IFieldOption {
	id: number;
	field_id: number;
	value: string;
	description: string;
	index: number;
}
export interface IFieldItem {
	id: number;
	text: string;
	type: FieldTypeEnum;
	display: FieldDisplayTypeEnum;
	index: number;
	field_options: IFieldOption[];
	children: IFieldItem[];
	field_value: IFieldValue;
}
export interface IExaminationResponse {
	name: string;
	description: string;
	fields: IFieldItem[];
}
