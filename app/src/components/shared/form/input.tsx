import React, {
	ChangeEvent,
	KeyboardEvent,
	SyntheticEvent,
	useRef,
	useState,
} from 'react';
import { ArrowUp } from 'lucide-react';
import { b } from '@fullcalendar/core/internal-common';
import { useSelector } from 'react-redux';
import Avatar from '../../ui/avatar';
import { RootState } from '../../../core/redux/store/store';

interface InputProps {
	type: string;
	name: string;
	value?: number | string;
	placeholder?: string;
	label?: string;
	disabled?: string | boolean;
	errors?: string[];
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	classes?: string;
	containerClasses?: string;
}

interface ICodeInput {
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	value?: number | string;
	codeKey: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	maxLength?: number;
	hasError?: boolean;
}

const InputField = (props: InputProps) => {
	const [inputType, setInputType] = useState(props.type);

	const togglePasswordVisibility = () => {
		setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
	};

	return (
		<div className={'text-left'}>
			{props.label && (
				<label htmlFor={props.name} className={'mr-2'}>
					{props.label}
				</label>
			)}
			<span
				className={`flex items-center rounded mt-2 ${
					props.disabled ? 'micd-disabled-input' : ''
				}  ${
					props.errors && props.errors.length > 0
						? 'error-input'
						: 'micd-input'
				} ${props.containerClasses ? props.containerClasses : ''}  `}
			>
				<input
					disabled={props.disabled === 'true'}
					id={props.name}
					name={props.name}
					type={inputType}
					maxLength={50}
					defaultValue={props.value}
					className={`${props.classes}  ${
						props.errors &&
						props.errors.length > 0 &&
						'border-2 border-warning'
					}  form-control block w-full font-normal rounded transition ease-in-out m-0 focus:text-gray-700 bg-transparent`}
					onChange={props.onChange ? props.onChange : undefined}
					placeholder={props.placeholder ? props.placeholder : ''}
				/>
				{props.type === 'password' && (
					<span
						className="cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{inputType === 'password' ? 'Show' : 'Hide'}
					</span>
				)}
			</span>
			<p className="text-warning italic my-1 h-4 2xl:text-sm">
				{props.errors}
			</p>
		</div>
	);
};

export const InlineInputField = (props: InputProps) => {
	const [inputType, setInputType] = useState(props.type);

	const togglePasswordVisibility = () => {
		setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
	};

	return (
		<div className="text-left w-full">
			<span
				className={`flex items-center rounded ${
					props.disabled ? 'micd-disabled-input' : ''
				}  ${
					props.errors && props.errors.length > 0
						? 'error-input'
						: 'micd-input'
				} ${props.containerClasses ? props.containerClasses : ''}  `}
			>
				<input
					disabled={props.disabled === 'true'}
					id={props.name}
					name={props.name}
					type={inputType}
					maxLength={50}
					defaultValue={props.value}
					className={`${props.classes}  ${
						props.errors &&
						props.errors.length > 0 &&
						'border-2 border-warning'
					} w-full form-control block font-normal rounded  transition ease-in-out m-0 focus:text-gray-700 bg-transparent`}
					onChange={props.onChange ? props.onChange : undefined}
					placeholder={props.placeholder ? props.placeholder : ''}
				/>
				{props.type === 'password' && (
					<span
						className="cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{inputType === 'password' ? 'Show' : 'Hide'}
					</span>
				)}
			</span>
			{props.errors && (
				<p className="text-warning italic  text-xs h-3 2xl:text-sm">
					{props.errors}
				</p>
			)}
		</div>
	);
};

export const CodeInputField = (props: ICodeInput) => (
	<div
		className={`text-4xl font-bold 
			${!props.hasError ? 'code-input' : 'code-input-error'}`}
	>
		<input
			className="text-center w-[9rem] "
			type="text"
			onKeyUp={props.onKeyUp}
			maxLength={props.maxLength ? props.maxLength : 1}
			value={props.value}
			id={props.codeKey}
			onChange={props.onChange}
		/>
	</div>
);

interface IInlineInput {
	saveInputCallback: (value: string) => void;
	userAvatar?: string;
}

export const InlineInput = (props: IInlineInput) => {
	const textAreaRef = useRef(null);
	const [value, setValue] = useState('');

	const { userProfile } = useSelector(
		(state: RootState) => state.userProfile,
	);

	const textAreaChanged = (event: SyntheticEvent) => {
		const target = event.target as HTMLTextAreaElement;
		if (!target) return;
		setValue(target.value);
		if (target.value?.length > 30) target.rows = 6;
		else target.rows = 2;
	};

	const handleSaveInput = () => {
		props.saveInputCallback(value);
		if (!textAreaRef.current) return;
		const target = textAreaRef.current as HTMLTextAreaElement;
		target.rows = 2;
		setValue('');
	};

	const handleKeyPress = (e: SyntheticEvent) => {
		const event = e as KeyboardEvent;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSaveInput();
		}
	};

	const isActive = value.length > 0;

	return (
		<div
			className={`flex items-start bg-saphireLight rounded-lg p-4 gap-2 justify-between
					${!props.userAvatar ? 'border-primary border-2' : ''}`}
		>
			{props.userAvatar && (
				<Avatar
					fullName={`${userProfile?.first_name} ${userProfile?.last_name}`}
					image={userProfile?.user_avatar?.avatar_url ?? undefined}
					containerClassName={'border-none w-10 h-10 mr-2'}
					className={'w-8 h-8 '}
				/>
			)}

			<textarea
				className="text-left text-sm mt-2 bg-saphireLight w-5/6 resize-none border-0 outline-none"
				onChange={textAreaChanged}
				placeholder="Write a comment ✍️"
				value={value}
				ref={textAreaRef}
				onKeyDown={handleKeyPress}
			/>
			<button
				className={`rounded-full h-[30px] w-[30px] p-[6px] pl-[7.5px] mt-2 flex items-center justify-center
					${isActive ? 'bg-primary' : 'bg-gray'}`}
				onClick={handleSaveInput}
				disabled={value.length < 1}
			>
				<ArrowUp
					className={
						isActive
							? 'text-white w-5 h-5'
							: 'text-grayedLabel w-5 h-5'
					}
				/>
			</button>
		</div>
	);
};

export default InputField;
