import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useCaseDetails from '../../../components/7d-components/use-case-details';
import { CaseStage } from '../../../core/services/case-service';
import GeneralPlanningSection from '../../../components/7d-components/GeneralPlanningSection';
import { RootState } from '../../../core/redux/store/store';
import DesignTreatmentSection from '../../../components/7d-components/DesignTreatmentSection';
import Spinner from '../../../components/ui/Spinner';

const Design7D = () => {
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();

	const { caseDetails, revalidateCaseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DESIGN,
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
			<GeneralPlanningSection
				revalidateCaseDetails={revalidateCaseDetails}
			/>
			<DesignTreatmentSection
				revalidateCaseDetails={revalidateCaseDetails}
				treatments={caseDetails?.treatments ?? []}
			/>
		</div>
	);
};

export default Design7D;
