import React, { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar as CalendarIcon, Link as LinkIcon, X } from 'lucide-react';
import moment from 'moment/moment';
import AppointmentService, {
	AppointmentInputs,
	appointmentSchema,
} from '../../core/services/appointment-service';
import { RootState } from '../../core/redux/store/store';
import { AppointmentActions } from '../../core/redux/reducers/appointmentSlice';
import Label from '../../components/ui/label';
import SelectField from '../../components/ui/select-field';
import { Input, InputError } from '../../components/ui/input-field';
import { TimeInputField } from '../../components/ui/time-input-field';
import AddPatient from '../patient/add-patient';
import { Button } from '../../components/ui/button';
import { getAllCasesOfPatientService } from '../../core/services/patient.service';
import Divider from '../../components/ui/divider';
import Card from '../../components/ui/card';
import { IPatientCaseResponse } from '../../core/interfaces/case.interface';
import Modal from '../../components/ui/modal';
import { setAppointmentToPatient } from '../../core/redux/reducers/patientSlice';
import { IUpcomingAppointmentsForAWorkspace } from '../../core/interfaces/appointment.interface';
import { updateUpcomingAppointmentsFromAWorkspace } from '../../core/redux/reducers/workspaceSlice';
import CustomSelect from '../../components/ui/custom-select';

type AddAppointmentForm = {
	handleCloseDrawer?: () => void;
	defaultValues?: AppointmentInputs & { id?: number };
	isUpdate: boolean;
	hideAddPatientBtn?: boolean;
};

export const defaultAppointmentFormValues: AppointmentInputs = {
	patientId: '',
	problem: '',
	reasonOfVisit: '',
	date: new Date(),
	startAt: '09:00',
	endAt: '10:00',
};

