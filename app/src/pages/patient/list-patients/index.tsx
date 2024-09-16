import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListTable from '../../components/table';
import Search from '../../../components/shared/form/search';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import { getAllPatients } from '../../../core/redux/actions/patientActions';
import { AddBtn } from '../../../components/shared/form/btn';
import AddPatient from '../add-patient';
import {
	IPatient,
	IPageInfo,
	IPatientRequest,
} from '../../../core/interfaces/patient.interface';
import Drawer from '../../../components/ui/drawer';
import AddAppointmentForm, {
	defaultAppointmentFormValues,
} from '../../appointments/add-appointment-form';
import { AppointmentInputs } from '../../../core/services/appointment-service';
import Greeting from '../../../components/greeting';

type SortColumns = 'name' | 'contact_number' | 'address' | 'email' | 'id';
type Orders = 'asc' | 'desc';

const ListPatientsTable = (props: {
	allPatientsInfo: IPatient[];
	pageInfo: IPageInfo | null;
	handlePageOnClick: any;
	isListPatientsDataLoading?: boolean;
	handleSortClick: any;
	sortInfo: any;
	handleOpenAddAppointmentDrawer: (
		e: SyntheticEvent,
		patientId: number,
	) => void;
}) => (
	<>
		{props.allPatientsInfo && props.allPatientsInfo.length !== 0 ? (
			<ListTable
				pageInfo={props.pageInfo}
				allPatientsInfo={props.allPatientsInfo}
				handlePageOnClick={props.handlePageOnClick}
				handleSortClick={props.handleSortClick}
				sortInfo={props.sortInfo}
				handleOpenAddAppointmentDrawer={
					props.handleOpenAddAppointmentDrawer
				}
				isTableDataLoading={props.isListPatientsDataLoading}
			/>
		) : (
			<span className="text-sm italic ">
				There are no patients yet. Add patient to see the list.
			</span>
		)}
	</>
);

const ListPatients = () => {
	const dispatch: AppDispatch = useDispatch();
	const [addPatientVisible, setAddPatientVisible] = useState(false);
	const [openAddAppointmentDrawer, setOpenAddAppointmentDrawer] =
		useState(false);
	const [appointmentToEdit, setAppointmentToEdit] = React.useState<
		(AppointmentInputs & { id?: number }) | undefined
	>(defaultAppointmentFormValues);
	const [searchQuery, setSearchQuery] = useState('');

	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);
	const { allPatientsInfo, pageInfo, loading } = useSelector(
		(state: RootState) => state.patient,
	);

	const [sortInfo, setSortInfo] = useState<{
		sort: SortColumns;
		order: Orders;
	}>({
		sort: 'name',
		order: 'asc',
	});

	const handleSortClick = (column: SortColumns) => {
		if (column === sortInfo.sort)
			setSortInfo({
				...sortInfo,
				order: sortInfo.order === 'asc' ? 'desc' : 'asc',
			});
		else
			setSortInfo({
				sort: column,
				order: 'asc',
			});
	};

	const dispatchGetAllPatients = (
		patientQueries: Omit<IPatientRequest, 'workspace'>,
	): void => {
		if (workspaceInfo) {
			dispatch(
				getAllPatients({
					workspace: workspaceInfo.slug,
					sort: patientQueries?.sort || sortInfo.sort,
					order: patientQueries?.order || sortInfo.order,
					search: searchQuery,
					page: patientQueries?.page || 1,
				}),
			);
		}
	};

	const handleOpenAddAppointmentDrawer = (
		e: SyntheticEvent,
		patientId: number,
	) => {
		// e.preventDefault();
		const appointmentData = {
			...defaultAppointmentFormValues,
			patientId: patientId.toString(),
		};
		setAppointmentToEdit(appointmentData);
		setOpenAddAppointmentDrawer(!openAddAppointmentDrawer);
	};

	useEffect(() => {
		dispatchGetAllPatients({ ...sortInfo, page: 1 });
	}, [sortInfo]);

	const handleTogglePatientModal = async () => {
		setAddPatientVisible(!addPatientVisible);
	};

	return (
		<div>
			{addPatientVisible && (
				<div
					className="h-screen w-full bg-black opacity-60 fixed z-10"
					onClick={handleTogglePatientModal}
				></div>
			)}
			<div className="ml-4 pl-5 pr-10 block z-0 ">
				<div className="mr-2 flex flex-row justify-between items-center">
					{userProfile && <Greeting userProfile={userProfile} />}
					<AddBtn
						disabled={false}
						type={'submit'}
						onClick={handleTogglePatientModal}
					>
						{'Add new patient'}
					</AddBtn>
				</div>
				<div className="bg-white">
					<div className="px-4 pt-4">
						<h4 className="font-semibold">Patients' List</h4>
						<div className="mt-5 flex flex-wrap gap-5">
							<Search
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								handleSearchFunc={dispatchGetAllPatients}
								name={'patient'}
								placeholder={
									"Search by patient's name, contact no."
								}
							/>
						</div>
					</div>
					<div className="mt-5">
						<ListPatientsTable
							allPatientsInfo={allPatientsInfo ?? []}
							pageInfo={pageInfo}
							handlePageOnClick={dispatchGetAllPatients}
							handleSortClick={handleSortClick}
							sortInfo={sortInfo}
							handleOpenAddAppointmentDrawer={
								handleOpenAddAppointmentDrawer
							}
							isListPatientsDataLoading={loading}
						/>
					</div>
				</div>
			</div>
			{addPatientVisible && (
				<div className="test-add-patient-modal absolute bottom-0 right-0 z-50 w-2/3 xl:w-1/3 2xl:w-1/3">
					<AddPatient hideModal={handleTogglePatientModal} />
				</div>
			)}

			<Drawer
				isOpen={openAddAppointmentDrawer}
				setOpen={setOpenAddAppointmentDrawer}
			>
				<AddAppointmentForm
					isUpdate={false}
					hideAddPatientBtn={true}
					defaultValues={appointmentToEdit}
					handleCloseDrawer={() => {
						setAppointmentToEdit(undefined);
						setOpenAddAppointmentDrawer(false);
					}}
				/>
			</Drawer>
		</div>
	);
};

export default ListPatients;
