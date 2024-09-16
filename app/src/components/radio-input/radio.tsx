import React, { useEffect, useState } from 'react';
import {
	IFieldItem,
	IFieldOption,
} from '../../core/interfaces/teeth.interface';

export interface IRadioComponentProp {
	fieldChild: IFieldItem;
	field_options: IFieldOption[];
	selectedItem?: number | null;
	isSquare?: boolean;
	onItemUpdated: (optionId: number, valueId: number) => void;
}
function RadioInputComponent(props: IRadioComponentProp) {
	const [selectedItem, setSelectedItem] = useState<number | null>();
	useEffect(() => {
		setSelectedItem(props?.selectedItem || null);
	}, [props.selectedItem]);
	return (
		<div className="grid grid-cols-10 items-start my-4">
			<div className="col-span-2">{props.fieldChild.text}</div>
			<div className="col-span-8">
				{props.fieldChild.field_options.map(
					(fieldChildOption: IFieldOption) => (
						<div className="mb-2" key={fieldChildOption.id}>
							<input
								name={props.fieldChild.id.toString()}
								type="radio"
								id={fieldChildOption.id.toString()}
								checked={selectedItem === fieldChildOption?.id}
								onChange={() => {
									props.onItemUpdated(
										fieldChildOption?.id,
										props.fieldChild?.field_value?.id,
									);
									setSelectedItem(fieldChildOption.id);
								}}
							/>
							<label
								className="ml-2 cursor-pointer"
								htmlFor={fieldChildOption.id.toString()}
							>
								{fieldChildOption.value}
							</label>
						</div>
					),
				)}
			</div>
		</div>
	);
}
export default RadioInputComponent;
