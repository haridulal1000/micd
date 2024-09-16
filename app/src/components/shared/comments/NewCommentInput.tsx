import React, { KeyboardEvent, SyntheticEvent, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/redux/store/store';
import Avatar from '../../ui/avatar';

const NewCommentInput: React.FC<{
	userImage?: string;
	handleOnSubmit: (value: string) => void;
	styles?: React.CSSProperties;
}> = ({ userImage, handleOnSubmit, styles }) => {
	const [value, setValue] = useState('');
	const textAreaRef = useRef(null);
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
		if (!textAreaRef.current) return;
		const target = textAreaRef.current as HTMLTextAreaElement;
		target.rows = 2;
		setValue('');
		handleOnSubmit(value);
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
			style={{ ...(styles ?? {}) }}
			className={
				'flex items-start bg-saphireLight rounded-lg p-4 gap-0  min-w-[270px] max-w-[25rem]'
			}
		>
			<Avatar
				fullName={`${userProfile?.first_name} ${userProfile?.last_name}`}
				image={
					userImage ??
					userProfile?.user_avatar?.avatar_url ??
					undefined
				}
				containerClassName={'border-none w-10 h-10 mr-2'}
				className={'w-8 h-8 '}
			/>
			<textarea
				className="text-left text-sm mt-2 bg-saphireLight w-full resize-none border-0 outline-none"
				onChange={textAreaChanged}
				placeholder="Write a comment ✍️"
				value={value}
				ref={textAreaRef}
				onKeyDown={handleKeyPress}
			/>
			<div>
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
		</div>
	);
};

export default NewCommentInput;
