import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import { notifySuccess } from '../../../components/shared/form/toast';
import { changePassword } from '../../../core/redux/actions/authActions';
import useChangePasswordFormValidation from '../../../core/utilities/hooks/useChangePasswordFormValidation';
import { logout } from '../../../core/redux/reducers/authSlice';
import { IChangePassword } from '../../../core/interfaces/auth.interface';
import ChangePasswordComponent from '../../../components/auth-components/ChangePasswordComponent';

const ChangePassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { formErrors, clearState, runValidation } =
		useChangePasswordFormValidation();

	const { loading } = useSelector((state: RootState) => state.auth);

	const [changePassDets, setChangePassDets] = useState<IChangePassword>({
		email: location.state.email || '',
		password: '',
		repeat_password: '',
	});

	const handleChangePassword = async (e: SyntheticEvent) => {
		e.preventDefault();

		const numErrors: number = runValidation(changePassDets);

		if (numErrors > 0) return;

		dispatch(changePassword(changePassDets))
			.unwrap()
			.then(() => {
				notifySuccess('Password changed successfully');
				dispatch(logout());
				navigate('/');
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		clearState();
		setChangePassDets({ ...changePassDets, [e.target.id]: e.target.value });
	};

	return (
		<ChangePasswordComponent
			handleChangePassword={handleChangePassword}
			changePassDets={changePassDets}
			handleInputChange={handleChange}
			formErrors={formErrors}
			loading={loading}
		/>
	);
};

export default ChangePassword;
