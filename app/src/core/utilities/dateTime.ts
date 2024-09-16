const getCurrentGreeting = () => {
	const now = new Date();
	const hour = now.getHours();
	if (hour < 12) return 'Good Morning';
	if (hour < 18) return 'Good Afternoon';
	return 'Good Evening';
};

export const getFullDateFromTimestamp = (timestamp: number) => {
	const datetime = new Date(timestamp);
	return datetime.toLocaleDateString();
};

export const getProperDate = (timestamp?: number) => {
	// 24 Nov, 2020
	if (timestamp) {
		const datetime = new Date(timestamp);
		const month = datetime.toLocaleString('default', {
			month: 'short',
		});
		const fullDate = `${datetime.getDate()} ${month}, ${datetime.getFullYear()}`;

		return fullDate;
	}

	return undefined;
};

export const getShortDate = (timestamp?: number) => {
	// mm/dd/yyyy
	if (timestamp) {
		const datetime = new Date(timestamp);

		const formattedDate = datetime.toISOString().split('T')[0];

		return formattedDate;
	}
	return undefined;
};

export const getShortMonthName = (yearMonth: string): string => {
	const [year, month] = yearMonth.split('-');
	const date = new Date(parseInt(year), parseInt(month) - 1, 1);
	const options: Intl.DateTimeFormatOptions = { month: 'short' };
	return date.toLocaleDateString(undefined, options);
};

export const getDateForRecentPatients = (epochTime: number) => {
	// Convert epoch time to milliseconds
	const timestamp = new Date(epochTime);

	// Get current date and time
	const currentDate = new Date();

	const properDate = getProperDate(epochTime);

	if (properDate) {
		const requiredFormat = reverseDateFormat(properDate);
		// Check if the date is today
		if (
			timestamp.getDate() === currentDate.getDate() &&
			timestamp.getMonth() === currentDate.getMonth() &&
			timestamp.getFullYear() === currentDate.getFullYear()
		) {
			return requiredFormat === 'N/A'
				? 'N/A'
				: `Today, ${requiredFormat.split(',')[1]}`;
		}
		return requiredFormat;
	}

	return 'N/A';
};

export const getTimeForRecentPatients = (epochTime: number) => {
	// Convert epoch time to milliseconds
	const timestamp = new Date(epochTime);

	// Get current date and time
	const currentDate = new Date();

	// Format time difference if created in the last hour
	const timeDiff = currentDate.getTime() - timestamp.getTime();
	if (timeDiff < 3600000) {
		// 1 hour in milliseconds
		const minutesAgo = Math.floor(timeDiff / 60000); // 1 minute in milliseconds
		return `${minutesAgo} minutes ago`;
	}
	// Format time in h:mm AM/PM format
	const formattedTime = timestamp.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	return formattedTime;
};

function reverseDateFormat(inputDateString: string) {
	// Split the input date string into components
	const dateComponents = inputDateString.split(', ');

	// Check if the input format is valid
	if (dateComponents.length !== 2) {
		// Handle invalid date string
		return 'N/A';
	}

	// Reverse the order of date components and join them back together
	const reversedDateString = `${dateComponents[1]}, ${dateComponents[0]}`;

	return reversedDateString;
}

export default getCurrentGreeting;
