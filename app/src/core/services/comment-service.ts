import {
	ICommentThread,
	ICommentThreadDetails,
} from '../interfaces/comment.interface';
import getAxiosInstance from './interceptor';

class CommentService {
	public static createNewThread = async (
		commentDetails: ICommentThreadDetails,
		currentWorkspaceSlug: string,
	): Promise<ICommentThread> => {
		const axios = await getAxiosInstance();
		const res = await axios.post('comment/thread', commentDetails, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: currentWorkspaceSlug,
			},
		});

		return res.data as ICommentThread;
	};

	public static getThreadsForImage = async (
		caseId: number,
		imageId: number,
		currentWorkspaceSlug: string,
	): Promise<ICommentThread[]> => {
		const axios = await getAxiosInstance();
		const res = await axios.get(
			`comments?case_id=${caseId}&image_id=${imageId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as ICommentThread[];
	};

	public static updateThread = async (
		commentId: number,
		updatedText: string,
		slug: string,
	): Promise<ICommentThread> => {
		const axios = await getAxiosInstance();
		const res = await axios.patch(
			`comment/${commentId}`,
			{ text: updatedText },
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: slug,
				},
			},
		);

		return res.data as ICommentThread;
	};

	public static deleteThread = async (
		commentId: number,
		slug: string,
	): Promise<ICommentThread> => {
		const axios = await getAxiosInstance();
		const res = await axios.delete(`comment/${commentId}`, {
			headers: {
				'Content-Type': 'application/json',
				Workspace: slug,
			},
		});

		return res.data as ICommentThread;
	};

	public static addCommentToThread = async (
		commentId: number,
		comment: string,
		slug: string,
	): Promise<ICommentThread> => {
		const axios = await getAxiosInstance();
		const res = await axios.post(
			'comment',
			{ text: comment, thread_id: commentId },
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: slug,
				},
			},
		);

		return res.data as ICommentThread;
	};
}

export default CommentService;
