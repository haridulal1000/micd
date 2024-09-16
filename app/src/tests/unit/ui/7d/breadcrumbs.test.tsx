import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import Breadcrumb from '../../../../components/breadcrumb';

configure({ adapter: new Adapter() });
describe('Breadcrumbs', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<Breadcrumb
						page={'Patients'}
						individual={'Prawesh Shrestha'}
						individualIdentifier={'1'}
						item={'Case III - 1234'}
					/>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render the three breadcrumb items', () => {
		expect(container.html().includes('Patients')).toBeTruthy();
		expect(container.html().includes('Prawesh Shrestha')).toBeTruthy();
		expect(container.html().includes('Case III - 1234')).toBeTruthy();
		expect(container.html().includes('>')).toBeTruthy();
	});
});
