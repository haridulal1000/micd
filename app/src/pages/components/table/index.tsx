import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	IPatient,
	IPageInfo,
} from '../../../core/interfaces/patient.interface';
import Pagination from '../pagination';
import { getFullName, getNameAbbreviation } from '../../../core/utilities/name';
import { setSelectedPatient } from '../../../core/redux/reducers/patientSlice';
import { makeDateTimeString } from '../../dashboard/upcoming-appointment/upcoming-appointment-card';
import { PrimaryBtn } from '../../../components/shared/form/btn';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import DateTimeRainbowPill from '../../../components/date-time-rainbow-pill';
import Spinner from '../../../components/ui/Spinner';

const ListTable = (props: {
	pageInfo: IPageInfo | null;
	allPatientsInfo: IPatient[];
	isTableDataLoading?: boolean;
	handlePageOnClick: (pageNumber: number) => void;
	handleSortClick: (column: string) => void;
	handleOpenAddAppointmentDrawer: (
		e: SyntheticEvent,
		patientId: number,
	) => void;
	sortInfo: any;
}) => {
	const navigate = useNavigate();
	const [sortName, setSortName] = useState(true);
	const [sortId, setSortId] = useState(true);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const dispatch: AppDispatch = useDispatch();

	return (
		<div className="relative  bg-white p-3 rounded-2xl">
			<table className="patient-table w-full text-sm text-left text-gray-500 ">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
					<tr>
						<th
							scope="col"
							className="p-3 font-light whitespace-nowrap"
						>
							<div className="flex flex-nowrap gap-2">
								PATIENT ID
								<img
									src="/sort.svg"
									className={`cursor-pointer 
										${sortId ? 'rotate-180' : ''}
									`}
									onClick={() => {
										setSortId(!sortId);
										// TODO: since we don't have sorting based on workspace_patient_id for now , we need to implement this after changes in backend
										props.handleSortClick('id');
									}}
								/>
							</div>
						</th>
						<th
							scope="col"
							className="p-3 flex flex-row gap-2 items-center font-light"
						>
							<div className="flex flex-nowrap gap-2">
								<div className="flex flex-nowrap gap-2">
									NAME
									<img
										src="/sort.svg"
										className={`cursor-pointer 
											${sortName ? 'rotate-180' : ''}
										`}
										onClick={() => {
											setSortName(!sortName);
											props.handleSortClick('name');
										}}
									/>
								</div>
							</div>
						</th>
						<th scope="col" className="px-3 py-3 font-light">
							<div className="flex flex-nowrap gap-2">
								<div className="flex flex-nowrap gap-2">
									CONTACT NUMBER
									<img
										src="/sort.svg"
										className={`cursor-pointer 
											${props.sortInfo.sort === 'contact_number' && 'rotate-180'}
										`}
										onClick={() =>
											props.handleSortClick(
												'contact_number',
											)
										}
									/>
								</div>
							</div>
						</th>
						<th scope="col" className="px-3 py-3 font-light">
							<div className="flex flex-nowrap gap-2">
								<div className="flex flex-nowrap gap-2">
									ADDRESS
									<img
										src="/sort.svg"
										className={`cursor-pointer 
											${props.sortInfo.sort === 'address' && 'rotate-180'}
										`}
										onClick={() =>
											props.handleSortClick('address')
										}
									/>
								</div>
							</div>
						</th>
						<th scope="col" className="p-3 font-light">
							<div className="flex flex-nowrap gap-2">
								<div className="flex flex-nowrap gap-2">
									EMAIL
									<img
										src="/sort.svg"
										className={`cursor-pointer 
											${props.sortInfo.sort === 'email' && 'rotate-180'}
										`}
										onClick={() =>
											props.handleSortClick('email')
										}
									/>
								</div>
							</div>
						</th>
						<th
							scope="col"
							className="p-3 font-light whitespace-nowrap"
						>
							APPOINTMENT TIME
						</th>
					</tr>
				</thead>
				<tbody>
					{!props.isTableDataLoading && (
						<>
							{props.allPatientsInfo.map((patient: IPatient) => (
								<tr
									key={patient.id}
									className="bg-white cursor-pointer"
								>
									<td className="px-3 py-3">
										{patient.workspace_patient_id || 'N/A'}
									</td>
									<td
										scope="row"
										className="flex flex-row items-center gap-3 px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
										onClick={() => {
											dispatch(
												setSelectedPatient(patient),
											);
											navigate(
												`/workspace/${workspaceInfo?.slug}/patients/${patient.id}/summary`,
												{
													state: {
														workspace_slug:
															workspaceInfo?.slug,
														patient_id: patient.id,
													},
												},
											);
										}}
									>
										{/* uncomment the div below if you want the patient avatar in the patients list  */}
										{/* <div
											style={{
												width: '50px',
												height: '50px',
												borderRadius: '50%',
												fontSize: '20px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												outline: '2px solid #E5ECFF',
												outlineColor: '#E5ECFF',
												outlineOffset: '2px',
												backgroundColor: '#E5ECFF',
											}}
										>
											{getNameAbbreviation(
												patient.first_name,
												patient.last_name,
											)}
										</div> */}
										<span className={'text-grayText'}>
											{getFullName(
												patient.first_name,
												patient.last_name,
											)}
										</span>
										{/* <span className="new">New</span> */}
									</td>
									<td className="px-3 py-3">
										{patient.contact_number}
									</td>
									<td className="px-3 py-3">
										{patient.address}
									</td>
									<td className="p-3">
										{patient.email ? (
											patient.email
										) : (
											<p>N/A</p>
										)}
									</td>
									{patient.next_appointment ? (
										<DateTimeRainbowPill
											value={makeDateTimeString(
												parseInt(
													patient.next_appointment
														.start_at,
													10,
												),
											)}
										/>
									) : (
										<PrimaryBtn
											classes={'w-[13rem] p-2 font-light'}
											onClick={(e: SyntheticEvent) =>
												props.handleOpenAddAppointmentDrawer(
													e,
													patient.id,
												)
											}
										>
											Create Appointment
										</PrimaryBtn>
									)}
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
			{props.isTableDataLoading && (
				<div className="flex w-full justify-center items-center h-[5rem]">
					<Spinner />
				</div>
			)}
			<div className="py-5 px-3 float-right">
				{props.pageInfo && (
					<Pagination
						pageInfo={props.pageInfo}
						handlePageOnClick={props.handlePageOnClick}
					/>
				)}
			</div>
		</div>
	);
};

export default ListTable;
