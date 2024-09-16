import React, {
	ChangeEvent,
	KeyboardEvent,
	SyntheticEvent,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import { CodeInputField } from '../../../components/shared/form/input';
import useCodeSubmission from '../../../core/utilities/hooks/useCodeSubmission';
import {
	forgotPassword,
	resendEmailVerificationCode,
	verifyEmail,
	verifyPasswordResetCode,
} from '../../../core/redux/actions/authActions';
import Header from '../../../components/header';
import { ICodeFormat } from '../../../core/interfaces/common.interface';
import { notifySuccess } from '../../../components/shared/form/toast';
import { logout } from '../../../core/redux/reducers/authSlice';
import { updateProfileEmailVerification } from '../../../core/redux/reducers/userProfileSlice';

interface PageHanlerDetailsType {
	email: string;
	verifyFor: string;
}

const CodeVerification = () => {
	const [pageHandlerDetails, setPageHandlerDetails] =
		useState<PageHanlerDetailsType>({
			email: '',
			verifyFor: '',
		});
	const { error, loading, loggedInUserEmail } = useSelector(
		(state: RootState) => state.auth,
	);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch: AppDispatch = useDispatch();
	const { codeValues, checkValues, changeValues } = useCodeSubmission();

	useEffect(() => {
		if (!location.state) {
			navigate('/');
		} else {
			setPageHandlerDetails({
				email: location.state.email,
				verifyFor: location.state.verifyFor,
			});
		}
	}, [location.state]);

	const handleNavigationToLogin = () => {
		dispatch(logout());
	};

	const handleDispatch = () => {
		if (loading) return;
		if (pageHandlerDetails.verifyFor === 'email') {
			dispatch(
				verifyEmail({
					code:
						codeValues.first +
						codeValues.second +
						codeValues.third +
						codeValues.forth +
						codeValues.fifth +
						codeValues.sixth,
				}),
			).then(() => {
				dispatch(updateProfileEmailVerification());
				navigate('/workspace/create');
			});
		} else if (pageHandlerDetails.verifyFor === 'password') {
			dispatch(
				verifyPasswordResetCode({
					password_reset_code:
						codeValues.first +
						codeValues.second +
						codeValues.third +
						codeValues.forth +
						codeValues.fifth +
						codeValues.sixth,
					email: pageHandlerDetails.email,
				}),
			)
				.unwrap()
				.then(() => {
					navigate('/change-password', {
						state: { email: pageHandlerDetails.email },
					});
				});
		}
	};

	const handlekeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		const alphanumeric = /^[a-zA-Z0-9]$/;
		if (
			!alphanumeric.test(event.key) && // input isn't an alphanumeric char and
			!['Backspace', 'Delete'].includes(event.key) // not one of these too,
		)
			return; // skip rest of the stuff

		const target = event.target as typeof event.target & {
			form: HTMLFormElement;
			value: string;
		};

		const codeForm = target.form;
		const { value } = target;

		if (checkValues(value)) handleDispatch();
		if (event.key === 'Backspace' || event.key === 'Delete') {
			const form = codeForm;
			const index = Array.prototype.indexOf.call(form, event.target);
			(form.elements[index - 1] as HTMLElement)?.focus();
		} else if (value) {
			const form = codeForm;
			const index = Array.prototype.indexOf.call(form, event.target);
			(form.elements[index + 1] as HTMLElement)?.focus();
			if (!(form.elements[index + 1] as HTMLElement)) {
				if (checkValues(null)) handleDispatch();
			}
		}
		event.preventDefault();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const target = event.target as typeof event.target & {
			value: string;
			id: string;
		};
		const { value } = target;
		const { id } = target;
		changeValues(id, value);
	};

	const handleResendCode = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!loading) {
			if (pageHandlerDetails.verifyFor === 'email') {
				dispatch(resendEmailVerificationCode())
					.unwrap()
					.then((res) => {
						notifySuccess(
							'Resent verification code. Please check your email.',
						);
					});
			} else if (pageHandlerDetails.verifyFor === 'password') {
				dispatch(forgotPassword({ email: pageHandlerDetails.email }))
					.unwrap()
					.then(() => {
						notifySuccess(
							'Resent verification code. Please check your email.',
						);
					});
			}
		}
	};

	return (
		<>
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
					<Header
						withLogin={true}
						handleNavigationToLogin={handleNavigationToLogin}
					/>
					<form className="primary-card bg-white flex flex-col gap-5 p-8 w-full lg:px-24 lg:py-16 m-auto lg:w-2/3 lg:pb-28">
						<h2 className="font-bold leading-10 text-left mb-5">
							Check your email for a code
						</h2>
						<p className="mb-10">
							We’ve sent a 6-character code to{' '}
							{/* <a href="mailto:someone@yoursite.com"> */}
							<a href="#">
								{pageHandlerDetails.verifyFor === 'email'
									? loggedInUserEmail
									: pageHandlerDetails.email}
							</a>
							. The code expires shortly, so please enter it soon.
						</p>
						<div className="flex flex-col items-center">
							<div className="flex flex-col sm:flex-row gap-2 items-center mb-8">
								{Object.keys(codeValues).map((item: string) => (
									<>
										<div className="flex gap-2 items-center ">
											<CodeInputField
												codeKey={item}
												onChange={handleChange}
												onKeyUp={handlekeyUp}
												hasError={!!error}
												value={
													codeValues[
														item as keyof ICodeFormat
													]
												}
											/>
										</div>
										{item === 'third' && (
											<p className="mx-7 hidden md:block">
												-
											</p>
										)}
									</>
								))}
							</div>
							<div className="h-14 text-accent">
								{error?.replaceAll('"', '')}
							</div>
							<p>
								Did not receive confirmation code?{' '}
								<span
									aria-disabled={loading}
									className="text-blue-500 cursor-pointer underline"
									onClick={(e) => handleResendCode(e)}
								>
									Re-send code
								</span>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CodeVerification;
