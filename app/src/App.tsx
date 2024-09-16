import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import './App.scss';
import CustomRouter from './core/routes';
import { broadcastLogoutAction } from './core/services/logout-subject-service';
import { logout } from './core/redux/reducers/authSlice';
import { AppDispatch } from './core/redux/store/store';

function App() {
	const [performLogout, setPerformLogout] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		// currently the changes are made from interceptor when it fails to generate new token using refresh token
		// thus we listen to it and update performLogout accordingly to dispatch logout action from here
		const subscription = broadcastLogoutAction.subscribe(
			(value: boolean) => {
				setPerformLogout(value);
			},
		);

		// Clean up subscription
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (performLogout) {
			// Perform logout action
			dispatch(logout());
		}
	}, [performLogout]);
	return (
		<div>
			<div className="App">
				<CustomRouter />
			</div>
			<ToastContainer className="p-0" />
		</div>
	);
}

export default App;
