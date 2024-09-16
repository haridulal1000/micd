import React from 'react';
import { XIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import Modal from '../ui/modal';
import CaseService from '../../core/services/case-service';
import { RootState } from '../../core/redux/store/store';
import { ICaseProblemSummary } from '../../core/interfaces/case.interface';
import Card from '../ui/card';
import CssUtils from '../../core/utilities/css-utils';
import DentalChartProblems from './DentalChartProblems';
import ToothTemplate from './ToothTemplate';

const ViewCaseSummaryDialog: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
	caseId: number;
}> = ({ open, setOpen, caseId }) => {
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug || '',
	);
	const [caseProblemSummary, setCaseProblemSummary] =
		React.useState<ICaseProblemSummary>();
	const [currentView, setCurrentView] = React.useState<
		'dento' | 'questionnaire'
	>('dento');

	React.useEffect(() => {
		CaseService.getCaseProblemSummary(slug, caseId).then((res) => {
			setCaseProblemSummary(res);
		});
	}, [slug]);

	return (
		<Modal
			open={open}
			className={
				'bg-white shadow-2xl rounded-lg p-4 max-w-[40rem] min-h-[589px] focus-visible:outline-none'
			}
			onRequestClose={() => setOpen(false)}
		>
			<div className={'w-full'}>
				<div className={'flex items-center justify-between'}>
					<h1 className="text-zinc-800 text-2xl font-medium leading-9 text-center mb-2">
						Problem Summary
					</h1>
					<div>
						<XIcon
							className={'cursor-pointer '}
							onClick={() => setOpen(false)}
						/>
					</div>
				</div>

				<Card className={'p-0'}>
					<div className={'bg-white w-full'}>
						<div className={'mx-auto flex shadow-md'}>
							<p
								className={CssUtils.cn(
									'py-3  border-white border-b-2 cursor-pointer px-8',
									currentView === 'dento' &&
										'text-primary border-b-gradient',
								)}
								onClick={() => setCurrentView('dento')}
							>
								Dento Gingiva Summary
							</p>
							<p
								className={CssUtils.cn(
									'py-3 border-white border-b-2 mx-4 cursor-pointer px-8',
									currentView === 'questionnaire' &&
										' text-primary  border-b-gradient',
								)}
								onClick={() => setCurrentView('questionnaire')}
							>
								Questionnaire Summary
							</p>
						</div>
					</div>

					{currentView === 'dento' && (
						<div className={'my-4 px-4 pb-4'}>
							<ToothTemplate />
							{caseProblemSummary?.examinations.map(
								(examination) => (
									<DentalChartProblems
										examination={examination}
									/>
								),
							)}
						</div>
					)}

					{currentView === 'questionnaire' && (
						<div className={'my-4 px-4 pb-4'}>
							{caseProblemSummary?.questionnaires.length ===
								0 && <div>No Questionnaire Summary</div>}
							{caseProblemSummary?.questionnaires.map(
								(question, index) => {
									const isLastItem =
										index ===
										caseProblemSummary.questionnaires
											.length -
											1;

									return (
										<div
											className={CssUtils.cn(
												'border-b border-gray-200 pb-2 mt-2',
												isLastItem && 'border-none',
											)}
										>
											<div className={'font-bold'}>
												{question.questionnaire_name}
											</div>

											<div
												className={
													'flex flex-col space-y-1'
												}
											>
												{question.questions.map((q) => (
													<div
														className={
															'flex items-center justify-between'
														}
													>
														<div>
															{q.question_text}
														</div>
														<div
															className={
																'font-semibold'
															}
														>
															{q.answer}
														</div>
													</div>
												))}
											</div>
										</div>
									);
								},
							)}
						</div>
					)}
				</Card>
			</div>
		</Modal>
	);
};

export default ViewCaseSummaryDialog;
