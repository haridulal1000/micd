import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider, useSelector } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store, RootState } from '../../../core/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ListTable from '../../../pages/components/table';
import { IPatient } from '../../../core/interfaces/patient.interface';

configure({ adapter: new Adapter() });
describe('List Table component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const dummyAllPatinetInfo: IPatient[] = [
		{
			address: 'Lalitpur',
			occupation: 'null',
			last_name: 'Milan',
			status: 'details_pending',
			emergency_contact: '9847477484',
			contact_number: '9844755657',
			nationality: 'Nepali',
			sex: 'male',
			first_name: 'Jack',
			id: 20,
			email: 'minga@gmail.com',
			age: 50,
			next_appointment: null,
		},
		{
			address: 'Lalitpur',
			occupation: 'null',
			last_name: 'Milan',
			status: 'details_pending',
			emergency_contact: '9847477484',
			contact_number: '9844755657',
			nationality: 'Nepali',
			sex: 'male',
			first_name: 'Jack',
			id: 20,
			email: 'some@some.com',
			age: 50,
			next_appointment: {
				date: '100',
				start_at: '/100',
				end_at: '100',
				problem: 'some problem',
				reason_of_visit: 'emergency',
				status: 'booked',
				cancellation_note: null,
			},
		},
	];

	const dummyPageInfo = {
		count: 2,
		pages: 20,
		next: '/api/v1/patients?page=2',
		prev: '/api/v1/patients?page=1',
	};

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<ListTable
							handleSortClick={() => {}}
							pageInfo={dummyPageInfo}
							allPatientsInfo={dummyAllPatinetInfo}
							handlePageOnClick={() => {}}
							sortInfo={'name'}
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>,
		);
	});

	const getHtmlsWithSelector = (domSelector: string) =>
		container
			.find(domSelector)
			.map((elementWrapper) => elementWrapper.html())
			.flat();

	it('renders one table element with 5 columns', () => {
		expect(container.find('table')).toHaveLength(1);
		expect(container.find('th')).toHaveLength(5);
	});

	it('renders table headers correctly', () => {
		const tableHeaders = getHtmlsWithSelector('th');
		expect(tableHeaders.includes('NAME'));
		expect(tableHeaders.includes('CONTACT NUMBER'));
		expect(tableHeaders.includes('ADDRESS'));
		expect(tableHeaders.includes('EMAIL'));
		expect(tableHeaders.includes('APPOINTMENT TIME'));
	});

	it('renders create appointments buttons for patients with no upcoming appointments', () => {
		expect(getHtmlsWithSelector('button.primary-btn')).toHaveLength(1);
		const pTagsWithDate = getHtmlsWithSelector('p').filter((tag: string) =>
			tag.includes('JUL 22, 2023'),
		);
		expect(pTagsWithDate.length === 1);
	});

	it('renders sort button next name and appointment time columns', () => {
		const nameAndAppCols = getHtmlsWithSelector('th').filter(
			(header: string) => {
				header.includes('NAME') || header.includes('APPOINTMENT');
			},
		);
		nameAndAppCols.forEach((col: string) => {
			expect(col.includes('<img '));
		});
	});
});
