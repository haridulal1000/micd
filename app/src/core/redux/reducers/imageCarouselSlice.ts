import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
	ISliderState,
	ISliderImage,
	ISliderBookmark,
} from '../../interfaces/imageSlider.interface';

const _mockSliderImages: ISliderImage[] = [
	{
		id: 1,
		imageSource:
			'https://www.holymountaintreks.com//uploads/2018/06/Phoksundo-Lake.jpg',
		bookmarks: [
			{
				id: 1,
				scaledX: 0.1,
				scaledY: 0.3,
				commentBoxVisible: false,
				comments: [
					{
						id: 1,
						text: 'first comment in bookmark 1',
						userAvatarUrl: '/image-placeholder.png',
						userName: 'Parikshit Prasai',
						dateAdded: 123456789,
					},
					{
						id: 2,
						text: 'second comment in bookmark 2',
						userAvatarUrl: '/default-user-pp.png',
						userName: 'Siddhartha Prasai',
						dateAdded: 123456789,
					},
				],
			},
			{
				id: 2,
				scaledX: 0.5,
				scaledY: 0.7,
				commentBoxVisible: false,
				comments: [
					{
						id: 3,
						text: 'first comment in bookmark 2',
						userAvatarUrl: '/image-placeholder.png',
						userName: 'Irina Prasai',
						dateAdded: 123456789,
					},
					{
						id: 4,
						text: 'second comment in bookmark 2',
						userAvatarUrl: '/default-user-pp.png',
						userName: 'Sandip Prasai',
						dateAdded: 123456789,
					},
					{
						id: 5,
						text: 'third comment in bookmark 2',
						userAvatarUrl: '/image-placeholder.png',
						userName: 'Irina Prasai',
						dateAdded: 123456789,
					},
					{
						id: 6,
						text: 'forth comment in bookmark 2',
						userAvatarUrl: '/default-user-pp.png',
						userName: 'Sandip Prasai',
						dateAdded: 123456789,
					},
				],
			},
		],
	},
	{
		id: 2,
		imageSource:
			'https://i0.wp.com/www.alphaadventuretreks.com/blog/wp-content/uploads/2022/12/Things-to-do-in-Chitwan-National-Park.jpeg',
	},
	{
		id: 3,
		imageSource:
			'https://www.holymountaintreks.com//uploads/2018/06/Rara-Lake.jpg',
	},
	{
		id: 4,
		imageSource:
			'https://www.holymountaintreks.com/uploads/2018/06/National-Parks-in-Nepal-1776.jpg',
	},
	{
		id: 5,
		imageSource:
			'https://www.holymountaintreks.com//uploads/2018/06/Bengal-Tiger.jpg',
	},
	{
		id: 6,
		imageSource:
			'https://upload.wikimedia.org/wikipedia/commons/0/0d/Khaptad_Lake_-_Khaptad_National_Park%2C_Nepal.jpg',
	},
];

const initialState: ISliderState = {
	currentImageIndex: -1,
	sliderImages: [],
	canvasWidth: 0,
	canvasHeight: 0,
	resetBookmarkState: false,
};

