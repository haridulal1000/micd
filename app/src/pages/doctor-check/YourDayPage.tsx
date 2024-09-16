import React from 'react';
import DayStartForm from '../../components/doctor-check/DayStartForm';
import DayEndForm from '../../components/doctor-check/DayEndForm';

const YourDayPage = () => (
	<div className={'flex gap-4 flex-col'}>
		<DayStartForm />
		<DayEndForm />
	</div>
);

export default YourDayPage;
