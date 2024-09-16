import React from 'react';

export interface IModalInterfaceProps {
	text: string;
	addButton?: boolean;
	optionsButton?: boolean;
	exitButton?: boolean;
	onAdd?: () => void;
	onExit?: () => void;
}
function ModalHeaderComponent(props: IModalInterfaceProps) {
	return (
		<div>
			<div className="text-bold w-full flex justify-between px-4">
				<div>{props.text}</div>
				<div className="flex gap-4">
					{props.addButton && (
						<button
							className="icon-container bg-transparent"
							onClick={() => {
								if (props.onAdd) props.onAdd();
							}}
						>
							<i className="small-add-icon"></i>
						</button>
					)}

					{props.optionsButton && (
						<button className="icon-container bg-transparent">
							<i className="three-dots-icon"></i>
						</button>
					)}

					{props.exitButton && (
						<button
							className="icon-container bg-transparent"
							onClick={props.onExit}
						>
							<i className="exit-small-icon"></i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModalHeaderComponent;
