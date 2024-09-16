import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../core/redux/store/store';

import { getUserProfile } from '../../core/redux/actions/userProfileActions';

const SevenDUserInfoLoader: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch: AppDispatch = useDispatch();

	const loadInitialData = async () => {
		dispatch(getUserProfile());
	};

	useEffect(() => {
		loadInitialData().then(() => {
			//
		});
	}, []);

	return <div>{children}</div>;
};

export default SevenDUserInfoLoader;
