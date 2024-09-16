import React from 'react';

type DButtonClickCallback = (btnIndex: number) => void;

interface IDButtonProps {
	currentIndex?: number;
	activeIndex?: number;
	buttonIconSrc?: string;
	buttonActiveIconSrc?: string;
	buttonText: string;
	onClickCallback?: DButtonClickCallback;
	classes?: string;
	height?: string;
	disabled?: boolean;
}

const DButton = (props: IDButtonProps) => {
	const isActive = props.currentIndex === props.activeIndex;
	const handleBtnClick = () => {
		if (props.onClickCallback)
			props.onClickCallback(props.currentIndex || 0);
	};

	return (
		<div
			className={`rounded-lg w-full p-[2px] 
			${isActive ? 'bg-gradient-rainbow' : 'bg-primary'}`}
			style={props.height ? { height: props.height } : {}}
		>
			<button
				disabled={props?.disabled}
				onClick={handleBtnClick}
				className={`rounded-lg w-full h-full flex flex-col justify-center items-center cursor-pointer  
				${props.classes ? props.classes : ''}`}
			>
				<img
					src={
						isActive
							? props.buttonActiveIconSrc
							: props.buttonIconSrc
					}
				/>
				<span className="text-center align-middle">
					<p className={isActive ? 'rainbow-text' : 'text-primary'}>
						{props.buttonText}
					</p>
				</span>
			</button>
		</div>
	);
};

export default DButton;
