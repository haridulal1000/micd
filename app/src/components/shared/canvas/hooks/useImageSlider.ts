import { useEffect, useRef } from 'react';

const WIDESCREEN_AR = 9 / 16;

const drawLoadingText = (context: CanvasRenderingContext2D) => {
	const { canvas } = context;
	const loadingText = 'Loading ...';
	const textWidth = context.measureText(loadingText).width;

	context.fillStyle = '#E6ECFF';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	context.fillStyle = '#000000';
	context.font = '20px poppins';
	context.fillText(
		loadingText,
		canvas.width / 2 - textWidth / 2,
		canvas.height / 2,
	);
};

const drawImageCenteredFit = (
	context: CanvasRenderingContext2D,
	imageSrc: string,
) => {
	const { canvas } = context;
	const image = new Image();
	image.src = imageSrc;
	image.alt = 'Image could not be rendered';

	image.onload = () => {
		// get the scale factor for current image
		// makes sure the image is stretched to fit
		// retaining the image's aspect ratio
		const horRatio = canvas.width / image.naturalWidth;
		const verRatio = canvas.height / image.naturalHeight;
		const scaleFactor = Math.min(horRatio, verRatio);

		// get the pixels to shift the image origin by
		// makes sure the image is centered
		const xShift = (canvas.width - image.width * scaleFactor) / 2;
		const yShift = (canvas.height - image.height * scaleFactor) / 2;

		context.clearRect(0, 0, canvas.width, canvas.height);

		// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
		context.drawImage(
			image,
			0, // image top-left placement X coord
			0, // image top-left placement Y coord
			image.width,
			image.height,
			xShift, // move image right towards center
			yShift, // move image down towards center
			image.width * scaleFactor, // scale to fit width
			image.height * scaleFactor, // scale to fit height
		);
	};
};

const useImageSlider = (imageSources: string[], activeImgIndex = 0) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		if (!canvas || !context) return;

		canvas.style.width = '100%';
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.width * WIDESCREEN_AR;

		drawLoadingText(context);
		drawImageCenteredFit(context, imageSources[activeImgIndex]);
	}, [activeImgIndex]);

	return canvasRef;
};

export default useImageSlider;
