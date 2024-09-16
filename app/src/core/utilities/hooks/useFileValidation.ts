export enum FileType {
	USER_AVATAR_IMAGE,
}

interface IFileValidationResult {
	error: boolean;
	messages: string[];
}

const bytesToMB = (sizeInBytes: number) => sizeInBytes / 1024 / 1024;

enum UserAvatarFileError {
	FILE_TOO_BIG = 'User avatar can be no larger than 5 MB',
	FILE_INVALID = 'Only PNG and JPEG files are supported',
}
const validateUserAvatar = (file: File): IFileValidationResult => {
	const supportedFileExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
	const validationResult: IFileValidationResult = {
		error: false,
		messages: [],
	};

	if (!supportedFileExtensions.includes(file.type.toLowerCase())) {
		validationResult.error = true;
		validationResult.messages.push(UserAvatarFileError.FILE_INVALID);
	}

	if (bytesToMB(file.size) > 5) {
		validationResult.error = true;
		validationResult.messages.push(UserAvatarFileError.FILE_TOO_BIG);
	}

	return validationResult;
};

export const useFileValidation = (
	file: File,
	fileType: FileType,
): IFileValidationResult => {
	switch (fileType) {
		case FileType.USER_AVATAR_IMAGE:
			return validateUserAvatar(file);
		default:
			return {
				error: true,
				messages: ['Unknown FileType'],
			};
	}
};
