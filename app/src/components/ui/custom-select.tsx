import Select, { GroupBase, Props } from 'react-select';
import React from 'react';

function CustomSelect<
	Option extends { value: string; label: string } = {
		value: string;
		label: string;
	},
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
	return (
		<Select
			styles={{
				control: (provided) => ({
					...provided,
					border: 'none',
					fontSize: '14px',
					backgroundColor: '#E6ECFE',
				}),
			}}
			{...props}
		/>
	);
}

export default CustomSelect;
