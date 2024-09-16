export interface ISliderComment {
	id: number | string;
	text?: string;
	userAvatarUrl: string;
	userName: string;
	dateAdded: number;
}

export interface ISliderBookmark {
	id: number | string;
	scaledX: number;
	scaledY: number;
	commentBoxVisible: boolean;
	comments?: ISliderComment[];
}

export interface ISliderImage {
	id: number;
	imageSource: string;
	bookmarks?: ISliderBookmark[];
}

export interface ISliderState {
	currentImageIndex: number;
	sliderImages: ISliderImage[];
	canvasWidth: number;
	canvasHeight: number;
	resetBookmarkState: boolean;
}
