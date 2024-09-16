export default function downloadImage(url: string, filename?: string): void {
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const imageUrl: string = window.URL.createObjectURL(blob);
			const link: HTMLAnchorElement = document.createElement('a');
			link.href = imageUrl;
			link.download = filename || 'image';

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);

			window.URL.revokeObjectURL(imageUrl);
		})
		.catch((error: Error) =>
			console.error('Error downloading image:', error),
		);
}
