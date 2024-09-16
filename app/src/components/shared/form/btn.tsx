import React, { ReactNode, SyntheticEvent, useRef } from 'react';

interface IBtn {
	id?: string;
	classes?: string;
	onClick?: (e: SyntheticEvent) => Promise<void> | void;
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
	children: ReactNode;
	dataTestId?: string;
	containerClasses?: string;
	textOnly?: boolean;
	disableOnClick?: boolean;
}

const SecondaryBtn = (props: IBtn) => {
	const buttonRef = useRef(null);

	const handleClick = (e: React.SyntheticEvent) => {
		e.stopPropagation();
		if (buttonRef.current) (buttonRef.current as HTMLButtonElement).click();
	};

	const handleClickAgain = (e: React.SyntheticEvent) => {
		handleClick(e);
	};

	return (
		<>
			<div
				onClick={handleClick}
				className={`${
					!props.textOnly
						? 'secondary-btn-container'
						: 'secondary-btn-container-no-border'
				} ${props.disabled ? 'opacity-50' : ''}${
					props.containerClasses ? props.containerClasses : ''
				}`}
			>
				<div
					onClick={handleClickAgain}
					className={`${props.classes ? props.classes : ''}`}
				>
					<button
						id={props.id}
						disabled={props.disabled}
						type={props.type}
						onClick={props.onClick ? props.onClick : undefined}
						className={`w-full outline-none border-none bg-transparent py-1 px-3 ${props.classes}`}
						data-testid={props.dataTestId}
						ref={buttonRef}
					>
						{props.children}
					</button>
				</div>
			</div>
		</>
	);
};

export const PrimaryBtn = (props: IBtn) => {
	const buttonRef = useRef(null);

	const handleClick = () => {
		if (buttonRef.current) (buttonRef.current as HTMLButtonElement).click();
	};

	return (
		<>
			<div>
				<div className="pl-[1px] pr-[1px] pb-[1.11px] pt-[1.11px] bg-gradientRainbow rounded-full ">
					<button
						id={props.id}
						disabled={props.disabled}
						type={props.type ?? 'button'}
						onClick={props.onClick ? props.onClick : undefined}
						className={`primary-btn  ${props.classes}`}
						data-testid={props.dataTestId}
						ref={buttonRef}
					>
						{props.children}
					</button>
				</div>
			</div>
		</>
	);
};

export const SidebarFullBtn = (props: IBtn) => {
	const buttonRef = useRef(null);

	return (
		<>
			<button
				id={props.id}
				disabled={props.disabled}
				type={props.type}
				onClick={props.onClick ? props.onClick : undefined}
				className={`sidebar-btn ${props.classes} p-4`}
				data-testid={props.dataTestId}
				ref={buttonRef}
			>
				{props.children}
			</button>
		</>
	);
};

export const AddBtn = (props: IBtn) => {
	const buttonRef = useRef(null);

	const handleClick = () => {
		if (buttonRef.current) (buttonRef.current as HTMLButtonElement).click();
	};

	return (
		<>
			<div onClick={handleClick}>
				<div>
					<button
						id={props.id}
						disabled={props.disabled}
						type={props.type}
						onClick={props.onClick ? props.onClick : undefined}
						className={`primary-btn px-5 py-3 ${props.classes}`}
						data-testid={props.dataTestId}
						ref={buttonRef}
					>
						<svg
							className="inline mr-3"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
								fill="white"
							/>
						</svg>
						{props.children}
					</button>
				</div>
			</div>
		</>
	);
};

export const SaveBtn = (props: IBtn) => {
	const buttonRef = useRef(null);

	const handleClick = () => {
		if (buttonRef.current) (buttonRef.current as HTMLButtonElement).click();
	};

	return (
		<>
			<div
				className={`rounded-full px-10 py-2 bg-lightGray hover:bg-primary  text-nightGray hover:text-white  ${
					props.disabled ? 'opacity-50' : ''
				}
				${props.containerClasses ? props.containerClasses : ''}
				`}
			>
				<button
					id={props.id}
					disabled={props.disabled}
					type={props.type}
					onClick={props.onClick ? props.onClick : undefined}
					className={`w-full outline-none border-none bg-transparent p-1 ${props.classes}`}
					data-testid={props.dataTestId}
					ref={buttonRef}
				>
					{props.children}
				</button>
			</div>
		</>
	);
};

export default SecondaryBtn;
