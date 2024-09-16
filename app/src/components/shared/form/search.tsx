import React, { KeyboardEvent, SyntheticEvent, useEffect } from 'react';
import { IPatientRequest } from '../../../core/interfaces/patient.interface';
import useDebounce from '../../../core/utilities/hooks/useDebouce';

interface SearchProps {
	name: string;
	placeholder?: string;
	label?: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	searchQuery: string;
	handleSearchFunc: (
		patientQueries: Omit<IPatientRequest, 'workspace'>,
	) => void;
}
const Search = (props: SearchProps) => {
	const debouncedSearchQuery = useDebounce(props.searchQuery, 500);

	useEffect(() => {
		props.handleSearchFunc({});
	}, [debouncedSearchQuery]);

	const handleSearchClick = (e: SyntheticEvent) => {
		e.preventDefault();
		props.handleSearchFunc({});
	};

	return (
		<div className="flex flex-wrap " style={{ width: '600px' }}>
			<div className="flex items-center bg-primaryPastelDream grow">
				<svg
					className="absolute m-3"
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875V13.875Z"
						fill="#848996"
					/>
				</svg>
				<input
					type="search"
					className=" text-sm px-1 p-3 rounded-l bg-primaryPastelDream indent-10 block w-full focus:outline-0 focus:border-t focus:border-b focus:border-l focus:border-primary"
					placeholder={props.placeholder}
					name={props.name}
					aria-label="Search"
					aria-describedby="button-addon3"
					value={props.searchQuery}
					onChange={(event: SyntheticEvent) => {
						event.preventDefault();
						const target = event.target as HTMLInputElement;
						props.setSearchQuery(target.value);
					}}
					onKeyDown={(event: SyntheticEvent) => {
						const keyEvent = event as KeyboardEvent;
						if (keyEvent.key === 'Enter' && props.searchQuery) {
							props.handleSearchFunc({});
						}
					}}
				/>
			</div>
			<button
				className="bg-blue-300 rounded-r px-6 py-2 text-sm text-white uppercase bg-primary w-1/5"
				id="button-addon3"
				data-te-ripple-init
				onClick={(e: SyntheticEvent) => handleSearchClick(e)}
			>
				Search
			</button>
		</div>
	);
};

export default Search;
