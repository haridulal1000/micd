import React, { useEffect, useState } from 'react';
import {
	IFieldItem,
	IFieldOption,
} from '../../core/interfaces/teeth.interface';

export interface ITextInputComponentProp {
	fieldChild: IFieldItem;
	field_options: IFieldOption[];
	text?: string | null;
	isSquare?: boolean;
	onItemUpdated: (optionId: number, value: string) => void;
}
function TextInputComponent(props: ITextInputComponentProp) {
	const [text, setText] = useState<string | null>();
	useEffect(() => {
		setText(props?.text || null);
	}, [props.text]);
	return (
		<div className="grid grid-cols-10 items-start my-4">
			<div className="col-span-2">{props.fieldChild.text}</div>
			<div className="col-span-8">
				{props.fieldChild.field_options.map(
					(fieldChildOption: IFieldOption) => (
						<div className="mb-2" key={fieldChildOption.id}>
							<input
								name={props.fieldChild.id.toString()}
								type="text"
								id={fieldChildOption.id.toString()}
								value={text}
								onChange={(e) => {
									props.onItemUpdated(
										fieldChildOption?.id,
										text,
									);
									setText(e.target.value);
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
export default TextInputComponent;
