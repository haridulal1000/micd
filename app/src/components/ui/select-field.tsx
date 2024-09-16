import React from 'react';
import { InputError } from './input-field';
import CssUtils from '../../core/utilities/css-utils';

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	options: { value: string; label: string }[];
	placeholder?: string;
	error?: string;
	selectedId?: string;
};

const SelectField = (props: SelectFieldProps) => {
	const { options, error, className, ...restProps } = props;
	return (
		<>
			<select
				className={CssUtils.cn(
					'block bg-saphireLight cursor-pointer text-zinc-600 w-full px-2 text-sm py-3.5 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline select-field-custom',
					error ? 'error-input border-2 border-warning' : '',
					className,
				)}
				{...restProps}
			>
				{props.placeholder && (
					<option
						value=""
						className="text-sm text-zinc-800 font-normal leading-tight"
						disabled
						selected
						hidden
					>
						{props.placeholder}
					</option>
				)}

				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						selected={props.selectedId === option.value}
					>
						{option.label}
					</option>
				))}
			</select>
			{error && <InputError error={error} />}
		</>
	);
};

export default SelectField;
