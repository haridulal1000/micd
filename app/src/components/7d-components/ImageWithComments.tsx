import React from 'react';
import { useSelector } from 'react-redux';
import NewCommentInput from '../shared/comments/NewCommentInput';
import CommentService from '../../core/services/comment-service';
import { RootState } from '../../core/redux/store/store';
import { ICommentThread } from '../../core/interfaces/comment.interface';
import useImageThreads from './use-image-threads';
import ImageCommentPointerAvatar from './image-comments/ImageCommentPointerAvatar';
import ImageCommentSection from './image-comments/ImageCommentSection';
import useOutClickHandler from '../../core/utilities/hooks/useOutClickHandler';
import CssUtils from '../../core/utilities/css-utils';

const ImageWithComments: React.FC<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> & {
		currentImageId: number;
		caseId: number;
	}
> = (props) => {
	const { currentImageId, ...restProps } = props;
	const imageRef = React.useRef<HTMLImageElement>(null);
	const [comments, setComments] = React.useState<ICommentThread[]>([]);
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const { threads, revalidateThread } = useImageThreads({
		imageId: props.currentImageId,
		slug: currentWorkspaceSlug,
		caseId: props.caseId, // TODO (Sharad): Get case id from redux
	});
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);

	const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		if (!imageRef.current) return;
		const rect = imageRef.current?.getBoundingClientRect();
		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleOnSubmit = async (value: string) => {
		const createdCommentThread = await CommentService.createNewThread(
			{
				image_id: currentImageId,
				text: value,
				x_coordinate: position.x,
				y_coordinate: position.y,
				case_id: props.caseId, // TODO (Sharad): Get case id from redux
			},
			currentWorkspaceSlug,
		);
		await revalidateThread();
		setComments([...comments, createdCommentThread]);
		setPosition({ x: 0, y: 0 });
	};

	React.useEffect(() => {
		setPosition({ x: 0, y: 0 });
	}, [currentImageId]);

	React.useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setPosition({ x: 0, y: 0 });
			}
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, []);

	const ref = useOutClickHandler(() => {
		setPosition({ x: 0, y: 0 });
	});

	return (
		<div>
			<div style={{ position: 'relative' }}>
				<img
					{...restProps}
					onClick={handleClick}
					alt={props.alt ?? ''}
					ref={imageRef}
					className={CssUtils.cn(
						'rounded-lg ',
						props.className ?? '',
					)}
				/>
				<div className={'hidden lg:block'}>
					{threads.map((comment) => (
						<ImageCommentSection
							comment={comment}
							key={comment.id}
						/>
					))}
				</div>

				<div className={'hidden lg:block'}>
					{position.x > 0 && position.y > 0 && (
						<div
							style={{
								position: 'absolute',
								left: `${position.x - 44}px`,
								top: `${position.y - 44}px`,
							}}
						>
							<div>
								<ImageCommentPointerAvatar
									username={`${userProfile?.first_name} ${userProfile?.last_name}`}
									avatar={
										userProfile?.user_avatar?.avatar_url
									}
								/>
							</div>
							<div className={'ml-[45px]'} ref={ref}>
								<NewCommentInput
									handleOnSubmit={handleOnSubmit}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageWithComments;
