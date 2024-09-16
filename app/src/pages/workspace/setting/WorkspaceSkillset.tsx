import React, { useState } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { MoreVertical, PenSquareIcon, Trash2Icon } from 'lucide-react';
import SecondaryBtn from '../../../components/shared/form/btn';
import Modal from '../../../components/ui/modal';
import AddSkillsetModal from './AddSkillsetModal';
import CssUtils from '../../../core/utilities/css-utils';

import {
	deleteSkillSetForWorkspace,
	getSkillSetsForWorkspace,
} from '../../../core/services/workspace.service';
import { RootState } from '../../../core/redux/store/store';
import Spinner from '../../../components/ui/Spinner';
import StringUtils from '../../../core/utilities/StringUtils';
import useOutClickHandler from '../../../core/utilities/hooks/useOutClickHandler';
import { ISkillSetSkills } from '../../../core/interfaces/skillsets.interface';
import { ISkillSetResponse } from '../../../core/interfaces/workspace.interface';

const useSkillsets = (slug: string) => {
	const { data, isLoading, mutate } = useSWR(
		'/api/v1/workspace/skillsets',
		() => getSkillSetsForWorkspace(slug),
		{ revalidateOnFocus: false, shouldRetryOnError: false },
	);
	return {
		skills: data ?? [],
		isLoading,
		revalidateSkills: mutate,
	};
};

const EachWorkspaceSkillset: React.FC<{
	skill: ISkillSetResponse;
	slug: string;
	revalidateSkills: () => Promise<void>;
	selectedIndex: number;
	index: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
	setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenEditSkillsetModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	skill,
	slug,
	revalidateSkills,
	selectedIndex,
	index,
	setSelectedIndex,

	setIsDeleting,
	setOpenEditSkillsetModal,
}) => {
	const [openEdit, setOpenEdit] = useState(false);

	const handleDeleteSkillset = async (id: number) => {
		setIsDeleting(true);
		await deleteSkillSetForWorkspace(slug, id);
		await revalidateSkills();
		setIsDeleting(false);
	};

	const openEditButtonRef = useOutClickHandler(() => setOpenEdit(false));

	const handleOptionClick = (idx: number): void => {
		setOpenEdit(!openEdit);
		setSelectedIndex(idx);
	};

	const handleEditClick = (idx: number): void => {
		setSelectedIndex(idx);
		setOpenEditSkillsetModal(true);
	};

	return (
		<tr key={skill.id}>
			<td className={'py-3 text-sm text-left'}>
				{skill.workspace_skillset_id}
			</td>
			<td className={'py-3 text-sm text-left'}>{skill.name}</td>
			<td className={'py-3 text-sm text-left'}>
				{StringUtils.sanitise(skill.category)}
			</td>
			<td className={'py-3 text-sm text-left'}>{skill.level}</td>
			<td className={'py-2 text-sm flex items-center gap-1'}>
				<div
					onClick={() => handleOptionClick(index)}
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
							<p
								onClick={() => handleEditClick(index)}
								className="py-4  items-center px-3 border-b border-b-borderGray cursor-pointer hover:bg-saphireLight hover:text-primary flex gap-1"
							>
								<PenSquareIcon className={'w-5 h-6'} />
								Edit
							</p>
							<p
								onClick={() => handleDeleteSkillset(skill.id)}
								className="py-4 px-3 items-center border-b border-b-borderGray cursor-pointer hover:bg-saphireLight hover:text-primary flex gap-1"
							>
								<Trash2Icon className={'w-5 h-6'} />
								Delete
							</p>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
};

const WorkspaceSkillset = () => {
	const [openEditSkillsetModal, setOpenEditSkillsetModal] = useState(false);
	const [openAddSkillsetModal, setOpenAddSkillsetModal] = useState(false);
	const [showList, setShowList] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isDeleting, setIsDeleting] = useState(false);

	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const { skills, isLoading, revalidateSkills } = useSkillsets(slug);

	const handleAddClick = (): void => {
		setOpenAddSkillsetModal(true);
	};

	if (isLoading) {
		return (
			<div className={'flex items-center justify-center'}>
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<div className={CssUtils.cn('primary-card w-full p-8')}>
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-semibold">Workspace skillset</h3>
						<p>
							Manage your team members and their account
							permissions here.
						</p>
					</div>
					<div className="flex items-center gap-8">
						<SecondaryBtn onClick={handleAddClick}>
							+ Add new Skill
						</SecondaryBtn>
						<div
							className="cursor-pointer"
							onClick={() => setShowList(!showList)}
						>
							<img
								src="/down-arrow-active-icon.svg"
								className="h-3 w-3"
								alt=""
							/>
						</div>
					</div>
				</div>

				<table className={`w-full mt-8 ${showList ? '' : 'hidden'}`}>
					<thead>
						<tr>
							<th className={'text-sm font-normal text-left'}>
								S.N
							</th>
							<th className={'text-sm font-normal text-left'}>
								Skill
							</th>
							<th className={'text-sm font-normal text-left'}>
								Category
							</th>
							<th className={'text-sm font-normal text-left'}>
								Difficulty
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
						{skills.map((skill, index) => (
							<EachWorkspaceSkillset
								key={skill.id}
								skill={skill}
								slug={slug}
								revalidateSkills={revalidateSkills}
								selectedIndex={selectedIndex}
								index={index}
								setSelectedIndex={setSelectedIndex}
								setIsDeleting={setIsDeleting}
								setOpenEditSkillsetModal={
									setOpenEditSkillsetModal
								}
							/>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				className={
					'bg-white shadow-2xl rounded-lg p-4 sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
				}
				open={openEditSkillsetModal}
				onRequestClose={() => setOpenEditSkillsetModal(false)}
			>
				<AddSkillsetModal
					skill={skills[selectedIndex]}
					revalidateSkills={revalidateSkills}
					onClose={() => setOpenEditSkillsetModal(false)}
				/>
			</Modal>

			<Modal
				className={
					'bg-white shadow-2xl rounded-lg p-4 sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px] '
				}
				open={openAddSkillsetModal}
				onRequestClose={() => setOpenEditSkillsetModal(false)}
			>
				<AddSkillsetModal
					revalidateSkills={revalidateSkills}
					onClose={() => setOpenAddSkillsetModal(false)}
				/>
			</Modal>
		</>
	);
};

export default WorkspaceSkillset;
