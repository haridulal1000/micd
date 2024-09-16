import React, { ChangeEvent } from 'react';

interface IDatePickerProps {
	width?: string;
	defaultValue?: string | undefined;
	classes?: string;
	min?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker = (props: IDatePickerProps) => (
	<div className="custom-date bg-primaryPastelDream rounded flex p-3 w-full">
		<input
			type="date"
			defaultValue={props.defaultValue}
			className={` text-sm w-full outline-none rounded bg-primaryPastelDream focus:bg-primaryPastelDream focus:outline-0 ${props.classes}`}
			placeholder="Filter by appointment date"
			min={props.min}
			onChange={props.onChange}
		/>
	</div>
);

export default DatePicker;
