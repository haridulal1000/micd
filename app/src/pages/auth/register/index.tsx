import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../core/redux/actions/authActions';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import useRegisterFormValidator from '../../../core/utilities/hooks/useRegisterFormValidator';
import RegisterComponent from '../../../components/auth-components/RegisterComponent';
import { IRegisterDets } from '../../../core/interfaces/auth.interface';
import { getUserProfile } from '../../../core/redux/actions/userProfileActions';

const initialRegisterDetails: IRegisterDets = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	repeat_password: '',
};

const Register = () => {
	const [registerDetails, setRegisterDetails] = useState<IRegisterDets>(
		initialRegisterDetails,
	);
	const { loading } = useSelector((state: RootState) => state.auth);
	const dispatch: AppDispatch = useDispatch();
	const { formErrors, clearState, runValidation } =
		useRegisterFormValidator();
	const navigate = useNavigate();

	const handleRegister = async (e: SyntheticEvent) => {
		e.preventDefault();
		const numErrors: number = runValidation(registerDetails);

		if (numErrors > 0) return;

		try {
			await dispatch(register(registerDetails)).unwrap();
			await dispatch(getUserProfile());
			clearState();
			setRegisterDetails(initialRegisterDetails);
			navigate('/verify-email', {
				state: { email: '', verifyFor: 'email' },
			});
		} catch (err: any) {
			console.log('error in register = ', err);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setRegisterDetails({
			...registerDetails,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<RegisterComponent
			handleRegister={handleRegister}
			registerDetails={registerDetails}
			handleInputChange={handleChange}
			formErrors={formErrors}
			loading={loading}
		/>
	);
};

export default Register;