const AddAppointmentForm = ({
	handleCloseDrawer,
	defaultValues,
	isUpdate,
	hideAddPatientBtn,
}: AddAppointmentForm) => {
	// const isUpdate = Boolean(defaultValues);

	const [addPatientVisible, setAddPatientVisible] = useState(false);
	const [isLinkedToExistingCase, setIsLinkedToExistingCase] = useState(false);
	const currentWorkspaceSlug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug,
	);
	const allPatients = useSelector(
		(state: RootState) => state.patient.allPatientsInfo ?? [],
	);
	const [isLoading, setIsLoading] = useState(false);
	const [patientCases, setPatientCases] = useState<IPatientCaseResponse>({});

	const {
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
		reset,
	} = useForm<AppointmentInputs>({
		defaultValues: {
			startAt: '09:00',
			endAt: '10:00',
			date: new Date(),
			...(defaultValues || {}),
		},
		resolver: zodResolver(appointmentSchema),
	});

	const [appointmentDate] = watch(['date']);
	const [patientIdWatched] = watch(['patientId']);
	const calendarRef = useRef<typeof Calendar>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (defaultValues && defaultValues.case) {
			setIsLinkedToExistingCase(true);
		}
	}, [defaultValues]);

	React.useEffect(() => {
		if (isLinkedToExistingCase && patientIdWatched) {
			const patientId = Number(patientIdWatched);
			getAllCasesOfPatientService(patientId, currentWorkspaceSlug).then(
				(cases) => {
					setPatientCases(cases);
				},
			);
		}
	}, [isLinkedToExistingCase, patientIdWatched]);

	const onSubmit: SubmitHandler<AppointmentInputs> = async (data, event) => {
		setIsLoading(true);

		if (isUpdate && defaultValues && defaultValues.id) {
			const { startAt, endAt } = AppointmentService.getStartAndEndTimes(
				data.date,
				data.startAt,
				data.endAt,
			);
			const res = await AppointmentService.updateAppointment(
				defaultValues.id,
				currentWorkspaceSlug ?? '',
				{
					date: startAt,
					start_at: startAt,
					end_at: endAt,
					problem: data.problem,
					patient_id: Number(data.patientId),
					reason_of_visit: data.reasonOfVisit,
				},
			);
			dispatch(AppointmentActions.addAppointment(res));
			setIsLoading(false);
			handleCloseDrawer?.();
		} else {
			try {
				const res = await AppointmentService.createAppointment(
					data,
					currentWorkspaceSlug ?? '',
				);
				dispatch(AppointmentActions.addAppointment(res));
				if (res?.id && res?.patient_id) {
					const appointmentDetail = {
						date: res.date || '',
						start_at: res.start_at || '',
						end_at: res.end_at || '',
						problem: res.problem || '',
						reason_of_visit: res.reason_of_visit || '',
						status: res.status || '',
						cancellation_note: res.cancellation_note || '',
					};
					// optimistic update for patient for whom the appointment has been created to reflect the change without having to call any api
					dispatch(
						setAppointmentToPatient({
							appointmentDetail,
							patientId: res.patient_id,
						}),
					);

					if (currentWorkspaceSlug) {
						// optimistic update for upcoming appointments on workspace dashboard page
						const { status, ...rest } = appointmentDetail;
						const upcomingAppointmentsForWorkpace: IUpcomingAppointmentsForAWorkspace =
							{
								...rest,
								patient_avatar_url: res.avatar_url || '',
								case_id: res.case_id
									? res.case_id.toString()
									: '',
								id: res.id,
								case_name: '',
								patient_id: res.patient_id,
								workspace_patient_id:
									res.workspace_patient_id || 'N/A',
								patient_name:
									res.first_name + res.last_name
										? ` ${res.last_name}`
										: '',
							};
						dispatch(
							updateUpcomingAppointmentsFromAWorkspace(
								upcomingAppointmentsForWorkpace,
							),
						);
					}
				}
				setIsLoading(false);
				handleCloseDrawer?.();
			} catch (error: any) {
				setIsLoading(false);
			}
		}
		// reset form
		reset(defaultAppointmentFormValues);
	};

	const handleTogglePatientModal = async () => {
		setAddPatientVisible(!addPatientVisible);
	};

	React.useEffect(() => {
		if (defaultValues) {
			setValue('startAt', defaultValues.startAt || '09:00');
			setValue('endAt', defaultValues.endAt || '10:00');
			setValue('date', defaultValues.date || new Date());
			setValue('patientId', defaultValues.patientId || '');
			setValue('problem', defaultValues.problem || '');
			setValue('reasonOfVisit', defaultValues.reasonOfVisit || '');
			if (defaultValues.case) setValue('case', defaultValues.case);
		} else {
			reset(defaultAppointmentFormValues);
		}
	}, [defaultValues]);

	const startDate = moment(appointmentDate)
		.set('hour', moment(watch('startAt'), 'hh:mma').hours())
		.set('minute', moment(watch('startAt'), 'hh:mma').minutes())
		.local()
		.toDate();

	return (
		<div>
			<form
				className="pt-20 flex flex-col justify-between min-h-screen"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={'px-8 '}>
					<div className={'flex items-center justify-between'}>
						<div className={'text-xl'}>
							{isUpdate
								? 'Update Appointment'
								: 'Add Appointment'}
						</div>
						<X
							onClick={handleCloseDrawer}
							className={'cursor-pointer'}
						/>
					</div>
					<Divider />

					<div className={'my-2'}>
						<Label>Choose your patient</Label>
						<Controller
							name="patientId"
							control={control}
							render={({ field }) => {
								const patient = allPatients.find(
									(p) => String(p.id) === field?.value,
								);

								return (
									<CustomSelect
										value={
											patient
												? {
														label: `${patient.id}. ${patient.first_name} ${patient.last_name}`,
														value: patient.id.toString(),
												  }
												: null
										}
										placeholder="Search patient "
										options={allPatients.map((p) => ({
											label: `${p.id}. ${p.first_name} ${p.last_name}`,
											value: `${p.id}`,
										}))}
										onChange={(newValue) => {
											if (newValue?.value) {
												field.onChange({
													target: {
														value: newValue?.value,
													},
												});
											}
										}}
									/>
								);
							}}
						/>
					</div>
					{!isUpdate && !hideAddPatientBtn && (
						<div
							className="text-blue-600 text-base font-normal leading-normal cursor-pointer  mb-5"
							onClick={handleTogglePatientModal}
						>
							+ Add patient
						</div>
					)}

					<div className={'my-2'}>
						<Label>Appointment time</Label>
						<div className={'flex items-center gap-4 mt-2'}>
							<Controller
								name="startAt"
								control={control}
								render={({ field }) => (
									<TimeInputField
										className={'w-full'}
										{...field}
									/>
								)}
							/>

							<div className="text-zinc-800 text-base font-normal">
								-
							</div>
							<Controller
								name="endAt"
								control={control}
								render={({ field }) => (
									<TimeInputField
										{...field}
										className={'w-full'}
									/>
								)}
							/>
						</div>
					</div>

					<div className={'my-2'}>
						<Label>Appointment date</Label>
						<div className="w-full px-3 py-3 bg-sapphirePale rounded flex justify-between items-center my-2">
							<div className="text-zinc-800 text-xs font-normal leading-tight ">
								{appointmentDate.toDateString()}
							</div>

							<CalendarIcon className={'text-zinc-500 h-5 w-5'} />
						</div>
						<InputError error={errors.date?.message} />
						<Card className={'mb-4'}>
							<Calendar
								ref={calendarRef}
								value={startDate}
								onChange={(date) =>
									setValue('date', date as Date, {
										shouldValidate: true,
									})
								}
								className={'w-full mx-auto'}
								calendarType={'US'}
							/>
						</Card>
					</div>

					<div className={'my-2'}>
						<Label>Problem</Label>
						<Controller
							name="problem"
							control={control}
							render={({ field }) => (
								<Input
									placeholder={'Search problem'}
									error={errors.problem?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className={'my-2'}>
						<Label>Main reason of visit</Label>
						<Controller
							name="reasonOfVisit"
							control={control}
							render={({ field }) => (
								<Input
									error={errors.reasonOfVisit?.message}
									placeholder={'Search the reason of visit'}
									{...field}
								/>
							)}
						/>
					</div>

					{Object.keys(patientCases).length > 0 && (
						<React.Fragment>
							<div
								className={
									'my-2 flex items-center  justify-between '
								}
							>
								<div className={'flex gap-2'}>
									<LinkIcon
										className={'text-blue-600 w-5 h-5'}
									/>
									<Label className={' text-blue-600 text-sm'}>
										Link to an existing case
									</Label>
								</div>
								<Input
									name={'isLinkedToExistingCase'}
									type={'checkbox'}
									error={errors.case?.message}
									placeholder={'Search case'}
									defaultChecked={isLinkedToExistingCase}
									className={
										'w-4 h-4 outline-none justify-self-end'
									}
									onChange={() =>
										setIsLinkedToExistingCase(
											!isLinkedToExistingCase,
										)
									}
									value={''}
								/>
							</div>

							{isLinkedToExistingCase && (
								<div className={'my-2'}>
									<Label>Select Case</Label>
									<Controller
										name="patientId"
										control={control}
										render={({ field }) => (
											<SelectField
												selectedId={
													defaultValues?.case
														? defaultValues.case
														: ''
												}
												placeholder="Search case "
												options={Object.values(
													patientCases,
												)
													.reduce(
														(
															accumulator,
															currentValue,
														) =>
															accumulator.concat(
																currentValue,
															),
														[],
													)
													.map((pCase) => ({
														label: pCase.name,
														value: `${pCase.id}`,
													}))}
												error={errors.case?.message}
												{...field}
											/>
										)}
									/>
								</div>
							)}
						</React.Fragment>
					)}
				</div>

				<Button
					type={'submit'}
					className={
						'w-full rounded-none h-12 bg-red-500 uppercase mb-0'
					}
					disabled={isLoading}
				>
					{isLoading ? (
						'Loading...'
					) : (
						<React.Fragment>
							{isUpdate ? 'Update' : 'Save'}
						</React.Fragment>
					)}
				</Button>
			</form>
			<Modal
				open={addPatientVisible}
				onRequestClose={handleTogglePatientModal}
				className={
					'focus-visible:outline-none  sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
				}
			>
				<AddPatient hideModal={handleTogglePatientModal} />
			</Modal>
		</div>
	);
};

export default AddAppointmentForm;
