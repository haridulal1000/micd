import useSWR from 'swr';
import CommentService from '../../core/services/comment-service';
import { CaseStage } from '../../core/services/case-service';

const useImageThreads = ({
	imageId,
	slug,
	caseId,
	stage,
}: {
	caseId: number;
	imageId: number;
	slug: string;
	stage?: CaseStage;
}) => {
	const { data, isLoading, mutate } = useSWR(
		caseId ? `comments?case_id=${caseId}&image_id=${imageId}` : null,
		() => {
			if (!stage) {
				return CommentService.getThreadsForImage(caseId, imageId, slug);
			}

			if (stage === CaseStage.DETECT || stage === CaseStage.DISCUSS) {
				return CommentService.getThreadsForImage(caseId, imageId, slug);
			}

			return Promise.resolve([]);
		},
		{ revalidateOnFocus: false, shouldRetryOnError: false },
	);

	return {
		threads: data ?? [],
		isLoading,
		revalidateThread: mutate,
	};
};

export default useImageThreads;