const DSlice = createSlice({
	name: 'imageslider',
	initialState,
	reducers: {
		setCurrentImageIndex: (state, action) => {
			if (state.currentImageIndex >= 0 && state.sliderImages.length > 0)
				state.currentImageIndex = action.payload;
		},

		initialiazeMock: (state) => {
			state.currentImageIndex = 0;
			state.sliderImages = _mockSliderImages;
		},

		toggleBookmarkCommentVisibility: (state, action) => {
			const { bookmarkId } = action.payload;
			state.sliderImages = state.sliderImages.map(
				(sliderImage: ISliderImage) => {
					if (
						!sliderImage.bookmarks ||
						sliderImage.bookmarks.length < 1
					)
						return sliderImage;

					sliderImage.bookmarks.map((bookmark: ISliderBookmark) => {
						if (bookmark.id === bookmarkId)
							bookmark.commentBoxVisible =
								!bookmark.commentBoxVisible;
						return bookmark;
					});
					return sliderImage;
				},
			);
		},

		addBookmark: (state, action) => {
			const { sliderImageId, scaledX, scaledY } = action.payload;
			state.sliderImages = state.sliderImages.map((sliderImage) => {
				if (!sliderImage.bookmarks) sliderImage.bookmarks = [];
				if (sliderImage.id === sliderImageId) {
					if (!sliderImage.bookmarks) sliderImage.bookmarks = [];
					sliderImage.bookmarks.push({
						id: crypto.randomUUID(),
						scaledX,
						scaledY,
						commentBoxVisible: true,
						comments: [],
					});
				}
				return sliderImage;
			});
		},

		hideAllBookmarkComments: (state) => {
			state.sliderImages = state.sliderImages.map((image) => {
				if (!image.bookmarks) return image;
				image.bookmarks = image.bookmarks.map((bookmark) => {
					bookmark.commentBoxVisible = false;
					return bookmark;
				});
				return image;
			});
		},

		clearEmptyBookmarks: (state) => {
			state.sliderImages = state.sliderImages.map((image) => {
				if (!image.bookmarks) return image;
				image.bookmarks = image.bookmarks.filter(
					(bookmark) =>
						bookmark.comments && bookmark.comments.length > 0,
				);
				return image;
			});
		},

		addComment: (state, action) => {
			const { bookmarkId, commentText, userAvatarUrl } = action.payload;
			state.sliderImages.map((sliderImage) => {
				if (!sliderImage.bookmarks) return sliderImage;
				sliderImage.bookmarks.map((bookmark) => {
					if (bookmark.id === bookmarkId) {
						if (!bookmark.comments) bookmark.comments = [];
						bookmark.comments.push({
							id: crypto.randomUUID(),
							text: commentText,
							userAvatarUrl,
							userName: 'Logged-in user',
							dateAdded: new Date().getMilliseconds(),
						});
					}
					return bookmark;
				});
				return sliderImage;
			});
		},

		setCanvasDims: (state, action) => {
			state.canvasWidth = action.payload.width;
			state.canvasHeight = action.payload.height;
		},
	},
});

export const isAnyCommentVisible = createSelector(
	[
		(state) => {
			if (state.imageSlider.sliderImages.length < 1) return null;
			const allBookmarks = state.imageSlider.sliderImages
				.map((sliderImage: ISliderImage) =>
					sliderImage.bookmarks ? sliderImage.bookmarks : [],
				)
				.flat();

			return allBookmarks;
		},
	],
	(bookmarks) => {
		if (!bookmarks) return null;
		const visibleBookmarks = bookmarks.find(
			(bookmark: ISliderBookmark) => bookmark.commentBoxVisible,
		);

		if (visibleBookmarks) return true;
		return false;
	},
);

export const selectBookmarkById = createSelector(
	[
		(state) => {
			if (state.imageSlider.sliderImages.length < 1) return null;
			const bookmarks = state.imageSlider.sliderImages
				.map((sliderImage: ISliderImage) =>
					sliderImage.bookmarks ? sliderImage.bookmarks : [],
				)
				.flat();

			return bookmarks;
		},
		(_, id) => id,
	],
	(bookmarks, id) => {
		if (!bookmarks) return null;
		const bookmark = bookmarks.filter(
			(bm: ISliderBookmark) => bm.id === id,
		);
		if (!bookmark) return null;
		return bookmark[0];
	},
);

export const selectCommentsByBookmarkId = createSelector(
	[
		(state) => {
			if (state.imageSlider.sliderImages.length < 1) return null;
			const bookmarks = state.imageSlider.sliderImages
				.map((sliderImage: ISliderImage) =>
					sliderImage.bookmarks ? sliderImage.bookmarks : [],
				)
				.flat();

			return bookmarks;
		},
		(_, id) => id,
	],
	(bookmarks, id) => {
		if (!bookmarks) return null;
		const bookmark = bookmarks.filter(
			(bm: ISliderBookmark) => bm.id === id,
		);
		if (!bookmark) return null;
		if (!bookmark[0].comments || bookmark[0].comments.length < 1)
			return null;
		return bookmark[0].comments;
	},
);

export const {
	setCurrentImageIndex,
	initialiazeMock,
	addBookmark,
	addComment,
	setCanvasDims,
	clearEmptyBookmarks,
	hideAllBookmarkComments,
	toggleBookmarkCommentVisibility,
} = DSlice.actions;
export default DSlice.reducer;
