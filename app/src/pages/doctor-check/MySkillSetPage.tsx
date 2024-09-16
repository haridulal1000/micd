import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import useSWR from 'swr';
import Card from '../../components/ui/card';
import Divider from '../../components/ui/divider';

import { AppDispatch, RootState } from '../../core/redux/store/store';
import {
	SkillSet,
	UserSkillSet,
} from '../../core/interfaces/skillsets.interface';
import StringUtils from '../../core/utilities/StringUtils';
import DentistFormsService from '../../core/services/dentist-forms-service';
import { getUserSkillSetSummary } from '../../core/redux/actions/workspaceActions';

ChartJS.register(ArcElement, Tooltip, Legend);

const MySkillSetPage = () => {
	const dispatch: AppDispatch = useDispatch();

	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const { data: skillsets, mutate } = useSWR(
		slug ? 'user-skillsets' : null,
		async () => {
			const res = await DentistFormsService.getUserSkillSets(slug);
			return res || [];
		},
		{ revalidateOnFocus: false, shouldRetryOnError: false },
	);

	const [skillSetData, setSkillSetData] = useState({
		'Basic Skill': 0,
		'Intermediate Skill': 0,
		'Advanced Skill': 0,
	});

	// using this new selector just not to make any impact to existing code.
	const { userSkillSetSummary } = useSelector(
		(state: RootState) => state.workspace,
	);

	useEffect(() => {
		if (slug) {
			try {
				dispatch(
					getUserSkillSetSummary({
						workspaceSlug: slug,
					}),
				);
			} catch (error: any) {
				// error being handled already
			}
		}
	}, [slug]);

	useEffect(() => {
		// initializing skill set summary data
		if (userSkillSetSummary?.skills) {
			setSkillSetData({
				'Basic Skill': userSkillSetSummary.skills.basic || 0,
				'Intermediate Skill':
					userSkillSetSummary.skills.intermediate || 0,
				'Advanced Skill': userSkillSetSummary.skills.advanced || 0,
			});
		}
	}, [userSkillSetSummary]);

	const revalidate = async () => {
		await mutate();
		dispatch(
			getUserSkillSetSummary({
				workspaceSlug: slug,
			}),
		);
	};

	return (
		<div className={'flex flex-col gap-4'}>
			<div className={'flex gap-2'}>
				<Card className={'bg-white p-4 rounded relative'}>
					<p className={'font-semibold'}>My expertise</p>
					<Doughnut
						data={{
							labels: ['Expert', 'Average', 'Beginner'],
							datasets: [
								{
									label: 'Expertise',
									data: [
										userSkillSetSummary &&
											userSkillSetSummary.expertise
												.beginner,
										userSkillSetSummary &&
											userSkillSetSummary.expertise
												.expert,
										userSkillSetSummary &&
											userSkillSetSummary.expertise
												.average,
									],
									backgroundColor: [
										'#6BBE67', // for expert,
										'#FCA270', // for average
										'#EE5C4F', // for beginner
									],
								},
							],
						}}
						options={{
							rotation: -90,
							circumference: 180,
							aspectRatio: 1.4,
							radius: '80%',
							cutout: '85%',

							plugins: {
								legend: {
									display: false,
								},
							},
						}}
					/>
					<div
						className={' absolute top-[9rem] right-[7rem] text-sm'}
					>
						<div className={'flex gap-1 items-center'}>
							<div
								className={'bg-[#6BBE67] h-2 w-2 rounded-full'}
							/>
							<p>Expert</p>
							<ArrowRight className={'w-4 h-4'} />
						</div>
						<div className={'flex gap-1 items-center'}>
							<div
								className={'bg-[#FCA270] h-2 w-2 rounded-full'}
							/>
							<p>Average</p>
							<ArrowRight className={'w-4 h-4'} />
						</div>
						<div className={'flex gap-1 items-center'}>
							<div
								className={'bg-[#EE5C4F] h-2 w-2 rounded-full'}
							/>
							<p>Beginner</p>
							<ArrowRight className={'w-4 h-4'} />
						</div>
					</div>
				</Card>
				<Card className={'bg-white p-4 rounded flex-1'}>
					<p className={'font-semibold'}>My skill set</p>
					<div className={'flex flex-col gap-2 my-4'}>
						{Object.entries(skillSetData).map((item, i) => (
							<div>
								<div
									className={
										'flex items-center justify-between'
									}
								>
									<p className={'text-sm mb-1'}>
										{StringUtils.sanitise(item[0])} Skills
									</p>
									<p className={'text-sm mb-1'}>{item[1]}%</p>
								</div>
								<div
									className={
										'bg-neutral-300 h-3 rounded-xl relative'
									}
								>
									<div
										style={{
											width: `${item[1]}%`,
										}}
										className={
											'bg-primary  absolute h-3 rounded-xl'
										}
									/>
								</div>
								{i !==
									Object.entries(skillSetData).length - 1 && (
									<Divider />
								)}
							</div>
						))}
					</div>
				</Card>
			</div>

			<Card className={'bg-white p-8 rounded'}>
				<p className={'font-semibold'}>Workspace Skill set</p>
				<p className={'text-zinc-500 text-sm'}>
					Manage your team members and their account permissions here.
				</p>

				<table className={' w-full mt-4'}>
					<thead>
						<tr>
							<th className={'text-sm font-semibold text-left'}>
								S.N
							</th>
							<th className={'text-sm font-semibold text-left'}>
								Skill
							</th>
							<th className={'text-sm font-semibold text-left'}>
								Category
							</th>{' '}
							<th className={'text-sm font-semibold text-left'}>
								Difficulty
							</th>{' '}
							<th className={'text-sm font-semibold text-left'}>
								Expertise
							</th>
						</tr>
					</thead>
					<tbody>
						{skillsets?.map((skill, idx) => (
							<tr key={skill.id}>
								<td className={'py-3 text-sm text-left'}>
									{idx + 1}.
								</td>
								<td className={'py-3 text-sm text-left'}>
									{skill.name}
								</td>
								<td className={'py-3 text-sm text-left'}>
									{skill.category}
								</td>
								<td className={'py-3 text-sm text-left'}>
									{StringUtils.sanitise(skill.level)}
								</td>
								<td
									className={
										'py-2 text-sm flex items-center gap-1'
									}
								>
									{!skill.expertise.expertise && (
										<div
											className={
												'bg-gray-500 h-2 w-2 rounded-full'
											}
										/>
									)}
									{skill.expertise.expertise === 'expert' && (
										<div
											className={
												'bg-green-500 h-2 w-2 rounded-full'
											}
										/>
									)}
									{skill.expertise.expertise ===
										'beginner' && (
										<div
											className={
												'bg-red-500 h-2 w-2 rounded-full'
											}
										/>
									)}

									{skill.expertise.expertise ===
										'average' && (
										<div
											className={
												'bg-orange-500 h-2 w-2 rounded-full'
											}
										/>
									)}
									<select
										value={
											skill.expertise.expertise ||
											'No Expertise'
										}
										onChange={(e) => {
											if (!skill.expertise.id) {
												DentistFormsService.createUserSkillSets(
													slug,
													skill.id,
													e.target
														.value as UserSkillSet['expertise']['expertise'],
												).then(async () => {
													await revalidate();
												});
											} else {
												/** - Expertise cannot be none
												if (
													e.target.value ===
													'no-expertise'
												) {
													DentistFormsService.updateUserSkillSets(
														slug,
														skill.expertise.id,
														'' as UserSkillSet['expertise']['expertise'],
													).then(async () => {
														await revalidate();
													});
													return;
												}
* */

												DentistFormsService.updateUserSkillSets(
													slug,
													skill.expertise.id,
													e.target
														.value as UserSkillSet['expertise']['expertise'],
												).then(async () => {
													await revalidate();
												});
											}
										}}
									>
										<option
											value={'no-expertise'}
											label={'No Expertise'}
										>
											No Expertise
										</option>
										<option
											value={'beginner'}
											label={'Beginner'}
										>
											Beginner
										</option>
										<option
											value={'average'}
											label={'Average'}
										>
											Average
										</option>

										<option
											value={'expert'}
											label={'Expert'}
										>
											Expert
										</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

export default MySkillSetPage;
