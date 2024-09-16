import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import {
	login,
	resendEmailVerificationCode,
} from '../../../core/redux/actions/authActions';
import useLoginFormValidator from '../../../core/utilities/hooks/useLoginFormValidation';
import {
	ILoginDets,
	IResponseData,
} from '../../../core/interfaces/auth.interface';
import LoginComponent from '../../../components/auth-components/LoginComponent';
import { getUserProfile } from '../../../core/redux/actions/userProfileActions';
import { setUserToken } from '../../../core/redux/reducers/authSlice';
import { IUserProfileResponse } from '../../../core/interfaces/userProfile.interface';
import { notifySuccess } from '../../../components/shared/form/toast';

const Login = () => {
	const [loginDetails, setLoginDetails] = useState<ILoginDets>({
		email: '',
		password: '',
	});
	const { loading } = useSelector((state: RootState) => state.auth);
	const { formErrors, clearState, runValidation } = useLoginFormValidator();

	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		clearState();
		setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
	};

	const handleLogin = async (e: SyntheticEvent) => {
		e.preventDefault();

		const numErrors: number = runValidation(loginDetails);

		if (numErrors > 0) return;

		dispatch(login(loginDetails))
			.unwrap()
			.then((response: IResponseData) => response)
			.then((res: IResponseData) => {
				clearState();
				dispatch(getUserProfile())
					.unwrap()
					.then((profileRes: IUserProfileResponse) => {
						if (!profileRes.email_verified) {
							navigate('/verify-email', {
								state: {
									email: profileRes.email,
									verifyFor: 'email',
								},
							});
							// call resend verification code for email verification here
							dispatch(resendEmailVerificationCode())
								.unwrap()
								.then(() => {
									notifySuccess(
										'Since your email was not verified, we have sent you a verification code. Please check your email.',
									);
								});
						}
						dispatch(setUserToken(res.access));
					});
			});
	};

	return (
		<LoginComponent
			handleLogin={handleLogin}
			handleInputChange={handleInputChange}
			loginDetails={loginDetails}
			formErrors={formErrors}
			loading={loading}
		/>
	);
};

export default Login;
