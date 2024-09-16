import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../core/redux/store/store';
import { getQuestionnaire } from '../../../../core/redux/actions/questionnaireActions';
import HFQuestionnaireForm from '../formComponents/HFQuestionnaireForm';
import PatientProfile from '../../profile';

const HFDentalHistory = () => {
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);

	const { questionnaireInfo, loading } = useSelector(
		(state: RootState) => state.questionnaire,
	);

	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);

	const dispatch = useDispatch<AppDispatch>();
	const workspace_slug = workspaceInfo ? workspaceInfo.slug : '';

	useEffect(() => {
		if (selectedPatient) {
			dispatch(
				getQuestionnaire({
					workspace: workspace_slug,
					patient_id: selectedPatient.id,
					id_code: 'dental_history',
				}),
			);
		}
	}, []);

	return (
		<div className="flex gap-2">
			<div className="p-4 flex-[5] bg-white">
				{!questionnaireInfo && loading ? (
					<span className="text-sm italic">Loading Questions</span>
				) : (
					<HFQuestionnaireForm
						questionnaireInfo={questionnaireInfo}
					/>
				)}
			</div>
			<div className="bg-white p-6 flex-[1.5]">
				<PatientProfile />
			</div>
		</div>
	);
};

export default HFDentalHistory;
