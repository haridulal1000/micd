export enum TeethTypeEnum {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}
export enum ExaminationCodeEnum {
	GENERAL = 'general',
	PERIO = 'perio',
	DENTAL = 'dental',
	IMAGE = 'image',
	TOOTH_SPECIFIC = 'tooth_specific',
}
export enum FieldTypeEnum {
	BOOLEAN = 'bool',
	SINGLE_SELECT = 'single_select',
	MULTI_SELECT = 'multi_select'
}
export enum FieldDisplayTypeEnum {
	CHECK_BOX = 'check_box',
	HORIZONTAL_SELECT = 'horizontal_select',
	RADIO = 'radio',
	DROP_DOWN_SELECT = 'drop_down_select',
	TEXT = 'text'
}
export default TeethTypeEnum;
