import React from 'react';
import { HistoryIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store/store';

const DoctorCheckViewHistoryButton = () => {
	const navigate = useNavigate();
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	return (
		<div className={'flex items-end justify-end'}>
			<div
				className={'flex gap-1 items-center justify-end cursor-pointer'}
				onClick={() =>
					navigate(
						`/workspace/${slug}/doctor-check/daily-evaluation-history`,
					)
				}
			>
				<HistoryIcon className={'text-primary h-5 w-5'} />
				<p className={'text-primary text-sm'}>View history</p>
			</div>
		</div>
	);
};

export default DoctorCheckViewHistoryButton;
