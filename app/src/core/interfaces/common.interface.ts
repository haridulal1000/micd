import { ChangeEvent, SyntheticEvent } from 'react';
import { IFieldItem, IFieldOption, IFieldValue } from './teeth.interface';
import { FieldTypeEnum } from '../enums/teeth.enum';

export interface IHandleInputChange {
	(e: ChangeEvent<HTMLInputElement>): void;
}

export interface IHandleFunc {
	(e: SyntheticEvent): Promise<void>;
}

export interface ICodeFormat {
	first: string;
	second: string;
	third: string;
	forth: string;
	fifth: string;
	sixth: string;
}
export interface ILabelValue {
	label: string;
	value: string;
}
export interface IToggleListProps {
	listItems: IFieldOption[];
	selectedItem?: number[] | null;
	isSquare?: boolean;
	onItemUpdated: (fieldValue: number[]) => void;
	type: FieldTypeEnum
}
