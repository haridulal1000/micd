import React from 'react';
import { ICaseImage } from '../../core/interfaces/case.interface';
import placeHolderImage from '../../assets/images/placeholder-image.png';
import downloadImage from '../../utils/downloadImage';

export interface IFullImageViewComponentProp {
	caseImage: ICaseImage;
	downloadButton: boolean;
	onClose: () => void;
}
function FullImageViewComponent(props: IFullImageViewComponentProp) {
	const style = {
		backgroundImage: `url(${props.caseImage.image_url})`,
		backgroundPosition: 'center center',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
	};
	return (
		<div key={props.caseImage.image_url}>
			<div className="flex justify-between w-full">
				<div className="flex gap-2 items-center mb-2">
					<img src={placeHolderImage} />
					<span className="text-white">
						{props.caseImage.file_name}
					</span>
				</div>
				<div className="flex gap-2 items-center mb-2">
					<button
						className="icon-container rounded-md !h-8 !w-8 bg-white items-center justify-center flex"
						onClick={(e) => {
							e.stopPropagation();

							downloadImage(
								props.caseImage.image_url,
								props?.caseImage?.description,
							);
						}}
					>
						<i className="download-icon"></i>
					</button>
					<button
						className="icon-container rounded-md !h-8 !w-8 bg-white items-center justify-center flex"
						onClick={(e) => {
							e.stopPropagation();
							if (props.onClose) {
								props.onClose();
							}
						}}
					>
						<i className="exit-small-icon !h-4 !w-4"></i>
					</button>
				</div>
			</div>
			<div className="w-[80vw] h-[80vh] mx-auto" style={style}></div>
		</div>
	);
}

export default FullImageViewComponent;
