import React, { useReducer, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './profile-header.scss';

function ProfileHeader() {
	// const profileHeaderRef = useRef(null);

	return (
		<div
			// ref={profileHeaderRef}
			className="profile-header flex items-center gap-8 my-4 w-full bg-white px-4 py-2"
		>
			<NavLink
				to={'summary'}
				className={(navData) =>
					!navData.isActive
						? 'flex items-center gap-1'
						: 'flex items-center gap-1 active'
				}
			>
				<i className="profile-icon"></i> <span>Summary</span>
				<i className="dropdown-icon"></i>
			</NavLink>
			<NavLink
				to={'lifestyle'}
				className={(navData) =>
					!navData.isActive
						? 'flex items-center gap-1'
						: 'flex items-center gap-1 active'
				}
			>
				<i className="history-icon"></i>
				<span>LIFEstyle & History</span>
				<i className="dropdown-icon"></i>
			</NavLink>
			<NavLink
				to={'general-examination'}
				className={(navData) =>
					!navData.isActive
						? 'flex items-center gap-1'
						: 'flex items-center gap-1 active'
				}
			>
				<i className="search-icon"></i>
				<span>General Examination</span>
				<i className="dropdown-icon"></i>
			</NavLink>
			<NavLink
				to={'problem-box'}
				className={(navData) =>
					!navData.isActive
						? 'flex items-center gap-1'
						: 'flex items-center gap-1 active'
				}
			>
				<i className="problem-box-icon"></i>
				<span>Problem Box</span>
				<i className="dropdown-icon"></i>
			</NavLink>
			<NavLink
				to={'case-library'}
				className={(navData) =>
					!navData.isActive
						? 'flex items-center gap-1'
						: 'flex items-center gap-1 active'
				}
			>
				<i className="case-library-icon"></i>

				<span>Case Library</span>
				<i className="dropdown-icon"></i>
			</NavLink>
		</div>
	);
}

export default ProfileHeader;
