import React from 'react';
import NoImageFoundIcon from './icons/NoImageFoundIcon';

const NoImageFoundCard = () => (
	<div
		className={
			'h-[228px] w-[228px] border rounded-sm border-dashed border-blue-500 bg-blue-50 flex items-center flex-col justify-center my-2'
		}
	>
		<NoImageFoundIcon />
		<p>No image found</p>
	</div>
);

export default NoImageFoundCard;
