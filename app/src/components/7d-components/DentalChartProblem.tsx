import React from 'react';
import { IDentalProblemDetails } from '../../core/interfaces/case.interface';
import CssUtils from '../../core/utilities/css-utils';

const DentalChartProblem: React.FC<{
	problem: IDentalProblemDetails;
	isActive?: boolean;
	setIsActiveProblem?: (problem: string) => void;
}> = ({ problem, setIsActiveProblem, isActive }) => (
	<div className={'my-1'}>
		<div className={'flex'}>
			<div
				className={CssUtils.cn(
					'bg-white px-2 py-1 text-red-500 border-red-500 border rounded-full cursor-pointer',
					isActive && 'bg-red-200 ',
				)}
				onClick={() => setIsActiveProblem(problem.problem_name)}
			>
				{problem.problem_name}
			</div>
		</div>
	</div>
);

export default DentalChartProblem;
