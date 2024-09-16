import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { InfoIcon, XIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '../../ui/button';
import { ICaseDetailsStageDetails } from '../../../core/interfaces/case.interface';
import Divider from '../../ui/divider';
import Label from '../../ui/label';
import { Input } from '../../ui/input-field';
import { RootState } from '../../../core/redux/store/store';
import { checkIfEmailExists } from '../../../core/services/userProfile.service';
import CaseService, { CaseStage } from '../../../core/services/case-service';
import Avatar from '../../ui/avatar';
import CssUtils from '../../../core/utilities/css-utils';
import useCaseDetails from '../use-case-details';

const ShareCaseModal: React.FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
	caseId: number;
	sharedWithFromProps?: ICaseDetailsStageDetails['case_details']['shared_with'];
}> = ({ setOpen, open, sharedWithFromProps, caseId }) => {
	const [sharedWith, setSharedWith] = useState<
		ICaseDetailsStageDetails['case_details']['shared_with']
	>([]);
	const [sharedEmails, setSharedEmails] = React.useState<string[]>([]);
	const [currentEmail, setCurrentEmail] = React.useState<string>('');
	const [invalidEmails, setInvalidEmails] = React.useState<string[]>([]);

	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const { revalidateCaseDetails, caseDetails, isLoading } = useCaseDetails({
		stage: CaseStage.DOCUMENT,
		slug: currentWorkspaceSlug,
		caseId,
	});

	useEffect(() => {
		if (sharedWithFromProps) {
			setSharedWith(sharedWithFromProps);
		} else {
			revalidateCaseDetails().then();
		}
	}, [sharedWithFromProps]);

	useEffect(() => {
		if (!sharedWithFromProps && !isLoading && caseDetails) {
			setSharedWith(caseDetails.case_details.shared_with);
		}
	}, [caseDetails]);

	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const handleShareCase = async () => {
		setInvalidEmails([]);
		const emails = sharedEmails.map((email) => email.trim());
		const allUsers = await Promise.all(
			emails.map((e) => checkIfEmailExists(e)),
		);
		const allValid = allUsers.every((item) => item);
		const hasAlreadySharedWith = allUsers.some((item) =>
			Boolean(
				sharedWith.find(
					(sharedWithEmail) => sharedWithEmail.email === item?.email,
				),
			),
		);

		if (!allValid) {
			setInvalidEmails(
				allUsers
					.map((item, index) => (item ? '' : emails[index]))
					.filter(Boolean),
			);
		}

		if (allValid && !hasAlreadySharedWith) {
			await Promise.all(
				allUsers
					.map((user) => user?.id)
					.filter(Boolean)
					.map(
						(userId) =>
							userId &&
							CaseService.addAccessForCase(
								caseId,
								slug,
								'read',
								userId,
							),
					),
			);
			await revalidateCaseDetails();
			setSharedEmails([]);
		}
	};

	React.useEffect(() => {
		setInvalidEmails([]);
	}, [sharedEmails, currentEmail]);

	return (
		<ReactModal
			ariaHideApp={false}
			isOpen={open}
			onRequestClose={() => setOpen(false)}
			className={
				'bg-white shadow-4xl rounded-lg p-8 absolute w-full max-w-[614px]   top-[50%] left-[50%] right-auto bottom-auto -mr[50%] -translate-x-[50%] -translate-y-[50%]'
			}
			shouldCloseOnOverlayClick={true}
		>
			<React.Fragment>
				<div className={'flex items-center justify-between'}>
					<h1 className="text-zinc-800 text-2xl font-medium leading-9 text-center">
						Share Case
					</h1>
				</div>
				<p className={'text-neutral-500'}>
					Invite people to join your team so that they can collaborate
					with you.
				</p>
				<div className={' mt-4'}>
					<Label>Email address </Label>
					<div
						className={
							'bg-saphireLight flex items-center rounded px-2 flex-wrap py-2 mt-2'
						}
					>
						{sharedEmails.map((email) => (
							<div
								key={email}
								className={CssUtils.cn(
									'bg-white px-2 mr-1 py-1 rounded-full text-sm  flex items-center gap-1 my-1',
									invalidEmails.includes(email) &&
										'border border-red-500 bg-red-100',
								)}
							>
								{email}
								{invalidEmails.includes(email) && (
									<div className={'text-red-500 text-xs'}>
										<InfoIcon
											className={'w-4 h-4 cursor-pointer'}
										/>
									</div>
								)}
								<div
									onClick={() => {
										setSharedEmails(
											sharedEmails.filter(
												(item) => item !== email,
											),
										);
									}}
								>
									<XIcon
										className={'w-4 h-4 cursor-pointer'}
									/>
								</div>
							</div>
						))}

						<Input
							value={currentEmail}
							onKeyDown={async (e) => {
								if (
									e.key === 'Backspace' &&
									currentEmail === ''
								) {
									setSharedEmails(
										sharedEmails.slice(
											0,
											sharedEmails.length - 1,
										),
									);
								}

								if (e.key === 'Enter') {
									if (
										sharedEmails.includes(
											currentEmail.replace(',', ''),
										)
									)
										return;
									setSharedEmails([
										...sharedEmails,
										currentEmail,
									]);
									setCurrentEmail('');
								}
							}}
							onChange={async (e) => {
								if (e.target.value.includes(',')) {
									if (sharedEmails.includes(e.target.value))
										return;
									setSharedEmails([
										...sharedEmails,
										e.target.value.replace(',', ''),
									]);
									setCurrentEmail('');
								} else {
									setCurrentEmail(e.target.value);
								}
							}}
							className={'focus:outline-none w-[300px] py-0'}
						/>
					</div>
					<div className={'text-xs text-red-500'}>
						{invalidEmails.length > 0 &&
							'Email does not belong to MICD'}
					</div>
					<span className={'text-neutral-400 text-sm'}>
						Separate emails using comma.
					</span>

					<Button
						intent={'primary'}
						disabled={sharedEmails.length === 0}
						className={'w-full'}
						onClick={handleShareCase}
					>
						Share case
					</Button>
					{sharedWith.length > 0 && (
						<React.Fragment>
							<Divider />
							<div className={'text-xl'}>Shared with</div>
							{sharedWith.map((item) => (
								<div
									key={item.id}
									className={
										'flex items-center justify-between gap-2 mt-2'
									}
								>
									<div className={'flex items-center gap-2'}>
										<Avatar
											image={
												item.user_avatar?.avatar_url ??
												''
											}
											fullName={`${item.first_name} ${item.last_name}`}
										/>

										<div>
											<div
												className={
													'text-sm font-semibold'
												}
											>
												{item.first_name}{' '}
												{item.last_name}
											</div>
											<p
												className={
													'text-xs text-neutral-400'
												}
											>
												Sent on{' '}
												{moment(
													Number(item.shared_on),
												).format('DD MMM YYYY')}
											</p>
										</div>
									</div>
								</div>
							))}
						</React.Fragment>
					)}
				</div>
			</React.Fragment>
		</ReactModal>
	);
};

export default ShareCaseModal;
