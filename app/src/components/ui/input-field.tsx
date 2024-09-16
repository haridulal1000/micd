import * as React from 'react';
import CssUtils from '../../core/utilities/css-utils';

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
	value: string | number | readonly string[] | undefined | null;
	error?: string;
}

export const InputError = ({ error }: { error?: string }) => (
	<p className="text-warning italic my-2 h-4 text-sm">{error}</p>
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, value, ...props }, ref) => (
		<React.Fragment>
			<input
				value={value || ''}
				type={type ?? 'text'}
				className={CssUtils.cn(
					'flex items-center px-3 py-3 mt-2 form-control w-full font-normal rounded transition ease-in-out m-0 focus:text-gray-700 bg-transparent outline-none ring-0',
					error
						? 'error-input border-2 border-warning'
						: 'bg-sapphirePale text-sm',
					className,
				)}
				ref={ref}
				{...props}
			/>
			{error && <InputError error={error} />}
		</React.Fragment>
	),
);
Input.displayName = 'Input';

export { Input };
