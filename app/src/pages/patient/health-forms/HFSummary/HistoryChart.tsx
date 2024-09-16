import React from 'react';
import LineChart from './LineChart';
import { IQuestionnaireSummary } from '../../../../core/interfaces/patient.interface';

interface HistoryChartProps {
	summary: IQuestionnaireSummary[];
}

const HistoryChart = (props: HistoryChartProps) => (
	<div className=" bg-white p-4 mr-5 shadow-md rounded-md">
		<p className="text-lg font-semibold">History & Exam</p>
		{props.summary.map((item, index) => (
			<LineChart summary={item} key={index} />
		))}
	</div>
);

export default HistoryChart;
