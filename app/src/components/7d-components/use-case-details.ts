import useSWR from 'swr';
import CaseService, {
	CaseDetailsReturnType,
	CaseStage,
} from '../../core/services/case-service';

const useCaseDetails = <S extends CaseStage>(details: {
	slug: string;
	caseId?: number;
	stage: S;
}) => {
	const { data, isLoading, mutate } = useSWR(
		`case/${details.caseId}/${details.stage}`,
		() => {
			if (details.caseId) {
				return CaseService.getCaseDetails(
					details.caseId,
					details.slug,
					details.stage,
				);
			}
			return undefined;
		},
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false,
		},
	);

	return {
		caseDetails: data as CaseDetailsReturnType<S>,
		isLoading,
		revalidateCaseDetails: mutate,
	};
};

export default useCaseDetails;
