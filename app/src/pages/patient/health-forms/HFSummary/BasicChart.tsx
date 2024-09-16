import React from 'react';

const BasicChart = () => (
	<div className="bg-white min-w-fit h-full p-4 shadow-md rounded-md">
		<p className="text-lg font-semibold test-chart-title">Basic Chart</p>
		<div>
			{Object.entries({
				Decayed: 20,
				Diseased: 30,
				Defective: 40,
				Discomfort: 50,
				Filled: 50,
				Crown: 30,
				'Bridge Abutment': 40,
				Missing: 30,
			}).map((item) => (
				<div
					key={item[0]}
					className="my-4 flex justify-between text-grayText text-sm "
				>
					<p>{item[0]}:</p>
					<p>{item[1]}</p>
				</div>
			))}
		</div>
		<div className="bg-primaryPastelDream px-3 rounded-lg">
			{Object.entries({
				'DMFT Index': 12,
				'dmft Index': 12,
			}).map((item) => (
				<div
					key={item[0]}
					className="py-2 flex justify-between  text-sm  "
				>
					<div className="w-full flex ">
						<i className="mr-2 info-icon" />
						<div>{item[0]}:</div>
					</div>
					<p>{item[1]}</p>
				</div>
			))}
		</div>
	</div>
);

export default BasicChart;
