import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/redux/store/store';
import { AppointmentActions } from '../../core/redux/reducers/appointmentSlice';
import AppointmentService from '../../core/services/appointment-service';
import { getAllPatients } from '../../core/redux/actions/patientActions';

type AppointmentLoaderProps = {
	//
};

const AppointmentLoader = (
	props: PropsWithChildren<AppointmentLoaderProps>,
) => {
	const dispatch: AppDispatch = useDispatch();
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);

	const loadInitialData = async () => {
		dispatch(getAllPatients({ workspace: currentWorkspaceSlug }));
		try {
			const appointments = await AppointmentService.getAllAppointments(
				currentWorkspaceSlug,
			);
			dispatch(AppointmentActions.addAllAppointments(appointments));
		} catch (error: any) {
			console.log('error on initial data load = ', error);
		}
	};

	useEffect(() => {
		if (currentWorkspaceSlug) {
			loadInitialData().then(() => {
				//
			});
		}
	}, [currentWorkspaceSlug]);

	return <>{props.children}</>;
};

export default AppointmentLoader;
