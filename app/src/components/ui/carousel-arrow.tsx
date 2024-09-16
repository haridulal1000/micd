import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Arrow: React.FC<{
	clickHandler: () => void;
	hasArrow: boolean;
	direction: 'left' | 'right';
}> = ({ clickHandler, hasArrow, direction }) => (
	<div
		className={`${
			hasArrow ? 'absolute' : 'hidden'
		} bg-white cursor-pointer z-20 rounded-full bottom-12 ${
			direction === 'left' ? 'left-4' : 'right-4'
		} w-7 h-7 flex items-center justify-center`}
		onClick={clickHandler}
	>
		{direction === 'left' ? (
			<ArrowLeft className="w-5 h-5 text-primary" />
		) : (
			<ArrowRight className="w-5 h-5 text-primary" />
		)}
	</div>
);

export default Arrow;
