import React, { useEffect, useState } from 'react';
import ChartListComponent from '../dental-chart/dental-chart';
import { ExaminationCodeEnum } from '../../../../../core/enums/teeth.enum';
import { IWorkspaceSlug } from '../../../../../core/interfaces/patient.interface';
import { ICaseImage } from '../../../../../core/interfaces/case.interface';

export interface IDentoGingivalChartProp {
	workspace: IWorkspaceSlug | null;
	toothId: number;
	onToothImageAdded: (images: ICaseImage[]) => void;
	images: ICaseImage[];
}
const DentoGingivalChart = (props: IDentoGingivalChartProp) => {
	const [menuState, setMenuState] = useState<ExaminationCodeEnum>(
		ExaminationCodeEnum.DENTAL,
	);
	// const [images, setImages] = useState<ICaseImage[]>([]);
	// useEffect(() => {
	// 	setImages(props?.images);
	// }, [props?.toothId]);
	return (
		<div className="w-full bg-white p-4">
			{/* <div className="flex items-end my-8"> */}
			{/*	<button */}
			{/*		className={`bg-transparent w-full px-2 py-2 block ${ */}
			{/*			menuState === ExaminationCodeEnum.DENTAL */}
			{/*				? 'border-b-2 border-b-primary' */}
			{/*				: '' */}
			{/*		}`} */}
			{/*		onClick={() => { */}
			{/*			setMenuState(ExaminationCodeEnum.DENTAL); */}
			{/*		}} */}
			{/*	> */}
			{/*		Dental Chart */}
			{/*	</button> */}
			{/*	<button */}
			{/*		className={`bg-transparent w-full px-2 py-2 block ${ */}
			{/*			menuState === ExaminationCodeEnum.PERIO */}
			{/*				? 'border-b-2 border-b-primary' */}
			{/*				: '' */}
			{/*		}`} */}
			{/*		onClick={() => { */}
			{/*			setMenuState(ExaminationCodeEnum.PERIO); */}
			{/*		}} */}
			{/*	> */}
			{/*		Perio Chart */}
			{/*	</button> */}
			{/* </div> */}
			{props?.toothId &&
				(menuState === ExaminationCodeEnum.DENTAL ||
					menuState === ExaminationCodeEnum.PERIO) && (
					<div className="max-h-[30rem] overflow-auto">
						<ChartListComponent
							examinationType={menuState}
							toothId={props.toothId}
							workspace={props.workspace}
						/>
					</div>
				)}
		</div>
	);
};
// export default DentoGingivalChart;
function arePropsEqual(
	prevProps: IDentoGingivalChartProp,
	nextProps: IDentoGingivalChartProp,
) {
	return (
		prevProps?.toothId === nextProps?.toothId &&
		prevProps?.workspace?.slug === nextProps?.workspace?.slug &&
		prevProps.images?.length === nextProps.images?.length
	);
}

export default React.memo(DentoGingivalChart, arePropsEqual);
