import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

interface IPublicRoute {
	permissions?: string[];
	roles?: string[];
	redirectTo?: string;
	children: React.ReactElement;
}

export default function PublicRoute({ children }: IPublicRoute) {
	const { userToken } = useSelector((state: RootState) => state.auth);

	const isAuthenticated = !!userToken;

	const location = useLocation();

	if (isAuthenticated && location.pathname !== '/register') {
		return <Navigate to={'/dashboard'} />;
	}

	return children;
}
