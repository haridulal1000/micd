import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider, useSelector } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store, RootState } from '../../../core/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ListTable from '../../../pages/components/table';
import Pagination from '../../../pages/components/pagination';

configure({ adapter: new Adapter() });
describe('Pagination component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const dummyyData = {
		count: 20,
		pages: 2,
		next: '/api/v1/patients?page=2',
		prev: '/api/v1/patients?page=1',
	};
	const dummyFunc = () => {};

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<Pagination
							pageInfo={dummyyData}
							handlePageOnClick={dummyFunc}
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('renders one list element', () => {
		expect(container.find('ul')).toHaveLength(1);
	});
	it('renders one prev element', () => {
		expect(container.find('.test-prev')).toHaveLength(1);
	});
	it('renders one next element', () => {
		expect(container.find('.test-next')).toHaveLength(1);
	});
	it('renders current page number', () => {
		expect(container.find('.test-current-page')).toHaveLength(1);
	});
});
