import React, { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';

export interface OptionEnum {
	label: string;
	value: string;
}

type SetValueCallbackFunction = (value: SyntheticEvent) => void;

interface SelectProps {
	name: string;
	label: string;
	options?: Array<OptionEnum> | null;
	classes?: string;
	icon?: string;
	alt?: string;
	width?: string;
	onValueChange?: (
		value: SyntheticEvent | ChangeEvent<HTMLSelectElement>,
	) => void;
	setValueCallback?: SetValueCallbackFunction;
	defaultSelectedValue?: string;
	placeHolder?: string;
}

export const SelectField = (props: SelectProps) => (
	<div className={`micd-select hidden md:flex items-center${props.classes}`}>
		<img src={props.icon} alt={props.alt} className="pr-2" />
		<select className="" name="" id="" onChange={props.onValueChange}>
			<option key="" value="" selected disabled hidden>
				{props.label}
			</option>
			{props.options?.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
);

export const Select = React.forwardRef((props: SelectProps) => (
	<div
		className=" bg-primaryPastelDream rounded px-3"
		style={{ width: props.width }}
	>
		<select
			className="custom-select py-3 text-sm  text-darkGray w-full rounded-l bg-primaryPastelDream focus:bg-primaryPastelDream focus:outline-0"
			onChange={props.onValueChange}
		>
			<option className=" " value={''} disabled={true}>
				{props.label}
			</option>
			{props.options?.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
));

export const PrimarySelectField = (props: SelectProps) => {
	const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
	const [gender, setGender] = useState<string | undefined>(
		props.defaultSelectedValue,
	);

	const toggleDropdown = () => {
		setOptionsVisible(!optionsVisible);
	};

	const selectOption = useRef(null);

	useOutClickHandler(
		() => optionsVisible && setOptionsVisible(false),
		selectOption,
	);

	return (
		<>
			<div
				onClick={toggleDropdown}
				className={
					'flex w-full justify-between disabled bg-sapphirePale custom-select p-4 text-sm cursor-pointer rounded focus:bg-primaryPastelDream focus:outline-0 relative'
				}
			>
				<input
					type={'select'}
					id={props.name}
					name={props.name}
					value={gender}
					placeholder={props.placeHolder}
					className="w-full bg-sapphirePale focus:outline-none caret-transparent cursor-pointer capitalize"
				/>
				<img
					src="/down-arrow-inactive-icon.svg"
					alt="down arrow icon"
				/>
				{optionsVisible ? (
					<div
						ref={selectOption}
						className={
							'z-10 right-0 top-12 absolute dropdown-shadow flex flex-col rounded-sm bg-white cursor-pointer w-full'
						}
					>
						{props.options?.map((option, i) => (
							<div
								className=" hover:bg-primaryPastelDream select-none"
								key={i}
							>
								<input
									className={`px-4 py-3 w-full text-sm capitalize focus:outline-none hover:bg-primaryPastelDream  caret-transparent cursor-pointer ${
										option.value === 'Select patient'
											? 'text-grayedLabel'
											: ''
									} `}
									value={option.value}
									onClick={(e) => {
										setGender(option.value);
										props.setValueCallback?.(e);
										setOptionsVisible(false);
									}}
								/>
								<hr />
							</div>
						))}
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};
