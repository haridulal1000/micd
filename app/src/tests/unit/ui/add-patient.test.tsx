import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../core/redux/store/store';
import AddPatient from '../../../pages/patient/add-patient';

configure({ adapter: new Adapter() });
describe('Create patient form', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<AddPatient hideModal={() => {}} />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render empty egister form', () => {
		expect(container.find('form')).toHaveLength(1);
		expect(container.find('h2')).toHaveLength(1);
		expect(container.find('input')).toHaveLength(9);
		expect(container.find('button')).toHaveLength(1);
	});

	it('should have all the input fields', () => {
		expect(container.find('input[type="text"]').length).toEqual(5);
		expect(container.find('input[type="number"]').length).toEqual(1);
		expect(container.find('input[type="radio"]').length).toEqual(3);
	});
});
