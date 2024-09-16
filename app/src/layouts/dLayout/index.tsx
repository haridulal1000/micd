import React, { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/breadcrumb';
import { setCurrentD } from '../../core/redux/reducers/DSlice';
import CaseService, { CaseStage } from '../../core/services/case-service';
import { RootState } from '../../core/redux/store/store';
import CommentsBox from '../../components/shared/comments/CommentsBox';
import useCaseDetails from '../../components/7d-components/use-case-details';
import { UIActions } from '../../core/redux/reducers/uiSlice';
import useImageThreads from '../../components/7d-components/use-image-threads';
import SevenDUserInfoLoader from '../../components/7d-components/SevenDUserInfoLoader';
import CaseBanner from '../../pages/7d/case-banner';
import SevenDBanner from '../../pages/7d/7DBanner';
import RemarksBox from '../../pages/7d/remarks-box';
import Footer from '../../components/footer';
import {
	ICaseDetailsDetectStage,
	ICaseDetailsDiscussStage,
} from '../../core/interfaces/case.interface';

const _mockData = {
	breadcrumb: {
		page: 'Patients',
		individual: 'Prawesh Shrestha',
		individualIdentifier: '1',
		item: 'Case III - 1234567',
	},
	caseBanner: {
		caseIdentifier: 'Case III - 1234567',
		currentStep: 'DESIGN',
		startDate: '4th July, 2022',
		endDate: '-',
		problem: 'Bleeding Gums, Tooth 3',
		problemCategory: 'Functional Health',
		patientsConcern: 'High Concern',
		procedure: 'Dental Filling',
		reasonToVisit: 'Emergency',
		nextAppointment: '10 July, 2022',
	},
	remarks: [
		{
			remark: 'This is short',
			dateAdded: '22/11/2022',
		},
		{
			remark: 'This comment should span across multiple lines, thereby increasing the height of remarks box.',
			dateAdded: '22/11/2022',
		},
	],
};

const DLayout = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const step: number = parseInt(
		location.pathname.split('/')[location.pathname.split('/').length - 1],
		10,
	);
	const params = useParams();
	const caseId = parseInt(params?.caseId!, 10);
	const workspaceSlug = params?.workspaceSlug ?? '';
	const currentStage = CaseService.getCaseStage(step);

	const {
		caseDetails: documentCaseDetails,
		isLoading: documentCaseDetailsLoading,
	} = useCaseDetails({
		stage: CaseStage.DOCUMENT,
		caseId,
		slug: workspaceSlug,
	});

	const { revalidateCaseDetails, caseDetails } = useCaseDetails({
		stage: currentStage,
		caseId,
		slug: workspaceSlug,
	});
	const selectedImageId = useSelector(
		(state: RootState) => state.ui.selectedImageId,
	);
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);

	const { threads, revalidateThread } = useImageThreads({
		imageId: selectedImageId,
		slug: workspaceSlug,
		caseId,
		stage: currentStage,
	});

	useEffect(() => {
		revalidateCaseDetails().then();
		dispatch(setCurrentD(step));
		dispatch(
			UIActions.setCurrentStage({
				stage: CaseService.getCaseStage(step),
			}),
		);

		if (currentStage === CaseStage.DISCUSS) {
			const details = caseDetails as ICaseDetailsDiscussStage;
			if (details?.images.length > 0)
				dispatch(
					UIActions.setSelectedImageId({
						id: details.images[0].id ?? 0,
					}),
				);
		}
		if (currentStage === CaseStage.DETECT) {
			const details = caseDetails as ICaseDetailsDetectStage;
			if (details?.images.length > 0)
				dispatch(
					UIActions.setSelectedImageId({
						id: details.images[0].id ?? 0,
					}),
				);
		}

		revalidateThread().then();
	}, [step, caseDetails]);

	const handleSaveNotes = async (note: string) => {
		await CaseService.addNoteToCaseAtStage(
			workspaceSlug,
			currentStage,
			note,
			caseId,
		);
		await revalidateCaseDetails();
	};

	return (
		<SevenDUserInfoLoader>
			<Breadcrumb
				selectedPatient={selectedPatient}
				workspaceSlug={workspaceSlug}
				page={_mockData.breadcrumb.page}
				individual={_mockData.breadcrumb.individual}
				individualIdentifier={_mockData.breadcrumb.individualIdentifier}
				item={caseDetails?.case_details.name}
			/>

			<CaseBanner
				caseDetails={documentCaseDetails?.case_details}
				isLoading={documentCaseDetailsLoading}
			/>

			<div className="grid grid-cols-4 gap-4 mx-4">
				<div className="col-span-3">
					{caseId && (
						<SevenDBanner
							caseId={caseId}
							workspaceSlug={workspaceSlug}
						/>
					)}

					<div className="p-4 bg-white">
						<Outlet />
					</div>
				</div>

				<div className={'col-span-full md:col-span-1'}>
					{(currentStage === CaseStage.DISCUSS ||
						currentStage === CaseStage.DETECT) &&
						caseId && (
							<CommentsBox
								caseId={caseId}
								comments={threads ?? []}
								revalidateComments={revalidateThread}
							/>
						)}

					<RemarksBox
						remarks={caseDetails?.notes ?? []}
						title={'Notes / Remarks'}
						handleSave={(value) => handleSaveNotes(value)}
					/>
				</div>
			</div>
			<Footer />
		</SevenDUserInfoLoader>
	);
};

export default DLayout;
