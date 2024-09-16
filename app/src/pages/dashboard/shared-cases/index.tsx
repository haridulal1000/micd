import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { AccessWorkspaceData } from '../../../core/interfaces/case.interface';
import CaseService from '../../../core/services/case-service';
import InputField from '../../../components/shared/form/input';
import { PrimarySelectField } from '../../../components/shared/form/select';
import DatePicker from '../../../components/shared/form/datePicker';
import SharedCaseCard from '../../patient/health-forms/HFSummary/SharedCaseCard';

interface DataItem {
	id: number;
	name: string;
	date: string;
}

interface SharedCaseDetails {
	name: string;
}
const SharedCases = (props: SharedCaseDetails) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState<string>('option1');
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [sortField, setSortField] = useState<string>('dateAsc');
	const [data, setData] = useState<DataItem[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);
	const [accessWorkspaceData, setAccessWorkspaceData] = useState<
		AccessWorkspaceData[]
	>([]);
	// Function to fetch data from API
	const fetchData = async () => {
		setLoading(true);
		setError(null);
		try {
			const res: AccessWorkspaceData[] =
				await CaseService.getSharedCases();
			setAccessWorkspaceData(res);
			// 	const response = await axios.get('/api/data', {
			// 		params: {
			// 			searchTerm,
			// 			selectedOption,
			// 			startDate: format(startDate.toString(), 'yyyy-MM-dd'),
			// 			endDate: format(endDate.toString(), 'yyyy-MM-dd'),
			// 			sortField,
			// 		},
			// 	});
			// 	setData(response.data);
		} catch (err) {
			setError('Failed to fetch data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchTerm, selectedOption, startDate, endDate, sortField]);
	// Event handlers
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value);

	const handleOptionChange = (e: SyntheticEvent) => {
		setSelectedOption((e as ChangeEvent<HTMLSelectElement>).target.value);
	};

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) =>
		setSortField(e.target.value);

	const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStartDate(e.target.value);
	};

	return (
		<div className="p-8">
			<p className="text-bold my-8">
				Shared Cases ({accessWorkspaceData[0]?.workspace?.name ?? ''})
			</p>

			<div className="flex w-full gap-4 justify-between flex-wrap">
				<div className="flex gap-4 flex-wrap">
					<div>
						<InputField
							name="search-field"
							type="text"
							placeholder="Search by case id, patient name"
							value={searchTerm}
							onChange={handleSearchChange}
							classes={'min-w-[360px]'}
						/>
					</div>

					<div className={'mt-2 min-w-[230px]'}>
						<PrimarySelectField
							placeHolder={'Select patient'}
							name="sex"
							label="Male"
							width={'w-[230px]'}
							options={[
								{
									label: 'Select patient',
									value: 'Select patient',
								},
							]}
							setValueCallback={handleOptionChange}
						/>
					</div>

					<div
						className={'mt-2 flex items-center gap-2 max-h-[52px]'}
					>
						<DatePicker
							classes={'text-grayedLabel h-[28px]'}
							width={'9rem'}
							defaultValue={new Date().toString()}
							onChange={handleStartDateChange}
						/>{' '}
						<span>-</span>
						<DatePicker
							classes={'text-grayedLabel h-[28px]'}
							width={'9rem'}
							defaultValue={new Date().toString()}
							min={startDate}
						/>
					</div>
				</div>
				<div className={'mt-2 min-w-[170px]'}>
					<PrimarySelectField
						placeHolder={'Sort by'}
						name="sex"
						label="Male"
						options={[
							{
								label: 'Recently updated',
								value: 'Recently updated',
							},
							{
								label: 'Least recently updated',
								value: 'Least recently updated',
							},
							{
								label: 'Newest',
								value: 'Newest',
							},
							{
								label: 'Oldest',
								value: 'Oldest',
							},
						]}
						setValueCallback={handleOptionChange}
					/>
				</div>
			</div>

			<div>
				{loading && <p>Loading...</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{!loading && !error && accessWorkspaceData.length === 0 && (
					<p>No data available</p>
				)}
				{accessWorkspaceData.length > 0 &&
					accessWorkspaceData[0].cases.length > 0 &&
					accessWorkspaceData[0].cases.map((sharedCase) => (
						<SharedCaseCard case={sharedCase} />
					))}
			</div>
		</div>
	);
};

export default SharedCases;
