import React from 'react';

function TeethChart() {
	const outerA = 0.634;
	const outerB = 1;
	const outerRadius = 10;
	const totalNumberOfOuterPoints = 34;
	const innerA = 0.75;
	const innerB = 1;
	const innerRadius = 6;
	const totalNumberOfInnerPoints = 26;
	// Outer radius
	const upperOuterRow: { x: number; y: number }[] = Array.from(
		{ length: totalNumberOfOuterPoints / 2 - 1 },
		(_, i: number) => ({
			x:
				outerRadius +
				outerA *
					outerRadius *
					Math.cos(
						((i + 1) * 2 * Math.PI) / totalNumberOfOuterPoints +
							Math.PI,
					),
			y:
				outerRadius +
				outerB *
					outerRadius *
					Math.sin(
						((i + 1) * 2 * Math.PI) / totalNumberOfOuterPoints +
							Math.PI,
					),
		}),
	);
	const lowerOuterRow: { x: number; y: number }[] = Array.from(
		{ length: totalNumberOfOuterPoints / 2 - 1 },
		(_, i: number) => ({
			x:
				outerRadius +
				outerA *
					outerRadius *
					Math.cos(
						((i + 1) * 2 * Math.PI) / totalNumberOfOuterPoints,
					),
			y:
				outerRadius +
				outerB *
					outerRadius *
					Math.sin(
						((i + 1) * 2 * Math.PI) / totalNumberOfOuterPoints,
					),
		}),
	);
	// InnerRadius
	const upperInnerRow: { x: number; y: number }[] = Array.from(
		{ length: totalNumberOfInnerPoints / 2 - 3 },
		(_, i: number) => ({
			x:
				outerRadius +
				innerA *
					innerRadius *
					Math.cos(
						((i + 2) * 2 * Math.PI) / totalNumberOfInnerPoints +
							Math.PI,
					),
			y:
				outerRadius +
				innerB *
					innerRadius *
					Math.sin(
						((i + 2) * 2 * Math.PI) / totalNumberOfInnerPoints +
							Math.PI,
					),
		}),
	);
	const lowerInnerRow: { x: number; y: number }[] = Array.from(
		{ length: totalNumberOfInnerPoints / 2 - 3 },
		(_, i: number) => ({
			x:
				outerRadius +
				innerA *
					innerRadius *
					Math.cos(
						((i + 2) * 2 * Math.PI) / totalNumberOfInnerPoints,
					),
			y:
				outerRadius +
				innerB *
					innerRadius *
					Math.sin(
						((i + 2) * 2 * Math.PI) / totalNumberOfInnerPoints,
					),
		}),
	);
	return (
		<div
			className="relative bg-slate-100"
			style={{
				width: `${outerRadius * 2}rem`,
				height: `${outerRadius * 2}rem`,
			}}
		>
			{upperOuterRow.map((item, i) => (
				<div
					key={i}
					className="absolute bg-slate-500 w-[1rem] h-[1rem] rounded-[50%]"
					style={{ top: `${item.y}rem`, left: `${item.x}rem` }}
				></div>
			))}
			{lowerOuterRow.map((item, i) => (
				<div
					key={i}
					className="absolute bg-slate-500 w-[1rem] h-[1rem] rounded-[50%]"
					style={{ top: `${item.y}rem`, left: `${item.x}rem` }}
				></div>
			))}
			{upperInnerRow.map((item, i) => (
				<div
					key={i}
					className="absolute bg-slate-500 w-[1rem] h-[1rem] rounded-[50%]"
					style={{ top: `${item.y}rem`, left: `${item.x}rem` }}
				></div>
			))}
			{lowerInnerRow.map((item, i) => (
				<div
					key={i}
					className="absolute bg-slate-500 w-[1rem] h-[1rem] rounded-[50%]"
					style={{ top: `${item.y}rem`, left: `${item.x}rem` }}
				></div>
			))}
		</div>
	);
}
export default TeethChart;
