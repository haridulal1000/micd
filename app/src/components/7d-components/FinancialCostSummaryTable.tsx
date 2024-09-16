import React from 'react';
import { useSelector } from 'react-redux';
import Divider from '../ui/divider';
import CssUtils from '../../core/utilities/css-utils';
import CaseService from '../../core/services/case-service';
import { RootState } from '../../core/redux/store/store';
import { ICaseTreatment } from '../../core/interfaces/case.interface';
import StringUtils from '../../core/utilities/StringUtils';
import Spinner from '../ui/Spinner';

const FinancialCostSummaryTable: React.FC<{
	treatments: ICaseTreatment[];
	revalidateCaseDetails: () => Promise<void>;
}> = ({ treatments, revalidateCaseDetails }) => {
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [isUpdating, setIsUpdating] = React.useState(false);

	const handleStatusChange = async (
		id: number,
		status: ICaseTreatment['status'],
	) => {
		setIsUpdating(true);
		await CaseService.updateTreatment(slug, id, { status });
		await revalidateCaseDetails();
		setIsUpdating(false);
	};

	return (
		<div className={'my-4'}>
			<h6 className={'text-xl font-semibold'}> Financial Cost Summary</h6>
			<Divider />

			<table className={'w-full'}>
				<thead>
					<tr>
						<th
							className={
								'px-1 py-2 uppercase text-sm font-normal  text-left min-w-[100px]'
							}
						>
							Date
						</th>
						<th
							className={
								'px-1 py-2 uppercase text-sm font-normal  text-left min-w-[100px]'
							}
						>
							Service Code
						</th>
						<th
							className={
								'px-1 py-2 uppercase text-sm  font-normal text-left min-w-[100px]'
							}
						>
							Description
						</th>
						<th
							className={
								'px-1 py-2 uppercase text-sm font-normal text-left min-w-[100px]'
							}
						>
							Price
						</th>
						<th
							className={
								'px-1 py-2 uppercase text-sm font-normal min-w-[100px] flex items-center justify-start gap-2 text-left'
							}
						>
							<p>Status</p>
							{isUpdating && <Spinner />}
						</th>
					</tr>
				</thead>
				<tbody>
					{treatments.map((treatment, index) => (
						<tr key={index}>
							<td className={'px-1 py-2  text-left'}>
								10 Dec 2020
							</td>
							<td className={'px-1 py-2  text-left'}>
								{treatment.code}
							</td>
							<td className={'px-1 py-2  text-left'}>
								{StringUtils.sanitise(treatment.decision)}
							</td>
							<td
								className={'px-1 py-2 font-semibold  text-left'}
							>
								Rs. {treatment.treatment_cost}
							</td>
							<td
								className={
									'px-1 flex items-center gap-2  cursor-pointer text-right justify-start'
								}
							>
								<select
									className={CssUtils.cn(
										'rounded-lg py-1 px-2 my-2 uppercase',
										treatment.status === 'pending'
											? 'border-2 border-blue-500 text-blue-500 '
											: '',
										treatment.status === 'ongoing'
											? 'border-2 border-blue-500 bg-blue-500 text-white'
											: '',
										treatment.status === 'completed'
											? 'border-2 border-green-500 text-white bg-green-500'
											: '',
									)}
									value={treatment.status}
									onChange={(e) =>
										handleStatusChange(
											treatment.id,
											e.target
												.value as ICaseTreatment['status'],
										)
									}
								>
									<option value="pending">Pending</option>
									<option value="ongoing">Ongoing</option>
									<option value="completed">Completed</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default FinancialCostSummaryTable;
