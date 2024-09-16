import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import UpdateUserProfileForm from '../../components/form/updateUserProfileForm';
import ChangeCurrentPasswordForm from '../../components/form/changeCurrentPasswordForm';
import { getUserProfile } from '../../../core/redux/actions/userProfileActions';
import DashboardHeader from '../../../components/dashboard-header';
import UserAvatar from '../../../components/UserAvatar';

const UpdateUserProfile = () => {
	const { loading, userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserProfile());
	}, []);

	const navigate = useNavigate();

	const [profileInfoVisibility, setProfileInfoVisibility] =
		useState<boolean>(true);
	const [changePasswordVisibility, setChangePasswordVisibility] =
		useState<boolean>(false);

	const showProfileInfoVisibility = () => {
		setProfileInfoVisibility(true);
		setChangePasswordVisibility(false);
	};

	const showChangePasswordVisibility = () => {
		setChangePasswordVisibility(true);
		setProfileInfoVisibility(false);
	};

	return (
		<div>
			<DashboardHeader />
			<div className="p-10 bg-light header-sahdow">
				<div className=" font-normal text-nightGray flex flex-wrap items-center gap-5">
					<p
						className="hover:cursor-pointer hover:text-darkGray"
						onClick={() => navigate('/dashboard')}
					>
						Dashboard
					</p>
					<svg
						width="8"
						height="12"
						viewBox="0 0 8 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.83019 5.2897L2.59019 1.0497C2.49722 0.955976 2.38662 0.881582 2.26476 0.830813C2.1429 0.780044 2.0122 0.753906 1.88019 0.753906C1.74818 0.753906 1.61747 0.780044 1.49561 0.830813C1.37375 0.881582 1.26315 0.955976 1.17019 1.0497C0.983936 1.23707 0.879395 1.49052 0.879395 1.7547C0.879395 2.01889 0.983936 2.27234 1.17019 2.4597L4.71019 5.9997L1.17019 9.5397C0.983936 9.72707 0.879395 9.98052 0.879395 10.2447C0.879395 10.5089 0.983936 10.7623 1.17019 10.9497C1.26363 11.0424 1.37444 11.1157 1.49628 11.1655C1.61812 11.2152 1.74858 11.2405 1.88019 11.2397C2.01179 11.2405 2.14226 11.2152 2.26409 11.1655C2.38593 11.1157 2.49675 11.0424 2.59019 10.9497L6.83019 6.7097C6.92392 6.61674 6.99831 6.50614 7.04908 6.38428C7.09985 6.26242 7.12599 6.13172 7.12599 5.9997C7.12599 5.86769 7.09985 5.73699 7.04908 5.61513C6.99831 5.49327 6.92392 5.38267 6.83019 5.2897Z"
							fill="#78797E"
						/>
					</svg>{' '}
					<p>Profile</p>
				</div>
				<div className="w-full flex flex-wrap justify-center items-center my-5">
					<div className="sm:w-full md:w-2/3 lg:w-2/3 xl:w-1/2  ">
						<div className="relative update-profile-card">
							<div className="absolute xs:w-full sm:w-full md:w-full lg:w-2/3 xl:w-3/5 2xl:w-3/5 md:-left-32 lg:-left-24  xl:-left-24 2xl:-left-28 3xl:-left-64 top-4 z-20">
								<UserAvatar />
							</div>
							<div className=" h-28 gradient-box"></div>
							<div className="h-16"></div>
						</div>
						<div className=" mt-5  p-10 bg-white update-profile-card">
							<div className="flex flex-wrap gap-8 mb-4 text-sm">
								<div
									className={
										profileInfoVisibility
											? 'pb-2 text-primary border-b-2 hover:text-primary hover:border-b-2 hover:cursor-pointer'
											: 'pb-2 hover:text-primary hover:border-b-2 hover:cursor-pointer'
									}
									onClick={showProfileInfoVisibility}
								>
									<p>Profile Information</p>
								</div>
								<div
									className={
										changePasswordVisibility
											? 'pb-2 text-primary border-b-2 hover:text-primary hover:border-b-2 hover:cursor-pointer'
											: 'pb-2 hover:text-primary hover:border-b-2 hover:cursor-pointer'
									}
									onClick={showChangePasswordVisibility}
								>
									<p>Change Password</p>
								</div>
							</div>
							{profileInfoVisibility ? (
								<UpdateUserProfileForm
									userProfile={userProfile}
									loading={loading}
								/>
							) : (
								''
							)}
							{changePasswordVisibility ? (
								<ChangeCurrentPasswordForm />
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateUserProfile;
