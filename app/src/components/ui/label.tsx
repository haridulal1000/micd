import * as React from 'react';
import CssUtils from '../../core/utilities/css-utils';

const Label = React.forwardRef<
	HTMLLabelElement,
	React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => (
	<label
		className={CssUtils.cn(
			'pb-2 text-zinc-600 text-sm font-normal leading-t ',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</label>
));

export default Label;
