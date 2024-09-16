export const getFullName = (firstName: string, lastName: string): string =>
	`${firstName} ${lastName}`;

export const getNameAbbreviation = (
	firstName: string,
	lastName: string,
): string => firstName.charAt(0) + lastName.charAt(0);
