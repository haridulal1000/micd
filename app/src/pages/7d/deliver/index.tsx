import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FinancialCostSummaryTable from '../../../components/7d-components/FinancialCostSummaryTable';
import useCaseDetails from '../../../components/7d-components/use-case-details';
import { CaseStage } from '../../../core/services/case-service';
import { RootState } from '../../../core/redux/store/store';
import Spinner from '../../../components/ui/Spinner';

const Deliver7D = () => {
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();

	const { caseDetails, revalidateCaseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DISPLAY,
		slug: currentWorkspaceSlug,
		caseId: parseInt(params?.caseId!, 10),
	});

	if (isLoading) {
		return (
			<div className={'flex items-center justify-center'}>
				<Spinner />
			</div>
		);
	}

	const acceptedTreatments = caseDetails?.treatments.filter(
		(treatment) => treatment.decision === 'accepted',
	);

	return (
		<div>
			{acceptedTreatments.length > 0 && (
				<FinancialCostSummaryTable
					treatments={acceptedTreatments}
					revalidateCaseDetails={revalidateCaseDetails}
				/>
			)}

			{acceptedTreatments?.length === 0 && (
				<div>
					<h6 className={'text-xl font-semibold'}>
						No accepted treatments found
					</h6>
				</div>
			)}
		</div>
	);
};

export default Deliver7D;
