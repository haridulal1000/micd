import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { RootState } from '../../../core/redux/store/store';
import Divider from '../../../components/ui/divider';
import NoImageFoundCard from '../../../components/ui/NoImageFoundCard';
import ImageLightBoxSlider from '../../../components/ui/ImageLightBoxSlider';
import ImageWithComments from '../../../components/7d-components/ImageWithComments';
import { CaseStage } from '../../../core/services/case-service';
import useCaseDetails from '../../../components/7d-components/use-case-details';
import { UIActions } from '../../../core/redux/reducers/uiSlice';
import Spinner from '../../../components/ui/Spinner';

const Discuss7D = () => {
	const [selectedImageIndex, setSelectedImageIndex] =
		React.useState<number>(0);
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const params = useParams();
	const caseId = parseInt(params?.caseId!, 10);
	const sliderRef = React.useRef<Slider>();

	const dispatch = useDispatch();

	const { caseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DISCUSS,
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

	const allImages = caseDetails?.images.map((i) => i.image_url) ?? [];

	return (
		<div>
			<div className={'my-4 '}>
				<h6 className={'text-xl font-semibold'}>Picture Library</h6>
				<Divider />
				{allImages.length === 0 && <NoImageFoundCard />}
				<ImageLightBoxSlider
					sliderRef={sliderRef}
					onChange={(index) => {
						setSelectedImageIndex(index);
						dispatch(
							UIActions.setSelectedImageId({
								id: caseDetails?.images[index]?.id ?? 0,
							}),
						);
					}}
					images={allImages}
				/>
			</div>

			<h6 className={'text-xl'}>
				{caseDetails?.images[selectedImageIndex]?.description}
			</h6>
			<Divider />
			{allImages.length > 0 && (
				<div className={'lg:w-[820px] mx-auto'}>
					<div className={'relative bg-neutral-100 px-2 rounded-lg'}>
						<ImageWithComments
							caseId={caseId}
							currentImageId={
								caseDetails?.images[selectedImageIndex]?.id
							}
							src={allImages[selectedImageIndex]}
							className={
								'cursor-crosshair h-[550px] w-[900px] object-contain rounded-lg'
							}
						/>
						<div>
							<div
								onClick={() => {
									sliderRef.current?.slickPrev();
								}}
								className={
									'bg-white cursor-pointer z-20 rounded-full bottom-12 w-7 h-7 flex items-center justify-center absolute left-5'
								}
							>
								<ChevronLeft
									className={'w-5 h-5 text-primary'}
								/>
							</div>
							<div
								onClick={() => {
									sliderRef.current?.slickNext();
								}}
								className={
									'bg-white cursor-pointer z-20 rounded-full bottom-12 w-7 h-7 flex items-center justify-center absolute right-5'
								}
							>
								<ChevronRight
									className={'w-5 h-5 text-primary'}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Discuss7D;
