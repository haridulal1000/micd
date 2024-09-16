import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginDets, ILoginError } from '../../core/interfaces/auth.interface';
import {
	IHandleFunc,
	IHandleInputChange,
} from '../../core/interfaces/common.interface';
import InputField from '../shared/form/input';
import SecondaryBtn from '../shared/form/btn';
import Header from '../header';
import { Button } from '../ui/button';

interface LoginComponentProps {
	handleLogin: IHandleFunc;
	loginDetails: ILoginDets;
	handleInputChange: IHandleInputChange;
	formErrors: ILoginError;
	loading: boolean;
}

const LoginComponent = (props: LoginComponentProps) => {
	const {
		handleLogin,
		loginDetails,
		handleInputChange,
		formErrors,
		loading,
	} = props;

	const navigate = useNavigate();

	return (
		<div className="w-full flex">
			<div className="bg-login-page bg-contain bg-saphireLight bg-no-repeat min-h-screen w-full lg:w-2/3">
				<Header withLogin={false} />
				<div className="flex flex-wrap">
					<div className="m-auto sm:m-0 self-center pl-8 xl:pl-32">
						<h1>Empowering</h1>
						<h1>patients</h1>
						<p className="mt-8 max-w-sm">
							Minimizing the frustrations of a dentist and
							benefiting the patient in every possible way.
						</p>
					</div>
					<form
						onSubmit={handleLogin}
						className="primary-card bg-white flex flex-col gap-5 p-8 w-full m-auto my-8 lg:px-10 lg:py-9 lg:ml-auto lg:-mr-48 max-w-sm 2xl:max-w-lg 2xl:-mr-64 z-[2]"
						data-testid="form"
					>
						<h2 className="font-bold leading-10 text-left">
							Login
						</h2>
						<div>
							<InputField
								name={'email'}
								type={'email'}
								label={'Email'}
								value={loginDetails.email}
								errors={formErrors.email}
								onChange={handleInputChange}
								placeholder="Enter a valid email"
							/>
						</div>

						<div>
							<InputField
								name={'password'}
								type={'password'}
								label={'Password'}
								value={loginDetails.password}
								errors={formErrors.password}
								onChange={handleInputChange}
								placeholder="Password"
							/>
						</div>

						<div className="flex justify-between items-center mb-6">
							<div className="form-group form-check">
								<input
									type="checkbox"
									className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									id="exampleCheck2"
									name="exampleCheck2"
								/>
								<label
									className="form-check-label mt-1 text-xs inline-block text-gray-800 2xl:text-base"
									htmlFor="exampleCheck2"
								>
									Remember me
								</label>
							</div>
							<label
								className="text-gray-800 mt-1 text-xs cursor-pointer 2xl:text-base"
								onClick={() => navigate('/forget-password')}
							>
								Forgot password?
							</label>
						</div>

						<div className="text-center ">
							<SecondaryBtn disabled={loading} type={'submit'}>
								{loading ? 'loading...' : 'Login'}
							</SecondaryBtn>
							<p
								className="text-xs font-normal mt-2 pt-1 mb-0 cursor-pointer 2xl:text-base"
								onClick={() => navigate('/register')}
							>
								Are you a new user? Please{' '}
								<span className="text-red-600 font-bold hover:text-accent-700">
									Register to continue
								</span>
							</p>
						</div>
					</form>
				</div>
			</div>
			<div className="bg-login-page-bottom flex-1 bg-bottom bg-contain bg-no-repeat hidden lg:block z-[1]"></div>
		</div>
	);
};

export default LoginComponent;
