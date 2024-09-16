import React from 'react';
import moment from 'moment';
import { Share2Icon } from 'lucide-react';
import DButton from '../../components/d-button';
import { ICaseDetailsStageDetails } from '../../core/interfaces/case.interface';
import ShareCaseModal from '../../components/7d-components/share-case/ShareCaseModal';
import Avatar from '../../components/ui/avatar';
import ViewCaseSummaryDialog from '../../components/7d-components/ViewCaseSummaryDialog';

interface ICaseBannerProps {
	caseDetails?: ICaseDetailsStageDetails['case_details'];
	isLoading: boolean;
}

const CaseBanner = (props: ICaseBannerProps) => {
	const [openShareCaseModal, setOpenShareCaseModal] = React.useState(false);
	const [openViewSummaryDialog, setOpenViewSummaryDialog] =
		React.useState(false);
	const { caseDetails } = props;

	const handleViewSummary = () => {
		setOpenViewSummaryDialog(true);
	};

	if (props.isLoading) {
		return (
			<div className="bg-saphireLight mb-2 shadow rounded-md h-[250px] mx-4 p-6">
				<div className="animate-pulse flex space-x-4">
					<div className="flex-1 space-y-6 py-1">
						<div className="space-y-8">
							<div className={'flex justify-between'}>
								<div className="h-4 w-20 bg-slate-300 rounded"></div>
								<div className={'flex justify-between gap-4'}>
									<div className="h-4 w-20 bg-slate-300 rounded"></div>
									<div className="h-4 w-20 bg-slate-300 rounded"></div>
									<div className="h-4 w-20 bg-slate-300 rounded"></div>
								</div>
							</div>
							<div className={'flex justify-start gap-2'}>
								<div className="h-4 w-32 bg-slate-300 rounded"></div>
								<div className="h-4 w-20 bg-slate-300 rounded"></div>
							</div>
							<div className={'flex justify-start gap-8'}>
								<div className="h-12 w-32 bg-slate-300 rounded"></div>
								<div className="h-12 w-32 bg-slate-300 rounded"></div>
								<div className="h-12 w-32 bg-slate-300 rounded"></div>
								<div className="h-12 w-32 bg-slate-300 rounded"></div>
								<div className="h-12 w-32 bg-slate-300 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!caseDetails) return null;

	const startDate =
		caseDetails.start_date && caseDetails.start_date !== '0'
			? moment(Number(caseDetails.start_date)).format('DD MMM, YYYY')
			: '-';
	const endDate = caseDetails.end_date
		? moment(Number(caseDetails.end_date)).format('DD MMM, YYYY')
		: '-';

	return (
		<div className="bg-saphireLight flex flex-col mx-4 p-6 min-h-[250px]">
			<div className="flex items-center gap-4 justify-between">
				<div className=" uppercase font-bold ">
					{caseDetails.workspace_case_id}
				</div>
				<div className={'flex gap-4 items-center'}>
					{caseDetails.shared_with.length > 0 && (
						<div className={'flex gap-2 items-center'}>
							<p>
								shared with {caseDetails.shared_with.length}{' '}
								people
							</p>
							{caseDetails.shared_with.map((s) => (
								<div key={s.id} className={'flex items-center'}>
									<Avatar
										image={s.user_avatar?.avatar_url ?? ''}
										fullName={`${s.first_name} ${s.last_name}`}
										containerClassName={
											'border-none w-10 h-10'
										}
										className={'w-8 h-8'}
									/>
								</div>
							))}
						</div>
					)}

					<div
						className={'cursor-pointer flex gap-2 items-center'}
						onClick={() => setOpenShareCaseModal(true)}
					>
						<Share2Icon className={'text-blue-500'} />
						<p className={'text-blue-500 font-semibold'}>
							Share Case
						</p>
					</div>
					<div>
						<DButton
							onClickCallback={handleViewSummary}
							classes="px-6 py-1 bg-saphireLight active-d-btn uppercase"
							currentIndex={1}
							activeIndex={1}
							buttonText={'View Summary'}
						/>
					</div>
				</div>
			</div>
			<div className="flex gap-12 pt-6">
				<div className="flex flex-nowrap gap-2">
					<img
						src="/rainbow-appointment.svg"
						className="bg-rainbow-gradient"
						alt={''}
					/>
					<span className="text-grayedLabel">Start Date</span>
					<p className="font-semibold">{startDate}</p>
				</div>
				<div className="flex flex-nowrap gap-2">
					<img
						src="/rainbow-appointment.svg"
						className="bg-rainbow-gradient"
						alt={''}
					/>
					<span className="text-grayedLabel">End Date</span>
					<span className="font-semibold">{endDate}</span>
				</div>
			</div>
			<div className="flex flex-nowrap sm:flex-wrap gap-16 pt-6">
				<div className="flex flex-col my-2">
					<span className="text-grayedLabel mb-2">Problem</span>
					<div className="font-semibold overflow-scroll overflow-y-hidden overflow-x-scroll max-w-[300px] pb-2">
						{caseDetails.problems.map((p) => (
							<span className="mr-2">{p.problem},</span>
						))}
					</div>
				</div>
				{/* <div className="flex flex-col my-2"> */}
				{/*	<span className="text-grayedLabel mb-2"> */}
				{/*		Problem Category */}
				{/*	</span> */}
				{/*	<span className="font-semibold"> */}
				{/*		{caseDetails.problems */}
				{/*			.map((p) => p.patient_concern) */}
				{/*			.join(', ')} */}
				{/*	</span> */}
				{/* </div> */}
				<div className="flex flex-col my-2">
					<span className="text-grayedLabel mb-2">
						Patient's Concern
					</span>
					<span className="font-semibold">
						{caseDetails.patient_concern}
					</span>
				</div>
				{/* <div className="flex flex-col my-2"> */}
				{/*	<span className="text-grayedLabel mb-2">Procedure</span> */}
				{/*	<span className="font-semibold"> */}
				{/*		{caseDetails.problems */}
				{/*			.map((a) => a.examination) */}
				{/*			.join(', ')}{' '} */}
				{/*	</span> */}
				{/* </div> */}
				<div className="flex flex-col my-2">
					<span className="text-grayedLabel mb-2">
						Main Reason to Visit
					</span>
					<span className="font-semibold">N/A</span>
				</div>
				<div className="flex flex-col my-2">
					<span className="text-grayedLabel mb-2">
						Next Appointment
					</span>
					<span className="font-semibold">N/A</span>
				</div>
			</div>

			<ShareCaseModal
				caseId={caseDetails.id}
				sharedWithFromProps={caseDetails.shared_with}
				open={openShareCaseModal}
				setOpen={() => setOpenShareCaseModal(false)}
			/>
			<ViewCaseSummaryDialog
				caseId={caseDetails.id}
				open={openViewSummaryDialog}
				setOpen={() => setOpenViewSummaryDialog(false)}
			/>
		</div>
	);
};

export default CaseBanner;
