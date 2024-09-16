import React, { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import CssUtils from '../../core/utilities/css-utils';

const ModalSafeForReact18 = ReactModal as React.ComponentType<
	ReactModal['props']
>;

type ModalProps = PropsWithChildren<{
	open: boolean;
	onRequestClose?: () => void;
	className?: string;
}>;

const Modal = (props: ModalProps) => {
	React.useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				props.onRequestClose?.();
			}
		};

		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, []);

	return (
		<ModalSafeForReact18
			isOpen={props.open}
			onRequestClose={props.onRequestClose}
			ariaHideApp={false}
			className={CssUtils.cn(
				'bg-white shadow-2xl absolute  w-full top-[50%] left-[50%] right-auto bottom-auto -mr[50%] -translate-x-[50%] -translate-y-[50%]',
				props.className,
			)}
		>
			{props.children}
		</ModalSafeForReact18>
	);
};

export default Modal;
