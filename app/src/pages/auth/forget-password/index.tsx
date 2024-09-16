import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../core/redux/actions/authActions';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import useForgotPasswordFormValidator from '../../../core/utilities/formValidation/useForgotPasswordFormValidation';
import ForgotPasswordComponent from '../../../components/auth-components/ForgotPasswordComponent';
import { IForgotPasswordDets } from '../../../core/interfaces/auth.interface';

const ForgetPassword = () => {
	const [forgotPasswordDets, setForgotPasswordDets] =
		useState<IForgotPasswordDets>({ email: '' });
	const { formErrors, clearState, runValidation } =
		useForgotPasswordFormValidator();

	const { loading } = useSelector((state: RootState) => state.auth);

	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	const handleRequestCode = async (e: SyntheticEvent) => {
		e.preventDefault();

		const numErrors: number = runValidation(forgotPasswordDets);

		if (numErrors > 0) return;

		dispatch(forgotPassword(forgotPasswordDets))
			.unwrap()
			.then(() => {
				clearState();
				navigate('/verify-email', {
					state: {
						email: forgotPasswordDets.email,
						verifyFor: 'password',
					},
				});
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		clearState();
		setForgotPasswordDets({ email: e.target.value });
	};

	return (
		<ForgotPasswordComponent
			loading={loading}
			handleRequestCode={handleRequestCode}
			forgotPasswordDets={forgotPasswordDets}
			handleInputChange={handleChange}
			formErrors={formErrors}
		/>
	);
};

export default ForgetPassword;
