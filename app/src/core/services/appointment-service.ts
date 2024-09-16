import { z } from 'zod';
import moment from 'moment';
import getAxiosInstance from './interceptor';
import {
	IAppointment,
	IAppointmentMutResponse,
	IAppointmentUpdate,
} from '../interfaces/appointment.interface';

export const appointmentSchema = z
	.object({
		patientId: z.string({ required_error: 'Patient is required' }),
		problem: z.string({ required_error: 'Problem is required' }),
		reasonOfVisit: z.string({ required_error: 'Reason is required' }),
		case: z.string().optional().nullish(),
		date: z.date({ required_error: 'Date is required' }),
		startAt: z.string({ required_error: 'Start time is required' }),
		endAt: z.string({ required_error: 'End time is required' }),
	})
	.superRefine((values, ctx) => {
		if (values.startAt && values.endAt) {
			const startMoment = moment(values.date)
				.set('hour', moment(values.startAt, 'hh:mma').hours())
				.set('minute', moment(values.startAt, 'hh:mma').minutes());
			const endMoment = moment(values.date)
				.set('hour', moment(values.endAt, 'hh:mma').hours())
				.set('minute', moment(values.endAt, 'hh:mma').minutes());
			if (endMoment.isBefore(startMoment)) {
				ctx.addIssue({
					message: 'End time should be after start time',
					code: z.ZodIssueCode.custom,
					path: ['date'],
				});
			}
		}
	});

export type AppointmentInputs = z.infer<typeof appointmentSchema>;

class AppointmentService {
	public static getStartAndEndTimes = (
		date: Date,
		startAt: string,
		endAt: string,
	): { startAt: number; endAt: number } => {
		const startMoment = moment(date)
			.set('hour', moment(startAt, 'hh:mma').hours())
			.set('minute', moment(startAt, 'hh:mma').minutes());
		const endMoment = moment(date)
			.set('hour', moment(endAt, 'hh:mma').hours())
			.set('minute', moment(endAt, 'hh:mma').minutes());

		return {
			startAt: startMoment.valueOf(),
			endAt: endMoment.valueOf(),
		};
	};

	public static createAppointment = async (
		inputs: AppointmentInputs,
		currentWorkspaceSlug: string,
	): Promise<IAppointmentMutResponse> => {
		const { startAt, endAt } = this.getStartAndEndTimes(
			inputs.date,
			inputs.startAt,
			inputs.endAt,
		);

		const res = await (
			await getAxiosInstance()
		).post(
			'appointment',
			{
				date: startAt,
				end_at: endAt,
				patient_id: Number(inputs.patientId),
				start_at: startAt,
				problem: inputs.problem,
				reason_of_visit: inputs.reasonOfVisit,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);
		return res.data as IAppointmentMutResponse;
	};

	public static getAllAppointments = async (
		currentWorkspaceSlug: string,
	): Promise<IAppointment[]> => {
		const today = moment();
		const oneYearFromToday = today.clone().add(1, 'year');
		const oneYearBackFromToday = moment().subtract(1, 'year');
		const axios = await getAxiosInstance();

		const res = await axios.get(
			`appointments?start_date=${oneYearBackFromToday.format(
				'YYYY-MM-DD',
			)}&end_date=${oneYearFromToday.format('YYYY-MM-DD')}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as IAppointment[];
	};

	public static updateAppointment = async (
		appointmentId: number,
		currentWorkspaceSlug: string,
		toUpdateThings: IAppointmentUpdate,
	): Promise<IAppointmentMutResponse> => {
		const axios = await getAxiosInstance();
		const res = await axios.patch(
			`appointment/${appointmentId}`,
			toUpdateThings,
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as IAppointmentMutResponse;
	};

	public static cancelAppointment = async (
		appointmentId: number,
		currentWorkspaceSlug: string,
		cancellationNote: string,
	): Promise<IAppointmentMutResponse> => {
		const axios = await getAxiosInstance();
		const res = await axios.patch(
			'appointment/cancel',
			{
				appointment_id: appointmentId,
				cancellation_note: cancellationNote,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Workspace: currentWorkspaceSlug,
				},
			},
		);

		return res.data as IAppointmentMutResponse;
	};
}

export default AppointmentService;
