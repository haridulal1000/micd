/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CreateProblemCaseComponent from './create-problem-case/create-problem-case';
import {
	ICaseCreateBody,
	IProblem,
} from '../../../../core/interfaces/problems.interface';
import { PatientsConcernEnum } from '../../../../core/enums/problem-box.enum';
import { RootState } from '../../../../core/redux/store/store';
import {
	getProblemsService,
	createCaseService,
	deleteProblemsService,
} from '../../../../core/services/problem-box.service';
import { Select } from '../../../../components/shared/form/select';
import SecondaryBtn, {
	PrimaryBtn,
} from '../../../../components/shared/form/btn';
import { BigSpinner } from '../../../../components/ui/Spinner';
import ConfirmationBoxComponent from '../../../../components/ui/confirmation-box';
import Modal from '../../../../components/ui/modal';
import { notifySuccess } from '../../../../components/shared/form/toast';

const HFProblemBox = () => {
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);
	const [createProblems, setCreateProblems] = useState<IProblem[]>([]);
	const [selectedConcern, setSelectedConcern] = useState<
		PatientsConcernEnum | string
	>(PatientsConcernEnum.HIGH);
	const [problems, setProblems] = useState<IProblem[]>([]);
	const [confirmFunction, setConfirmFunction] = useState<() => void>(
		() => null,
	);
	const [createIdModalOpen, setCreateIdModalOpen] = useState<boolean>(false);
	const [isLoadingProblems, setIsLoadingProblems] = useState<boolean>(false);
	const [isCreatingCase, setIsCreatingCase] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const getProblemsList = (): void => {
		getProblemsService(
			selectedPatient?.id || null,
			workspaceInfo?.slug || null,
		)
			.then((response: AxiosResponse<IProblem[]>) => {
				setProblems([...response.data]);
				setCreateProblems([]);
				setIsLoadingProblems(false);
			})
			.catch(() => {
				setIsLoadingProblems(false);
			});
	};
	useEffect(() => {
		setIsLoadingProblems(true);
		getProblemsList();
	}, []);
	useEffect(() => {
		if (createProblems.length <= 0) setCreateIdModalOpen(false);
	}, [createProblems.length]);
	const deleteCreateId = (
		e: React.SyntheticEvent,
		deleteId: number,
	): void => {
		e.stopPropagation();
		const tempProblems: IProblem[] = [...createProblems];
		setCreateProblems(tempProblems.filter((item) => item.id !== deleteId));
	};
	const addToCreateIdList = (problem: IProblem): void => {
		const tempProblems: IProblem[] = [...createProblems, problem];
		setCreateProblems(tempProblems);
	};
	const handleCreateOrView = (problem: IProblem): void => {
		if (problem?.case_id) {
			navigate(
				`/workspace/${workspaceInfo?.slug}/patients/case-libray/${problem?.case_id}/7d/0`,
			);
		} else {
			addToCreateIdList(problem);
		}
	};
	const handleConfirm = () => {
		confirmFunction();
		setIsConfirmOpen(false);
		setConfirmFunction(() => null);
	};
	const createNewCase = (): void => {
		setIsCreatingCase(true);
		setIsLoadingProblems(true);
		const requestBody: ICaseCreateBody = {
			patient_id: selectedPatient?.id || null,
			patient_concern: selectedConcern as PatientsConcernEnum,
			problems: [...createProblems.map((item) => item.id)],
			start_date: '0',
		};
		createCaseService(requestBody, workspaceInfo?.slug || '')
			.then((_response: AxiosResponse<ICaseCreateBody>) => {
				notifySuccess('Case created successfully');
				setIsLoadingProblems(false);
				setIsCreatingCase(false);
				getProblemsList();
			})
			.catch((_) => {
				setIsLoadingProblems(false);
				setIsCreatingCase(false);
			});
	};
	const cancelCreate = (): void => {
		setCreateProblems([]);
		setSelectedConcern('');
	};
	const deleteProblem = (problemTobeDeleted: IProblem) => {
		deleteProblemsService(
			problemTobeDeleted.id,
			workspaceInfo?.slug || null,
		).then(() => {
			const newProblems: IProblem[] = problems.filter(
				(item: IProblem) => item.id !== problemTobeDeleted.id,
			);
			notifySuccess('Problem deleted successfully');
			setProblems(newProblems);
		});
	};
	return (
		<div className="flex gap-2">
			<Modal
				open={isConfirmOpen}
				className="flex items-center justify-center w-fit"
				onRequestClose={() => setIsConfirmOpen(false)}
			>
				<ConfirmationBoxComponent
					onConfirm={handleConfirm}
					onCancel={() => {
						setIsConfirmOpen(false);
					}}
				/>
			</Modal>
			<div className="flex-[6] max-h-[65vh] overflow-auto px-1">
				{!isLoadingProblems ? (
					problems.map((item: IProblem) => (
						<div className="my-5" key={item.id}>
							<CreateProblemCaseComponent
								key={item.id}
								problem={item}
								onMainButtonClicked={(problem: IProblem) => {
									handleCreateOrView(problem);
								}}
								hasPrimaryButton={
									createProblems.filter(
										(childItem) => childItem.id === item.id,
									).length < 1
								}
								onDeleteButtonClicked={(problem: IProblem) => {
									const temp = () => deleteProblem(problem);
									setConfirmFunction(() => temp);
									setIsConfirmOpen(true);
								}}
							/>
						</div>
					))
				) : (
					<div className="w-full h-[10rem] flex items-center justify-center">
						<BigSpinner />
					</div>
				)}
			</div>
			<div className="flex-[2] bg-white p-4">
				<h4 className="text-bold">Create a case</h4>
				<div className="my-4">Problem Id</div>
				<div
					className="cursor-pointer my-4 h-fit min-h-[2rem] flex items-center px-4 justify-between
					 custom-select py-[9.5px] text-sm  text-darkGray w-full rounded-l bg-primaryPastelDream focus:bg-primaryPastelDream focus:outline-0
					 "
					onClick={() => {
						setCreateIdModalOpen(true);
					}}
				>
					{createProblems.length <= 0 && (
						<div className="bg-[inherit] w-full">Problem Ids</div>
					)}
					<div className="flex flex-wrap gap-2 w-full">
						{createProblems.map((problemIdItem: IProblem) => (
							<div
								key={problemIdItem?.id}
								className="bg-white rounded-[20px] h-8 w-fit px-2 flex items-center justify-center gap-1 "
							>
								<span>
									{problemIdItem.workspace_problem_id}
								</span>
								<button
									className="icon-container cursor-pointer"
									onClick={(e) =>
										deleteCreateId(e, problemIdItem.id)
									}
								>
									<i className="cross-icon"></i>
								</button>
							</div>
						))}
					</div>
					<div className="w-[25px] h-[25px] flex items-center justify-end pr-[1px]">
						<i className="down-arrow-icon"></i>
					</div>
				</div>
				<div className="relative my-4">
					{createIdModalOpen && (
						<div
							onClick={() => setCreateIdModalOpen(false)}
							className="fixed z-[50] w-[100vw] h-[100vh] top-0 left-0"
						></div>
					)}
					{createIdModalOpen && (
						<div className="absolute z-[100] bg-white w-[20rem] max-h-[15rem] overflow-auto">
							{problems
								.filter(
									(problemItem: IProblem) =>
										createProblems.filter(
											(createItem) =>
												createItem.id ===
												problemItem.id,
										).length <= 0,
								)
								.filter((problemItem) => !problemItem?.case_id)
								.map((item: IProblem) => (
									<div
										onClick={() => addToCreateIdList(item)}
										key={item.id}
										className=" bg-gray w-full p-4 hover:bg-sla cursor-pointer hover:bg-white"
									>
										{item.id}
									</div>
								))}
						</div>
					)}
				</div>
				<div className="my-4">Patient's Concerns</div>
				<Select
					name="Patient's Concerns"
					label="Patient's Concerns"
					onValueChange={(e) =>
						setSelectedConcern(
							(e.target as HTMLSelectElement).value,
						)
					}
					options={[
						{ label: 'High', value: PatientsConcernEnum.HIGH },
						{ label: 'Medium', value: PatientsConcernEnum.MEDIUM },
						{ label: 'Low', value: PatientsConcernEnum.LOW },
					]}
				/>
				<div className=" px-4 my-4">
					<PrimaryBtn
						disabled={isLoadingProblems || isCreatingCase}
						classes="px-9 py-3 w-full"
						type={'button'}
						onClick={() => {
							createNewCase();
						}}
					>
						Create case
					</PrimaryBtn>
				</div>
				<div className=" px-4 my-4">
					<SecondaryBtn
						onClick={() => cancelCreate()}
						disabled={isCreatingCase}
					>
						Cancel
					</SecondaryBtn>
				</div>
			</div>
		</div>
	);
};

export default HFProblemBox;
