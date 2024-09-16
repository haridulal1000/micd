import React, { useState } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { MoreVertical, PenSquareIcon, Trash2Icon } from 'lucide-react';
import Card from '../../../components/ui/card';
import SecondaryBtn from '../../../components/shared/form/btn';
import NewServiceCodeDialog from '../../../components/workspaces/NewServiceCodeDialog';
import {
	deleteServiceCodeForWorkspace,
	getWorkspaceServiceCodes,
} from '../../../core/services/workspace.service';
import { RootState } from '../../../core/redux/store/store';
import Spinner from '../../../components/ui/Spinner';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';
import { IWorkspaceServiceCode } from '../../../core/interfaces/workspace.interface';

const useServiceCodes = (slug: string) => {
	const { data, isLoading, mutate } = useSWR(
		'/api/v1/workspace/service-codes',
		() => getWorkspaceServiceCodes(slug),
		{ revalidateOnFocus: false, shouldRetryOnError: false },
	);
	return {
		serviceCodes: data ?? [],
		isLoading,
		revalidateServiceCode: mutate,
	};
};

const EachServiceCode: React.FC<{
	code: IWorkspaceServiceCode;
	slug: string;
	revalidateServiceCode: () => Promise<void>;
	selectedIndex: number;
	index: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
	setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenEditSkillsetModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	slug,
	code,
	revalidateServiceCode,
	selectedIndex,
	setSelectedIndex,
	index,
	setIsDeleting,
	setOpenEditSkillsetModal,
}) => {
	const [openEdit, setOpenEdit] = useState(false);
	const openEditButtonRef = useOutClickHandler(() => setOpenEdit(false));

	const handleOptionClick = (idx: number): void => {
		setOpenEdit(!openEdit);
		setSelectedIndex(idx);
	};

	const handleEditClick = (idx: number): void => {
		setSelectedIndex(idx);
		setOpenEditSkillsetModal(true);
	};

	const handleDeleteServiceCode = async (id: number) => {
		setIsDeleting(true);
		await deleteServiceCodeForWorkspace(slug, id);
		await revalidateServiceCode();
		setIsDeleting(false);
	};

	return (
		<tr key={code.id}>
			<td className={'py-3 text-sm text-left'}>
				{code.workspace_service_code_id || code.id}
			</td>
			<td className={'py-3 text-sm text-left'}>{code.name}</td>
			<td className={'py-3 text-sm text-left'}>{code.treatment_cost}</td>
			<td className={'py-3 text-sm text-left'}>{code.biological_cost}</td>
			<td className={'py-3 text-sm text-left'}>{code.total_visits}</td>
			<td className={'py-3 text-sm text-left'}>{code.code}</td>
			<td className={'py-2 text-sm flex items-center gap-1'}>
				<div
					onClick={() => {
						handleOptionClick(index);
					}}
					ref={openEditButtonRef}
					className={`${
						openEdit && selectedIndex === index
							? 'border-2 border-primary'
							: 'border-borderGray '
					} p-1 ml-auto border rounded-md border-solid cursor-pointer relative 
												`}
				>
					<MoreVertical className={'text-zinc-500 w-4 h-4'} />
					{openEdit && selectedIndex === index && (
						<div className="absolute bg-white rounded-lg z-10 mt-2 border-borderGray border-solid border text-left min-w-[140px]">
							<div
								onClick={() => {
									handleEditClick(index);
								}}
								className="py-4  items-center px-3 border-b border-b-borderGray cursor-pointer hover:bg-saphireLight hover:text-primary flex gap-1"
							>
								<PenSquareIcon className={'w-5 h-6'} />
								Edit
							</div>
							<div
								onClick={() => handleDeleteServiceCode(code.id)}
								className="py-4 px-3 items-center border-b border-b-borderGray cursor-pointer hover:bg-saphireLight hover:text-primary flex gap-1"
							>
								<Trash2Icon className={'w-5 h-6'} />
								Delete
							</div>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
};

const ServiceCodes = () => {
	const [showCodes, setShowCodes] = React.useState(true);

	const [isDeleting, setIsDeleting] = useState(false);
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [openServiceCodeDialog, setOpenServiceCodeDialog] =
		React.useState(false);
	const [openEditSkillsetModal, setOpenEditSkillsetModal] =
		React.useState(false);

	const { serviceCodes, revalidateServiceCode, isLoading } =
		useServiceCodes(slug);

	if (isLoading) {
		return (
			<div className={'flex items-center justify-center'}>
				<Spinner />
			</div>
		);
	}

	return (
		<Card className={'primary-card w-full p-8 my-6 mb-40'}>
			<div className={'flex items-center justify-between'}>
				<div>
					<h3 className="font-semibold">Service codes</h3>
					<p>
						Manage your team members and their account permissions
						here.
					</p>
				</div>
				<div className="flex items-center gap-8">
					<SecondaryBtn
						onClick={() => setOpenServiceCodeDialog(true)}
					>
						+ Add new Service code
					</SecondaryBtn>
					<div
						className="cursor-pointer"
						onClick={() => setShowCodes(!showCodes)}
					>
						<img
							src="/down-arrow-active-icon.svg"
							className="h-3 w-3"
							alt=""
						/>
					</div>
				</div>
			</div>

			<table className={`w-full mt-8 ${showCodes ? '' : 'hidden'}`}>
				<thead>
					<tr>
						<th className={'text-sm font-normal text-left'}>S.N</th>
						<th className={'text-sm font-normal text-left'}>
							Service Name
						</th>
						<th className={'text-sm font-normal text-left'}>
							Treatment Cost
						</th>
						<th className={'text-sm font-normal text-left'}>
							Biological Cost
						</th>
						<th className={'text-sm font-normal text-left'}>
							Time
						</th>
						<th className={'text-sm font-normal text-left'}>
							Service Code
						</th>
						<th className={'text-sm font-normal text-right'}>
							<div
								className={
									'flex items-center justify-end gap-4'
								}
							>
								{isDeleting && <Spinner />}
								<div>Actions</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{serviceCodes.map((code, idx) => (
						<EachServiceCode
							code={code}
							slug={slug}
							selectedIndex={selectedIndex}
							setSelectedIndex={setSelectedIndex}
							key={code.id}
							index={idx}
							revalidateServiceCode={revalidateServiceCode}
							setIsDeleting={setIsDeleting}
							setOpenEditSkillsetModal={setOpenEditSkillsetModal}
						/>
					))}
				</tbody>
			</table>

			{openEditSkillsetModal && (
				<NewServiceCodeDialog
					serviceCode={serviceCodes[selectedIndex]}
					open={openEditSkillsetModal}
					revalidateServiceCode={revalidateServiceCode}
					onClose={() => setOpenEditSkillsetModal(false)}
				/>
			)}

			{openServiceCodeDialog && (
				<NewServiceCodeDialog
					open={openServiceCodeDialog}
					revalidateServiceCode={revalidateServiceCode}
					onClose={() => setOpenServiceCodeDialog(false)}
				/>
			)}
		</Card>
	);
};

export default ServiceCodes;
