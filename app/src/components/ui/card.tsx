import React, { PropsWithChildren } from 'react';
import CssUtils from '../../core/utilities/css-utils';

type CardProps = PropsWithChildren<{
	className?: string;
}> &
	React.HTMLAttributes<HTMLDivElement>;

const Card = (props: CardProps) => {
	const { className, ...rest } = props;

	return (
		<div className={CssUtils.cn('shadow p-2', className)} {...rest}>
			{props.children}
		</div>
	);
};

export default Card;
