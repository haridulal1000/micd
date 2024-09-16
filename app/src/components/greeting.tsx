import React from 'react';
import getCurrentGreeting from '../core/utilities/dateTime';
import { getFullName } from '../core/utilities/name';
import { IUserProfileResponse } from '../core/interfaces/userProfile.interface';

const Greeting = (props: { userProfile: IUserProfileResponse }) => (
	<div className="rounded-lg my-6" id="recent-activities">
		<p className="text-md">{getCurrentGreeting()},</p>
		<h2 className="py-4 text-primary font-semibold">
			{props.userProfile &&
				getFullName(
					props.userProfile.first_name,
					props.userProfile.last_name,
				)}
		</h2>
		{/* <p className="title my-4">Recent Activities</p>
		<div className="flex justify-between">
			<div className="flex items-center">
				<div className="rounded-full w-11 border border-white mr-3">
					<img
						src="/test-profile-pic.jpeg"
						className="object-cover rounded-full w-6"
						alt="profile"
					/>
				</div>
				<p>
					Rajesh Uprety accepted the invitation of
					Sushil Koirala to join MICDSoft
				</p>
			</div>
			<div className="flex mt-3 sm:mt-0 justify-between sm:justify-start">
				<span className="sub-text sm:mx-5">
					3 min ago
				</span>
				<img
					src="/workspace-gray.svg"
					alt="workspace"
				/>
			</div>
		</div> */}
	</div>
);

export default Greeting;
