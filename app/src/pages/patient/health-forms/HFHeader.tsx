import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from '../../../components/shared/form/dropdown';
import { RootState } from '../../../core/redux/store/store';
import { getFullName } from '../../../core/utilities/name';
import { IPatient } from '../../../core/interfaces/patient.interface';

export const headerData = [
	{
		inActiveIcon: '/profileIcon.svg',
		activeIcon: '/activeProfileIcon.svg',
		label: 'Summary',
		formName: 'summary',
		options: [],
	},
	{
		inActiveIcon: '/lifestyleIcon.svg',
		activeIcon: '/activeLifestyleIcon.svg',
		label: 'Lifestyle & History',
		formName: 'lifestyle',
		options: [
			{
				name: 'Lifestyle & History',
				value: 'lifestyleAndValue',
				path: 'lifestyle',
			},
			{
				name: 'Medical History',
				value: 'medicalHistory',
				path: 'medical-history',
			},
			{
				name: 'Dental History',
				value: 'dentalHistory',
				path: 'dental-history',
			},
		],
	},
	{
		inActiveIcon: '/searchIcon.svg',
		activeIcon: '/activeSearchIcon.svg',
		label: 'General Examination',
		formName: 'general-examination',
		options: [],
	},
	{
		inActiveIcon: '/boxIcon.svg',
		activeIcon: '/problem-box-active-icon.svg',
		label: 'Problem Box',
		formName: 'problem-box',
		options: [],
	},
	{
		inActiveIcon: '/bookIcon.svg',
		activeIcon: '/case-library-active-icon.svg',
		label: 'Case Library',
		formName: 'case-library',
		options: [],
	},
];
const HFHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentLocation = () => {
		const pathNameArray: string[] = location.pathname.split('/');
		return pathNameArray[pathNameArray.length - 1];
	};

	const [isHovering, setIsHovered] = useState(false);
	const [currentHealthForm, setCurrentHealthForm] = useState(currentLocation);

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	const handleChange = (navPath: string) => {
		setCurrentHealthForm(navPath);
		const newRoute = selectedPatient
			? `/workspace/${workspaceInfo?.slug}/patients/${selectedPatient.id}/${navPath}`
			: '#';
		navigate(newRoute);
	};

	return (
		<>
			<div className="px-6 pt-10 bg-white">
				<div className="font-normal text-nightGray flex flex-wrap items-center gap-5 test-breadcrum">
					<p
						className="hover:cursor-pointer hover:text-darkGray"
						onClick={() => {
							const backToPatients = `/workspace/${workspaceInfo?.slug}/patients`;
							navigate(backToPatients);
						}}
					>
						Patients
					</p>
					<svg
						width="8"
						height="12"
						viewBox="0 0 8 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.83019 5.2897L2.59019 1.0497C2.49722 0.955976 2.38662 0.881582 2.26476 0.830813C2.1429 0.780044 2.0122 0.753906 1.88019 0.753906C1.74818 0.753906 1.61747 0.780044 1.49561 0.830813C1.37375 0.881582 1.26315 0.955976 1.17019 1.0497C0.983936 1.23707 0.879395 1.49052 0.879395 1.7547C0.879395 2.01889 0.983936 2.27234 1.17019 2.4597L4.71019 5.9997L1.17019 9.5397C0.983936 9.72707 0.879395 9.98052 0.879395 10.2447C0.879395 10.5089 0.983936 10.7623 1.17019 10.9497C1.26363 11.0424 1.37444 11.1157 1.49628 11.1655C1.61812 11.2152 1.74858 11.2405 1.88019 11.2397C2.01179 11.2405 2.14226 11.2152 2.26409 11.1655C2.38593 11.1157 2.49675 11.0424 2.59019 10.9497L6.83019 6.7097C6.92392 6.61674 6.99831 6.50614 7.04908 6.38428C7.09985 6.26242 7.12599 6.13172 7.12599 5.9997C7.12599 5.86769 7.09985 5.73699 7.04908 5.61513C6.99831 5.49327 6.92392 5.38267 6.83019 5.2897Z"
							fill="#78797E"
						/>
					</svg>
					<p>
						{selectedPatient &&
							getFullName(
								selectedPatient.first_name,
								selectedPatient.last_name,
							)}
					</p>
				</div>
				<div className="mt-5">
					<ul className="flex flex-row gap-12  select-none">
						{headerData.map((item, i) =>
							item.options.length > 0 ? (
								<li key={i}>
									<Dropdown
										inActiveIcon={item.inActiveIcon}
										activeIcon={item.activeIcon}
										label={item.label}
										formName={item.formName}
										options={item.options}
										activeStyle={
											item.options[0].path.includes(
												currentHealthForm,
											)
												? 'border-primary'
												: ''
										}
										handleChange={handleChange}
										currentHealthForm={currentHealthForm}
									/>
								</li>
							) : (
								<li
									key={i}
									className={`test-summary flex flex-row  items-center gap-1 text-sm cursor-pointer hover:border-b-2 hover:border-primary hover:text-primary ${
										currentHealthForm === item.formName
											? 'border-b-2 border-primary'
											: ''
									}`}
									onMouseEnter={onMouseEnter}
									onMouseLeave={onMouseLeave}
									onClick={() => {
										handleChange(item.formName);
									}}
								>
									<img
										src={
											currentHealthForm === item.formName
												? item.activeIcon
												: item.inActiveIcon
										}
									/>
									<p
										className={`${
											currentHealthForm === item.formName
												? 'text-primary'
												: ''
										} hover:text-primary`}
									>
										{item.label}
									</p>
								</li>
							),
						)}
					</ul>
				</div>
			</div>
			<hr />
		</>
	);
};

export default HFHeader;
