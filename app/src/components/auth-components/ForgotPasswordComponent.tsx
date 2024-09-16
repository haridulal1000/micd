import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../shared/form/input';
import SecondaryBtn from '../shared/form/btn';
import Header from '../header';
import {
	IForgotPasswordDets,
	IForgotPasswordError,
} from '../../core/interfaces/auth.interface';
import {
	IHandleFunc,
	IHandleInputChange,
} from '../../core/interfaces/common.interface';

interface ForgotPasswordComponentProps {
	handleRequestCode: IHandleFunc;
	forgotPasswordDets: IForgotPasswordDets;
	handleInputChange: IHandleInputChange;
	formErrors: IForgotPasswordError;
	loading: boolean;
}

const ForgotPasswordComponent = (props: ForgotPasswordComponentProps) => {
	const {
		loading,
		handleRequestCode,
		forgotPasswordDets,
		handleInputChange,
		formErrors,
	} = props;
	const navigate = useNavigate();

	return (
		<div className="w-full flex">
			<div className="bg-forgot-password-page-left bg-contain bg-repeat min-h-screen w-full lg:w-1/2">
				<Header withLogin={false} />
				<div className="flex flex-wrap">
					<form
						onSubmit={handleRequestCode}
						className="primary-card bg-white flex flex-col gap-5 p-8 w-full m-auto my-8 lg:px-24 lg:py-16 lg:ml-auto lg:-mr-64 max-w-lg 2xl:max-w-2xl 2xl:-mr-80"
						data-testid="form"
					>
						<h2 className="font-bold leading-10 text-left">
							Forgot Password
						</h2>
						<p className="text-s font-normal mt-6 pt-1 mb-6 cursor-pointer 2xl:text-base text-left">
							We'll send confirmation code to reset the password
							in your email.
						</p>
						<div>
							<InputField
								name={'email'}
								type={'email'}
								label={'Email'}
								errors={formErrors.email}
								value={forgotPasswordDets.email}
								onChange={handleInputChange}
								placeholder="Enter a valid email"
							/>
						</div>

						<div className="text-center mt-0">
							<SecondaryBtn disabled={loading} type={'submit'}>
								{loading
									? 'loading...'
									: 'Send confirmation code'}
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

export default ForgotPasswordComponent;
