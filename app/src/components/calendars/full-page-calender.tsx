import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';

type FullPageCalenderProps = CalendarOptions;

const FullPageCalender = (props: FullPageCalenderProps) => (
	<FullCalendar
		timeZone={'local'}
		plugins={[dayGridPlugin, timeGridPlugin]}
		initialView="timeGridDay"
		weekends={true}
		allDaySlot={false}
		nowIndicator={true}
		forceEventDuration={false}
		events={props.events}
		dayMaxEvents={true}
		slotMinTime={'06:00:00'}
		slotMaxTime={'24:00:00'}
		slotDuration={'00:15:00'}
		views={{
			timeGridDay: {
				displayEventTime: true,
				displayEventEnd: true,
			},
		}}
		headerToolbar={{
			left: 'today',
			center: 'prev,title,next',
			end: 'timeGridWeek,dayGridMonth,timeGridDay',
		}}
		{...props}
	/>
);

export default FullPageCalender;
