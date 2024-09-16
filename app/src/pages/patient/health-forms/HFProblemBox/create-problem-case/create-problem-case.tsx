import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import DButton from '../../../../../components/d-button';
import { IViewProblemCaseprops } from '../view-problem-case/view-proble-case';
import { ProblemStatusSelectComponent } from '../problem-status-select/problem-status-select';
import { ProblemStatusEnum } from '../../../../../core/enums/problem-box.enum';
import { updateProblemsService } from '../../../../../core/services/problem-box.service';
import { RootState } from '../../../../../core/redux/store/store';
import { IProblem } from '../../../../../core/interfaces/problems.interface';
import SecondaryBtn from '../../../../../components/shared/form/btn';
import { notifySuccess } from '../../../../../components/shared/form/toast';

function CreateProblemCaseComponent(props: IViewProblemCaseprops) {
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const [problem, setProblem] = useState<IProblem>(props.problem);
	const updateProblemValue = (keyValue: object) => {
		updateProblemsService(
			props.problem.id,
			workspaceInfo?.slug || null,
			keyValue,
		).then((response: AxiosResponse<IProblem>) => {
			notifySuccess('Problem updated successfully');
			setProblem(response.data);
		});
	};
	return (
		<div className="rounded-md text-xs border-l-primary border-l-4 border-solid">
			<div className="grid grid-cols-6 relative gap-2 bg-white p-4  rounded-md  shadow-lg">
				<div>
					<div className="text-grayedLabel">PROBLEM_ID</div>
					<div className=" my-4">{problem?.workspace_problem_id}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Examination</div>
					<div className="my-4">{problem?.examination}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Problem</div>
					<div className="my-4">{problem?.problem}</div>
				</div>
				<div>
					<div className="text-grayedLabel">Tooth No</div>
					<div className="my-4">
						{problem?.tooth_number_universal || 'N/A'}
					</div>
				</div>
				<div className="flex flex-col justify-start items-start h-full gap-[0.65rem]">
					<div className="text-grayedLabel">Status</div>

					<ProblemStatusSelectComponent
						value={problem?.status}
						onChange={(value: ProblemStatusEnum) => {
							updateProblemValue({ status: value });
						}}
					/>
				</div>
				<div>
					{props.hasPrimaryButton && (
						<div className="mt-[1.05rem]">
							<SecondaryBtn
								onClick={() =>
									props.onMainButtonClicked(props.problem)
								}
								classes="flex items-center justify-center text-[16px]"
							>
								{props.problem?.case_id
									? 'View case'
									: 'Create case'}
							</SecondaryBtn>
						</div>
					)}
				</div>
				<div className="absolute right-2 top-2">
					<button
						className="icon-container"
						onClick={() => props.onDeleteButtonClicked(problem)}
					>
						<i className="gray-cross-icon"></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateProblemCaseComponent;
