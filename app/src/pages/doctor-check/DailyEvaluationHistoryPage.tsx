import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Calendar from 'react-calendar';

import { RootState } from '../../core/redux/store/store';
import Card from '../../components/ui/card';
import DentistFormsService, {
	FormFieldSavedResponse,
} from '../../core/services/dentist-forms-service';
import Spinner from '../../components/ui/Spinner';
import CssUtils from '../../core/utilities/css-utils';
import DayStartDetailDialog from '../../components/doctor-check/DayStartDetailDialog';
import DayEndDetailDialog from '../../components/doctor-check/DayEndDetailDialog';
import ComplaintsDetailDialog from '../../components/doctor-check/ComplaintsDetailDialog';
import MonthlyEvaluationDialog from '../../components/doctor-check/MonthlyEvaluationDialog';

const DailyEvaluationHistoryPage = () => {
	const navigate = useNavigate();
	const calendarRef = React.useRef<typeof Calendar>(null);
	const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug ?? '',
	);
	const [dentistFormData, setDentistFormData] = React.useState<{
		[key: string]: {
			[key2: string]: FormFieldSavedResponse<
				'monthly_evaluation' | 'complaints' | 'day_start' | 'day_end'
			>;
		};
	}>({});

	const [isLoading, setIsLoading] = React.useState(false);
	const [selectedDayStartDetails, setSelectedDayStartDetails] =
		React.useState<FormFieldSavedResponse<'day_start'> | undefined>();
	const [selectedDayEndDetails, setSelectedDayEndDetails] = React.useState<
		FormFieldSavedResponse<'day_end'> | undefined
	>();
	const [selectedComplaintsDetails, setSelectedComplaintsDetails] =
		React.useState<FormFieldSavedResponse<'complaints'> | undefined>();
	const [
		selectedMonthlyEvaluationDetails,
		setSelectedMonthlyEvaluationDetails,
	] = React.useState<
		FormFieldSavedResponse<'monthly_evaluation'> | undefined
	>();

	React.useEffect(() => {
		setIsLoading(true);
		DentistFormsService.getDentistFormData(slug).then((res) => {
			setIsLoading(false);
			setDentistFormData(res);
		});
	}, [slug]);

	const currentMonth = moment(selectedDate).format('MMMM YYYY');

	const prevCalendar = () => {
		if (!calendarRef.current) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		calendarRef.current.setActiveStartDate(
			moment(selectedDate).subtract(1, 'month').date(1).toDate(),
			'prev',
		);
		setSelectedDate(
			moment(selectedDate).subtract(1, 'month').date(1).toDate(),
		);
	};

	const nextCalendar = () => {
		if (!calendarRef.current) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		calendarRef.current.setActiveStartDate(
			moment(selectedDate).add(1, 'month').date(1).toDate(),
			'next',
		);
		setSelectedDate(moment(selectedDate).add(1, 'month').date(1).toDate());
	};

	const handleToday = () => {
		const today = moment().toDate();
		if (!calendarRef.current) return;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		calendarRef.current.setActiveStartDate(today, 'next');
		setSelectedDate(today);
	};

	// get all data from for current month and year
	const filteredData = Object.keys(dentistFormData)
		.map((key) => {
			const date = moment(key).toDate();
			const firstDayOfMonth = moment(selectedDate)
				.startOf('month')
				.toDate();
			const lastDayOfMonth = moment(selectedDate).endOf('month').toDate();

			if (date >= firstDayOfMonth && date <= lastDayOfMonth) {
				return {
					[key]: dentistFormData[key],
				};
			}

			return undefined;
		})
		.filter(Boolean);

	// scroll to the current date
	React.useEffect(() => {
		const today = moment().toDate();
		const todayElement = document.getElementById(
			moment(today).format('YYYY-MM-DD'),
		);

		if (todayElement) {
			todayElement.scrollIntoView({
				behavior: 'auto',
				block: 'center',
			});
		}
	}, [dentistFormData]);

	// if change in date then scroll to that date
	React.useEffect(() => {
		const todayElement = document.getElementById(
			moment(selectedDate).format('YYYY-MM-DD'),
		);

		if (todayElement) {
			todayElement.scrollIntoView({
				behavior: 'auto',
				block: 'center',
			});
		}
	}, [selectedDate]);

	return (
		<div className={'mx-2'}>
			<div className={'flex items-center text-grayText mb-4'}>
				<p
					className={'hover:underline cursor-pointer'}
					onClick={() => navigate(`/workspace/${slug}/doctor-check`)}
				>
					Doctor check{' '}
				</p>
				<ChevronRight />
				<p className={'hover:underline cursor-pointer'}>
					Daily evaluation history
				</p>
			</div>

			<Card className={'rounded bg-white p-4'}>
				<div
					className={
						'flex items-center justify-between border-b-2 pb-2'
					}
				>
					<button
						onClick={handleToday}
						className={
							'border-2 border-gray-300 bg-white px-4 rounded-full py-2 active:bg-gray-200 hover:bg-gray-100 justify-self-start'
						}
					>
						Today
					</button>

					<div
						className={
							'justify-self-center flex items-center gap-4'
						}
					>
						<button
							className={
								'border-2 border-gray-300 bg-white p-2 rounded-full active:bg-gray-200  hover:bg-gray-100 disabled:cursor-not-allowed'
							}
							onClick={prevCalendar}
							// disable if current date is one year back from today
							disabled={
								moment(selectedDate).format('YYYY-MM') ===
								moment().subtract(1, 'year').format('YYYY-MM')
							}
						>
							<ChevronLeft className={'w-5 h-5'} />
						</button>
						<p className={'min-w-[150px] text-center'}>
							{currentMonth}
						</p>
						<button
							onClick={nextCalendar}
							className={
								'border-2 border-gray-300 bg-white p-2 rounded-full active:bg-gray-200  hover:bg-gray-100 disabled:cursor-not-allowed'
							}
							// disable if current date is one year front from today
							disabled={
								moment(selectedDate).format('YYYY-MM') ===
								moment().add(1, 'year').format('YYYY-MM')
							}
						>
							<ChevronRight className={'w-5 h-5'} />
						</button>
					</div>
					<div />
				</div>

				<div className={'flex gap-2 mt-4'}>
					<div className={'border-r-2 pr-4 border-gray-200 '}>
						<div
							className={'flex items-center justify-between mb-6'}
						>
							<div className={'px-3 text-sm'}>
								{moment(selectedDate).format('MMMM YYYY')}
							</div>

							<div className={'flex'}>
								<ChevronLeft
									onClick={prevCalendar}
									className={
										'w-5 h-5 text-primary cursor-pointer'
									}
								/>
								<ChevronRight
									onClick={nextCalendar}
									className={
										'w-5 h-5 text-primary cursor-pointer'
									}
								/>
							</div>
						</div>

						<Calendar
							ref={calendarRef}
							value={selectedDate}
							showNavigation={false}
							showNeighboringMonth={false}
							onChange={(date) => setSelectedDate(date as Date)}
							calendarType={'US'}
							className={'daily-evaluation-history-calendar'}
						/>
					</div>

					{isLoading && (
						<div>
							<Spinner />
						</div>
					)}
					{dentistFormData && (
						<div
							className={
								'flex flex-col gap-4 h-[600px] overflow-auto flex-1 '
							}
						>
							{filteredData.map((data) => {
								if (!data) return null;
								const key = Object.keys(data)[0];
								const date = moment(key).format('MMM, ddd');
								const day = moment(key).format('DD');
								const isToday = moment(key).isSame(
									new Date(),
									'day',
								);

								const hasData =
									Object.keys(data[key]).length > 0;
								const dayStartData = data[key]
									?.day_start as FormFieldSavedResponse<'day_start'>;
								const dayEndData = data[key]?.day_end;
								const complaints = data[key]?.complaints;
								const monthlyEvaluation =
									data[key]?.monthly_evaluation;

								return (
									<div
										id={key}
										className={
											'border-b-2 pb-4 border-gray-200 flex gap-12 items-center '
										}
									>
										<div
											className={
												'flex items-center gap-2 min-w-[126px]'
											}
										>
											<div
												className={CssUtils.cn(
													'h-8 w-8 flex items-center justify-center text-lg',
													isToday
														? 'bg-primary rounded-full  text-white'
														: '',
												)}
											>
												{day}
											</div>
											<div
												className={CssUtils.cn(
													'text-grayText',
													isToday
														? 'text-primary'
														: '',
												)}
											>
												{date}
											</div>
										</div>
										<div className={'flex-1'}>
											{!hasData &&
												'No events for this day'}

											{hasData && (
												<div>
													{dayStartData && (
														<div
															className={
																'flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2 py-0.5 rounded w-full'
															}
															onClick={() =>
																setSelectedDayStartDetails(
																	dayStartData,
																)
															}
														>
															<div
																className={
																	'bg-primary h-3 w-3 rounded-full'
																}
															/>
															<div>
																Day start
																Evaluation
															</div>
														</div>
													)}
													{dayEndData && (
														<div
															className={
																'flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2 py-0.5 rounded w-full'
															}
															onClick={() =>
																setSelectedDayEndDetails(
																	dayEndData,
																)
															}
														>
															<div
																className={
																	'bg-primary h-3 w-3 rounded-full'
																}
															/>
															<div>
																Day end
																Evaluation
															</div>
														</div>
													)}
													{complaints && (
														<div
															className={
																'flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2 py-0.5 rounded w-full'
															}
															onClick={() =>
																setSelectedComplaintsDetails(
																	complaints,
																)
															}
														>
															<div
																className={
																	'bg-red-300 h-3 w-3 rounded-full'
																}
															/>
															<div>
																Complaints
															</div>
														</div>
													)}
													{monthlyEvaluation && (
														<div
															className={
																'flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2 py-0.5 rounded w-full'
															}
															onClick={() =>
																setSelectedMonthlyEvaluationDetails(
																	monthlyEvaluation,
																)
															}
														>
															<div
																className={
																	'bg-green-300 h-3 w-3 rounded-full'
																}
															/>
															<div>
																Monthly
																evaluation
															</div>
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</Card>

			{selectedDayStartDetails && (
				<DayStartDetailDialog
					open={!!selectedDayStartDetails}
					onClose={() => setSelectedDayStartDetails(undefined)}
					data={selectedDayStartDetails}
				/>
			)}
			{selectedDayEndDetails && (
				<DayEndDetailDialog
					open={!!selectedDayEndDetails}
					onClose={() => setSelectedDayEndDetails(undefined)}
					data={selectedDayEndDetails}
				/>
			)}
			{selectedComplaintsDetails && (
				<ComplaintsDetailDialog
					open={!!selectedComplaintsDetails}
					onClose={() => setSelectedComplaintsDetails(undefined)}
					data={selectedComplaintsDetails}
				/>
			)}
			{selectedMonthlyEvaluationDetails && (
				<MonthlyEvaluationDialog
					open={!!selectedMonthlyEvaluationDetails}
					onClose={() =>
						setSelectedMonthlyEvaluationDetails(undefined)
					}
					data={selectedMonthlyEvaluationDetails}
				/>
			)}
		</div>
	);
};

export default DailyEvaluationHistoryPage;
