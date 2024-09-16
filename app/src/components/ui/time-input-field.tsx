import * as React from 'react';
import CssUtils from '../../core/utilities/css-utils';

export type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'type'
>;

const TimeInputField = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => (
		<input
			type={'time'}
			className={CssUtils.cn(
				'px-5 pt-2.5 text-xs pb-3 bg-sapphirePale rounded justify-center items-center inline-flex text-zinc-800  font-normal leading-tight',
				className,
			)}
			ref={ref}
			{...props}
		/>
	),
);

export { TimeInputField };
