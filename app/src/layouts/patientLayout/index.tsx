import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store/store';
import HFHeader from '../../pages/patient/health-forms/HFHeader';

const PatientLayout = () => {
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);

	return (
		<div>
			{selectedPatient && <HFHeader />}
			<div className="w-full px-8 py-6 bg-backgroundGray">
				<Outlet />
			</div>
		</div>
	);
};

export default PatientLayout;
