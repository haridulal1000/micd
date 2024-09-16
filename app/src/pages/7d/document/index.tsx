import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CaseSpecificImages from '../../../components/7d-components/CaseSpecificImages';
import GeneralChartingImages from '../../../components/7d-components/GeneralChartingImages';
import ToothSpecificImages from '../../../components/7d-components/ToothSpecificImages';
import { CaseStage } from '../../../core/services/case-service';
import { RootState } from '../../../core/redux/store/store';
import useCaseDetails from '../../../components/7d-components/use-case-details';
import Spinner from '../../../components/ui/Spinner';
import MedicalTests from '../../../components/7d-components/medical-tests/MedicalTests';

const Document7D = () => {
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();
	const caseId = parseInt(params.caseId!, 10);

	const { revalidateCaseDetails, caseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DOCUMENT,
		slug: currentWorkspaceSlug,
		caseId,
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
			{caseId && (
				<CaseSpecificImages
					caseId={caseId}
					images={caseDetails?.case_images ?? []}
					revalidateCaseDetails={revalidateCaseDetails}
				/>
			)}

			<GeneralChartingImages images={caseDetails?.general_images ?? []} />
			<ToothSpecificImages
				images={caseDetails?.tooth_specific_images ?? []}
			/>
			<MedicalTests
				tests={caseDetails.medical_tests}
				revalidate={revalidateCaseDetails}
			/>
		</div>
	);
};

export default Document7D;
