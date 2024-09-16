import React, { useEffect, useState } from 'react';
import {
	IFieldItem,
	IFieldOption,
} from '../../core/interfaces/teeth.interface';

export interface ISelectInputProps {
	fieldChild: IFieldItem;
	field_options: IFieldOption[];
	selectedItem?: number | null;
	onItemUpdated: (optionId: number, valueId: number) => void;
}

function SelectInputComponent(props: ISelectInputProps) {
	const [selectedItem, setSelectedItem] = useState<string>('');

	useEffect(() => {
		if (props.selectedItem === 0 || props.selectedItem) {
			setSelectedItem(props?.selectedItem?.toString() || '');
		}
	}, [props.selectedItem]);
	return (
		<select
			className="bg-primaryPastelDream w-full focus:outline-none"
			value={selectedItem}
			aria-label="Not Selected"
			onChange={(e) => {
				props.onItemUpdated(
					parseInt(e.target.value, 10),
					props.fieldChild?.field_value?.id,
				);
				setSelectedItem(e.target.value);
			}}
		>
			<option value="" disabled>
				Not selected
			</option>
			{props?.field_options.map((fieldChildOption: IFieldOption) => (
				<option
					key={fieldChildOption?.id}
					value={fieldChildOption?.id?.toString()}
				>
					{fieldChildOption?.value}
				</option>
			))}
		</select>
	);
}

export default SelectInputComponent;
