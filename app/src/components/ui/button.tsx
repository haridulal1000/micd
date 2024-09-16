import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import CssUtils from '../../core/utilities/css-utils';

const button = cva('button rounded-full mr-2 my-2', {
	variants: {
		intent: {
			primary: [
				'bg-gradient-to-r from-red-600 to-blue-600 shadow',
				'text-white',
				'border-transparent',
				'hover:bg-blue-600',
			],
			secondary: [
				'bg-gradient-to-r from-red-600 to-blue-600 shadow',
				'text-blue-600',
				'border-blue-600',
				'hover:bg-blue-600',
				'hover:text-white',
			],
			'blue-primary': [
				'bg-blue-500 shadow',
				'text-white font-semibold',
				'hover:bg-blue-600',
				'hover:text-white',
			],
			'blue-primary-outline': [],
		},
		size: {
			small: ['text-sm', 'py-1', 'px-2'],
			medium: ['text-base', 'py-2', 'px-4'],
		},
		disabled: {
			true: ['opacity-50', 'cursor-not-allowed'],
		},
	},
	compoundVariants: [{ intent: 'primary', size: 'medium' }],
	defaultVariants: {
		intent: 'primary',
		size: 'medium',
	},
});

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
		VariantProps<typeof button> {
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	className,
	intent,
	type,
	size,
	disabled,
	...props
}) => (
	<button
		type={type ?? 'button'}
		className={CssUtils.cn(button({ intent, size, disabled }), className)}
		disabled={disabled}
		{...props}
	/>
);
