import React from 'react';
import { useSelector } from 'react-redux';
import { ICaseTreatment } from '../../core/interfaces/case.interface';
import CssUtils from '../../core/utilities/css-utils';
import CaseService from '../../core/services/case-service';
import { RootState } from '../../core/redux/store/store';
import StringUtils from '../../core/utilities/StringUtils';
import Spinner from '../ui/Spinner';

const DesignTreatmentSection: React.FC<{
	treatments: ICaseTreatment[];
	allowDecisionChange?: boolean;
	revalidateCaseDetails: () => Promise<void>;
}> = ({ treatments, allowDecisionChange, revalidateCaseDetails }) => {
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleChangeDecision = async (
		id: number,
		decision: ICaseTreatment['decision'],
	) => {
		if (!isLoading) {
			setIsLoading(true);
			await CaseService.updateTreatment(slug, id, { decision });
			await revalidateCaseDetails();
			setIsLoading(false);
		}
	};

	return (
		<table className={'w-full mt-8'}>
			<thead>
				<tr>
					<th
						className={
							'px-1 py-2 uppercase text-sm font-semibold text-left min-w-[200px]'
						}
					>
						Treatment Cost
					</th>
					<th
						className={
							'px-1 py-2 uppercase text-sm font-semibold text-center min-w-[200px]'
						}
					>
						Biological
					</th>
					<th
						className={
							'px-1 py-2 uppercase text-sm font-semibold text-center min-w-[200px]'
						}
					>
						Total Visits
					</th>
					{allowDecisionChange && (
						<th
							className={
								'px-1 py-2 uppercase text-sm font-semibold min-w-[200px] flex items-center justify-center gap-2 text-right'
							}
						>
							<p>Decision</p>
							{isLoading && <Spinner />}
						</th>
					)}
				</tr>
			</thead>
			<tbody>
				{treatments.map((treatment, index) => {
					const biologicalCost = StringUtils.sanitise(
						treatment.biological_cost,
					);
					return (
						<tr key={index}>
							<td className={'px-1 py-2 text-red-500 text-left'}>
								Rs. {treatment.treatment_cost}
							</td>
							<td className={'px-1 py-2 text-center'}>
								{biologicalCost}
							</td>
							<td className={'px-1 py-2 text-center'}>
								{treatment.total_visits}{' '}
								{treatment.total_visits === 1
									? 'time'
									: 'times'}
							</td>
							{allowDecisionChange && (
								<td
									className={
										'px-1 flex gap-2  cursor-pointer text-right items-center justify-center'
									}
								>
									<div
										className={
											'flex bg-saphireLight rounded-full items-center gap-2 py-1 px-1 my-2 w-[px]'
										}
									>
										<div
											className={CssUtils.cn(
												'flex gap-2  items-center  px-1 rounded-full text-xs',
												treatment.decision ===
													'accepted'
													? 'text-white bg-blue-600 px-4 py-1'
													: '',
											)}
											onClick={() =>
												handleChangeDecision(
													treatment.id,
													'accepted',
												)
											}
										>
											<p>Accepted</p>
										</div>
										<div
											className={CssUtils.cn(
												'flex gap-2  items-center  px-1 rounded-full text-xs',
												treatment.decision ===
													'want_modification'
													? 'text-white bg-blue-600 px-4 py-1'
													: '',
											)}
											onClick={() =>
												handleChangeDecision(
													treatment.id,
													'want_modification',
												)
											}
										>
											<p>Want Modification</p>
										</div>
										<div
											className={CssUtils.cn(
												'flex gap-2  items-center  px-1 rounded-full text-xs',
												treatment.decision === 'denied'
													? 'text-white bg-blue-600 px-4 py-1'
													: '',
											)}
											onClick={() =>
												handleChangeDecision(
													treatment.id,
													'denied',
												)
											}
										>
											<p>Denied</p>
										</div>
									</div>
								</td>
							)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default DesignTreatmentSection;
