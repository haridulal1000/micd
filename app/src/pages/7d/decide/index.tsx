import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DesignTreatmentSection from '../../../components/7d-components/DesignTreatmentSection';
import { RootState } from '../../../core/redux/store/store';
import { CaseStage } from '../../../core/services/case-service';
import useCaseDetails from '../../../components/7d-components/use-case-details';
import Divider from '../../../components/ui/divider';
import Spinner from '../../../components/ui/Spinner';

const Decide7D = () => {
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();

	const { caseDetails, revalidateCaseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DECIDE,
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

	return (
		<div>
			<h6 className={'text-xl font-semibold'}>Treatment Plan</h6>
			<Divider />
			<DesignTreatmentSection
				revalidateCaseDetails={revalidateCaseDetails}
				treatments={caseDetails?.treatments ?? []}
				allowDecisionChange
			/>
		</div>
	);
};

export default Decide7D;
