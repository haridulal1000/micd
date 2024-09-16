import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store/store';
import CssUtils from '../../core/utilities/css-utils';

type DoctorCheckFormType =
	| 'doctor-check'
	| 'your-day'
	| 'complaints'
	| 'monthly-evaluation'
	| 'my-skill-set';

const DoctorCheckPage = () => {
	const navigate = useNavigate();
	const routePath = window.location.pathname.split('/');
	const [currentForm, setCurrenForm] = useState<DoctorCheckFormType>(
		(routePath[routePath.length - 1] as DoctorCheckFormType) ?? 'your-day',
	);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const handleChange = (navPath: DoctorCheckFormType) => {
		setCurrenForm(navPath);
		navigate(`/workspace/${workspaceInfo?.slug}/doctor-check/${navPath}`);
	};

	return (
		<div className="-mt-12">
			<div className={'bg-white w-full  pt-8'}>
				<div className={'max-w-[650px] mx-auto flex'}>
					<p
						className={CssUtils.cn(
							'py-2  border-white border-b-2 mx-4 cursor-pointer ',
							(currentForm === 'your-day' ||
								currentForm === 'doctor-check') &&
								'border-primary text-primary ',
						)}
						onClick={() => handleChange('your-day')}
					>
						Your Day
					</p>
					<p
						className={CssUtils.cn(
							'py-2 border-white border-b-2 mx-4 cursor-pointer',
							currentForm === 'complaints' &&
								'border-primary text-primary  ',
						)}
						onClick={() => handleChange('complaints')}
					>
						Complaints
					</p>
					<p
						className={CssUtils.cn(
							'py-2  border-white border-b-2 mx-4 cursor-pointer ',
							currentForm === 'monthly-evaluation' &&
								'border-primary text-primary ',
						)}
						onClick={() => handleChange('monthly-evaluation')}
					>
						Monthly Evaluation
					</p>
					<p
						className={CssUtils.cn(
							'py-2 border-b-2 border-white mx-4 cursor-pointer x',
							currentForm === 'my-skill-set' &&
								'border-primary text-primary ',
						)}
						onClick={() => handleChange('my-skill-set')}
					>
						My Skill Set
					</p>
				</div>
			</div>

			<div className="max-w-[750px] mx-auto mt-4">
				<Outlet />
			</div>
		</div>
	);
};

export default DoctorCheckPage;
