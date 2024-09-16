import React, { useState } from 'react';
import SecondaryBtn, { PrimaryBtn } from '../shared/form/btn';

export interface IConfirmationProp {
	text?: string;
	onConfirm: () => void;
	onCancel: () => void;
}
function ConfirmationBoxComponent(props: IConfirmationProp) {
	return (
		<div className="w-full relative max-w-[50rem] h-[15rem] items-center flex flex-col gap-[2rem] justify-center px-10">
			<p>
				{props.text || 'Are you sure you want to continue the action?'}
			</p>
			<button
				className="icon-container absolute right-4 top-4"
				onClick={props.onCancel}
			>
				<i className="exit-small-icon"></i>
			</button>
			<div className="flex w-full justify-around mx-auto">
				<PrimaryBtn
					classes="!w-[7rem] flex h-[3rem] flex items-center justify-center"
					type={'button'}
					onClick={() => {
						props.onConfirm();
					}}
				>
					Confirm
				</PrimaryBtn>

				<SecondaryBtn
					classes="!w-[7rem] flex h-[3rem] flex items-center justify-center"
					onClick={props.onCancel}
				>
					Cancel
				</SecondaryBtn>
			</div>
		</div>
	);
}

export default ConfirmationBoxComponent;
