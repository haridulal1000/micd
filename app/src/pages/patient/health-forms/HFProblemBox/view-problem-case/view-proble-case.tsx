import React from 'react';
import DButton from '../../../../../components/d-button';
import { IProblem } from '../../../../../core/interfaces/problems.interface';

export interface IViewProblemCaseprops {
	problem: IProblem;
	onMainButtonClicked: (problem: IProblem) => void;
	hasPrimaryButton: boolean;
	onDeleteButtonClicked: (problem: IProblem) => void;
}
function ViewProblemCaseComponent(props: IViewProblemCaseprops) {
	return (
		<div className="bg-primary rounded-md pl-1">
			<div className="grid grid-cols-6 bg-white p-4  rounded-md items-center">
				<div>
					<div className="text-grayedLabel">PROBLEM_ID</div>
					<div className=" my-4">{props?.problem?.id}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Examination</div>
					<div className="my-4">{props?.problem?.examination}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Problem</div>
					<div className="my-4">{props?.problem?.problem}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Tooth No</div>
					<div className="my-4">
						{props?.problem?.tooth_number_universal}
					</div>
				</div>
				<div>
					<div className="text-grayedLabel">Status</div>
					<div className="my-4">{props?.problem?.problem}</div>
				</div>
				<div>
					{props.hasPrimaryButton && (
						<DButton
							height="2rem"
							buttonText="View case"
							classes="active-d-btn"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default ViewProblemCaseComponent;
