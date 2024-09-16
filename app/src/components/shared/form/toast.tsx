import React from 'react';
import { toast } from 'react-toastify';

interface IErrorToastProps {
	errorDescription: string;
}

interface ISuccessToastProps {
	successMessage: string;
	header?: string;
}

const ErrorToast = (props: IErrorToastProps) => (
	<div className="flex items-center">
		<img src="/warning-bubbles.svg" alt="" className="w-1/3 self-end" />
		<div>
			<h3>Error!</h3>
			<p className="flex-1 mb-2">{props.errorDescription}</p>
		</div>
	</div>
);
const SuccessToast = (props: ISuccessToastProps) => (
	<div className="flex items-center">
		<img src="/success-bubbles.svg" alt="" className="w-1/3 self-end" />
		<div>
			<h3>{props.header || 'Done!'}</h3>
			<p className="flex-1 mb-2">{props.successMessage}</p>
		</div>
	</div>
);

const notifyError = (desc: string) =>
	toast(<ErrorToast errorDescription={desc} />, {
		className: 'bg-ruby rounded min-w-fit',
		bodyClassName: 'w-full pl-0 pb-0 mb-0 text-black',
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	});

const notifySuccess = (desc: string, header?: string) =>
	toast(<SuccessToast successMessage={desc} header={header} />, {
		className: 'bg-toastSuccess rounded min-w-fit',
		bodyClassName: 'w-full pl-0 pb-0 mb-0 text-black',
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		// theme: 'dark',
	});

export { ErrorToast, SuccessToast, notifyError, notifySuccess };
