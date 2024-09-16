import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryBtn from './shared/form/btn';

interface IHeader {
	withLogin: boolean;
	handleNavigationToLogin?: () => void;
}

const Header = (props: IHeader) => {
	const navigate = useNavigate();

	const navigateToLogin = () => {
		if (props.handleNavigationToLogin) {
			props.handleNavigationToLogin();
		}
		navigate('/login');
	};

	return (
		<>
			<div className="h-24 bg-transparent flex items-center px-0 lg:px-14 justify-between w-full">
				<img src="/logo-horizontal.svg" alt="micd-logo" height="50px" />
				{props.withLogin && (
					<SecondaryBtn
						classes={'px-4'}
						onClick={() => navigateToLogin()}
					>
						Login
					</SecondaryBtn>
				)}
			</div>
		</>
	);
};

export default Header;
