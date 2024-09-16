import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import InputField from '../shared/form/input';
import SecondaryBtn from '../shared/form/btn';
import {
	IChangePassword,
	IChangePasswordError,
} from '../../core/interfaces/auth.interface';
import {
	IHandleFunc,
	IHandleInputChange,
} from '../../core/interfaces/common.interface';

interface ChangePasswordComponentProps {
	handleChangePassword: IHandleFunc;
	changePassDets: IChangePassword;
	handleInputChange: IHandleInputChange;
	formErrors: IChangePasswordError;
	loading: boolean;
}

const ChangePasswordComponent = (props: ChangePasswordComponentProps) => {
	const navigate = useNavigate();

	const {
		handleChangePassword,
		changePassDets,
		handleInputChange,
		formErrors,
		loading,
	} = props;

	return (
		<div className="w-full flex">
			<div className="bg-forgot-password-page-left bg-contain bg-repeat min-h-screen w-full lg:w-1/2">
				<Header withLogin={false} />
				<div className="flex flex-wrap">
					<form
						onSubmit={handleChangePassword}
						className="primary-card bg-white flex flex-col gap-5 p-8 w-full m-auto my-8 lg:px-24 lg:py-16 lg:ml-auto lg:-mr-64 max-w-lg 2xl:max-w-2xl 2xl:-mr-80"
						data-testid="form"
					>
						<h2 className="font-bold leading-10 text-left">
							Reset Password
						</h2>
						<p className="text-s font-normal mt-6 pt-1 mb-6 cursor-pointer 2xl:text-base text-left">
							Your identity has been identify. Set your new
							password.
						</p>
						<div>
							<InputField
								name={'password'}
								type={'password'}
								label={'New Password'}
								value={changePassDets.password}
								errors={formErrors.password}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<InputField
								name={'repeat_password'}
								type={'password'}
								label={'Confirm Password'}
								value={changePassDets.repeat_password}
								errors={formErrors.repeatPassword}
								onChange={handleInputChange}
							/>
						</div>

						<div className="text-center mt-0">
							<SecondaryBtn disabled={loading} type={'submit'}>
								{loading ? 'loading...' : 'Reset Password'}
							</SecondaryBtn>
							<p
								className="text-xs font-normal mt-6 pt-1 mb-4 cursor-pointer 2xl:text-base text-left back-to-login"
								onClick={() => navigate('/')}
							>
								← Back to Login
							</p>
						</div>
					</form>
				</div>
			</div>
			<div className="bg-forgot-password-page-bottom-right flex-1 bg-bottom -z-20 bg-contain bg-no-repeat lg:block"></div>
		</div>
	);
};

export default ChangePasswordComponent;
