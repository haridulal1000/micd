import React, { useRef, useState } from 'react';

interface IDropdownOptions {
	name: string;
	value: string;
	path?: string;
}
interface IDropdown {
	inActiveIcon?: string;
	activeIcon?: string;
	label: string;
	options: IDropdownOptions[];
	handleChange: (path: string) => Promise<void> | void;
	styleOnActive?: string;
	styleOnLabelActive?: string;
	activeNav?: boolean;
	activeStyle: string;
	formName: string;
	currentHealthForm: string;
}
const Dropdown = (props: IDropdown) => {
	const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
	const [isHovering, setIsHovered] = useState(false);

	const onMouseEnter = () => {
		setIsHovered(true);
	};
	const onMouseLeave = () => {
		setIsHovered(false);
	};
	const toggleDropdown = (e: React.SyntheticEvent) => {
		e.stopPropagation();
		setOptionsVisible(!optionsVisible);
	};

	const dropdown = useRef<HTMLDivElement | null>(null);
	const isMatch = props.options.some(
		(item) => item.path === props.currentHealthForm,
	);

	const handleDropdownClick = (path: string) => {
		props.handleChange(path);
		setOptionsVisible(!optionsVisible);
		setIsHovered(false);
	};

	return (
		<>
			<div
				className={` relative flex flex-row items-center gap-1 cursor-pointer border-b-2 ${
					isMatch ? 'border-primary' : 'border-transparent'
				} `}
				onMouseOver={onMouseEnter}
				onMouseOut={onMouseLeave}
				onClick={toggleDropdown}
			>
				<img
					src={
						isHovering || optionsVisible || isMatch
							? props.activeIcon
							: props.inActiveIcon
					}
				/>
				<p
					className={`label whitespace-nowrap py-3 text-sm text-healthFormText hover:text-primary  ${
						optionsVisible || isMatch ? 'text-primary' : ''
					}`}
				>
					{props.options?.find(
						(opt) => opt.path === props.currentHealthForm,
					)?.name ||
						(props.options && props.options[0].name)}
				</p>

				<img
					src={
						isHovering || optionsVisible || isMatch
							? '/down-arrow-active-icon.svg'
							: '/down-arrow-inactive-icon.svg'
					}
				/>

				{optionsVisible ? (
					<>
						<div
							className="fixed w-[100vw] h-[100vh] top-0 left-0 z-[1000]"
							onClick={() => {
								setOptionsVisible(false);
							}}
						></div>
						<div
							ref={dropdown}
							className="dropdown-shadow absolute mt-48 flex flex-col rounded-sm bg-white z-[2000] "
						>
							{props.options?.map((option, i) => (
								<div
									className=" hover:bg-primaryPastelDream select-none"
									key={i}
									onClick={() =>
										handleDropdownClick(
											option.path
												? option.path
												: 'summary',
										)
									}
								>
									<p className="px-4 py-3 text-sm">
										{option.name}
									</p>
									<hr />
								</div>
							))}
						</div>
					</>
				) : (
					''
				)}
			</div>
		</>
	);
};
export default Dropdown;
