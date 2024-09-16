import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

interface IPrivateRoute {
	permissions?: string[];
	roles?: string[];
	redirectTo?: string;
	children: React.ReactElement;
}

// eslint-disable-next-line space-before-function-paren
export default function PrivateRoute({
	permissions,
	roles,
	redirectTo = '/login',
	children,
}: IPrivateRoute) {
	const auth = useSelector((state: RootState) => state.auth);
	const profile = useSelector((state: RootState) => state.userProfile);

	const isAuthenticated = !!auth.userToken;
	const isVerified = profile.userProfile?.email_verified;
	const location = useLocation();

	if (location.pathname === '/verify-email') {
		return children;
	}

	if (!isAuthenticated) {
		return <Navigate to={'/login'} state={{ from: location }} />;
	}
	if (!isVerified) {
		return (
			<Navigate
				to={'/verify-email'}
				state={{ email: auth.loggedInUserEmail, verifyFor: 'email' }}
			/>
		);
	}

	return children;
}
