/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { ProblemStatusEnum } from '../../../../../core/enums/problem-box.enum';

export interface IProblemStatusSelectProps {
	value: ProblemStatusEnum;
	onChange: (changedValue: ProblemStatusEnum) => void;
}
export function ProblemStatusSelectComponent(props: IProblemStatusSelectProps) {
	const [selectValue, setSelectValue] = useState<ProblemStatusEnum>(
		props.value,
	);
	return (
		<div>
			<select
				className={`bg-transparent cursor-pointer w-full rounded-md px-4 outline-2 py-0 outline-none h-[1.7rem] ${
					selectValue === ProblemStatusEnum.IDENTIFIED
						? 'outline-primary text-primary'
						: ''
				}
            ${
				selectValue === ProblemStatusEnum.IN_PROGRESS
					? 'outline-orange-500 text-orange-500'
					: ''
			}
            ${
				selectValue === ProblemStatusEnum.SOLVED
					? 'outline-[#6BBE67] text-[#6BBE67]'
					: ''
			}
            ${
				selectValue === ProblemStatusEnum.REJECTED
					? 'outline-red-500 text-red-500'
					: ''
			}
            `}
				value={selectValue}
				onChange={(e) => {
					props.onChange(e.target.value as ProblemStatusEnum);
					setSelectValue(e.target.value as ProblemStatusEnum);
				}}
			>
				<option
					className="text-black"
					value={ProblemStatusEnum.IDENTIFIED}
				>
					IDENTIFIED
				</option>
				<option
					className="text-black"
					value={ProblemStatusEnum.IN_PROGRESS}
				>
					IN PROGRESS
				</option>
				<option
					className="text-black"
					value={ProblemStatusEnum.REJECTED}
				>
					REJECTED
				</option>
				<option className="text-black" value={ProblemStatusEnum.SOLVED}>
					SOLVED
				</option>
			</select>
		</div>
	);
}
