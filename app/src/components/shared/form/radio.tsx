import React, { SyntheticEvent } from 'react';

type SetValueCallbackFunction = (value: SyntheticEvent) => void;

interface RadioProps {
	name: string;
	values: string[];
	displayValues?: string[];
	label?: string;
	setValueCallback: SetValueCallbackFunction;
	errors?: string[];
	containerClasses?: string;
}

const RadioInput = (props: RadioProps) => (
	<div className={'text-left'}>
		{props.label && (
			<label htmlFor={props.name} className={'mr-2'}>
				{props.label}
			</label>
		)}
		<div
			onChange={(event) => props.setValueCallback(event)}
			className={`flex gap-10 items-center rounded mt-2 pt-4 pb-4 ${
				props.errors && props.errors.length > 0 ? 'error-input' : ''
			} ${props.containerClasses ? props.containerClasses : ''} `}
		>
			{props.values.map((value, index) => (
				<>
					<span className="flex gap-1" key={index}>
						<input
							type="radio"
							value={value}
							name={props.name}
							defaultChecked
						/>
						{props.displayValues?.length === props.values.length
							? props.displayValues[index]
							: value}
					</span>
				</>
			))}
		</div>
		<p className="text-warning italic my-1 h-4 2xl:text-lg">
			{props.errors}
		</p>
	</div>
);

export default RadioInput;
