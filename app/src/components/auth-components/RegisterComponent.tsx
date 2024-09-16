import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import InputField from '../shared/form/input';
import SecondaryBtn from '../shared/form/btn';
import {
	IHandleFunc,
	IHandleInputChange,
} from '../../core/interfaces/common.interface';
import {
	IRegisterDets,
	ISignUpError,
} from '../../core/interfaces/auth.interface';

interface RegisterComponentProps {
	handleRegister: IHandleFunc;
	registerDetails: IRegisterDets;
	handleInputChange: IHandleInputChange;
	formErrors: ISignUpError;
	loading: boolean;
}

const RegisterComponent = (props: RegisterComponentProps) => {
	const {
		handleRegister,
		registerDetails,
		handleInputChange,
		formErrors,
		loading,
	} = props;
	const navigate = useNavigate();

	return (
		<div className="relative">
			<div className="bg-cover w-full pt-0 relative min-h-screen z-0">
				<img
					src="/register-bg.svg"
					alt=""
					className="absolute z-[1] w-1/2"
				/>
				<img
					src="/register-bg-2.svg"
					alt=""
					className="absolute right-0 bottom-0 z-[1] w-1/2"
				/>
			</div>
			<div className="p-12 pt-0 absolute top-0 left-0 w-full z-10">
				<Header withLogin={true} />
				<form
					className="primary-card bg-white flex flex-col gap-5 p-4 w-full lg:px-24 lg:py-16 m-auto lg:w-2/3"
					onSubmit={handleRegister}
				>
					<h2 className="font-bold leading-10 text-left mb-10">
						Register
					</h2>
					<div className="flex items-center flex-wrap md:flex-nowrap w-full gap-4">
						<div className="w-full md:w-1/2">
							<InputField
								name={'first_name'}
								type={'text'}
								label={'First name'}
								value={registerDetails.first_name}
								errors={formErrors.firstName}
								placeholder="First name"
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<InputField
								name={'last_name'}
								type={'text'}
								label={'Last name'}
								value={registerDetails.last_name}
								errors={formErrors.lastName}
								onChange={handleInputChange}
								placeholder="Last name"
							/>
						</div>
					</div>
					<InputField
						name={'email'}
						type={'email'}
						label={'Email'}
						value={registerDetails.email}
						errors={formErrors.email}
						onChange={handleInputChange}
						placeholder="Enter a valid email"
					/>
					<div className="flex flex-wrap md:flex-nowrap items-center w-full gap-4">
						<div className="w-full md:w-1/2">
							<InputField
								name={'password'}
								type={'password'}
								label={'Choose password'}
								value={registerDetails.password}
								errors={formErrors.password}
								onChange={handleInputChange}
								placeholder="Enter password"
							/>
						</div>
						<div className="w-full md:w-1/2">
							<InputField
								name={'repeat_password'}
								errors={formErrors.repeatPassword}
								type={'password'}
								value={registerDetails.repeat_password}
								label={'Re-enter Password'}
								onChange={handleInputChange}
								placeholder="Enter password"
							/>
						</div>
					</div>
					<SecondaryBtn disabled={loading} type={'submit'}>
						{loading ? 'loading...' : 'Create an account'}
					</SecondaryBtn>
					<div>
						<p className="text-sm mt-2 pt-1 mb-0">
							Are you already a member? Please{' '}
							<span
								className="font-bold cursor-pointer"
								onClick={() => navigate('/')}
							>
								Login to continue{' '}
							</span>
						</p>
					</div>
				</form>
				<div className="h-14"></div>
			</div>
		</div>
	);
};

export default RegisterComponent;
