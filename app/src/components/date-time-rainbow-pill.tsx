import React from 'react';
import { bg } from '@fullcalendar/core/internal-common';
import { text } from 'node:stream/consumers';
import CssUtils from '../core/utilities/css-utils';

const DateTimeRainbowPill = (props: {
	value: string;
	className?: string;
	isPast?: boolean;
}) => (
	<div
		className={CssUtils.cn(
			props.isPast
				? 'bg-neutralMidnight rounded-lg p-[1px] max-w-[13rem]'
				: 'bg-gradient-rainbow rounded-lg p-[1px] max-w-[13rem]',
			props.className,
		)}
	>
		<div className="bg-white rounded-lg">
			<p
				className={`bg-clip-text bg-gradient-rainbow text-sm text-center p-1 px-3 rounded-lg ${
					props?.isPast
						? 'text-opacity-100 text-neutralMidnight bg-neutralMidnight'
						: 'text-transparent'
				}`}
			>
				{props.value}
			</p>
		</div>
	</div>
);

export default DateTimeRainbowPill;
