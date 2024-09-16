import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../core/redux/store/store';
import CssUtils from '../../core/utilities/css-utils';
import Avatar from '../ui/avatar';

const EventContent = (props: { id: number; isPast: boolean }) => {
	const appointments = useSelector(
		(state: RootState) => state.appointments.byIds,
	);
	const appointment = appointments[props.id];

	return (
		<div
			className={CssUtils.cn(
				'flex items-center flex-row justify-start gap-2 mt-1',
				'w-full px-2 border py-2 bg-green-300  border-green-200',
				appointment.cancellation_note
					? 'bg-red-200  border-red-200'
					: '',
				props.isPast
					? 'opacity-70 bg-neutral-400 border-neutral-400'
					: '',
			)}
		>
			<Avatar
				containerClassName={'border-none h-6 w-6'}
				className={'w-6 h-6 text-xs'}
				image={appointment.patient_avatar_url}
				fullName={appointment.patient_name}
			/>
			<p
				className={
					'text-left text-zinc-800 text-xs font-normal leading-none'
				}
			>
				{`${appointment.patient_name.substring(0, 15)}${
					appointment.patient_name.length > 15 ? '...' : ''
				}`}
			</p>
		</div>
	);
};

export default EventContent;
