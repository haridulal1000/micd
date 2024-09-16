import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import CreateWorkspaceForm from '../../../../pages/workspace/createWorkspaceForm';

configure({ adapter: new Adapter() });
describe('Create Workspace component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CreateWorkspaceForm
						handleHideCreateWorkspace={() => {
							/* implementation not needed */
						}}
					/>
				</Provider>
				,
			</BrowserRouter>,
		);
	});

	it('should render empty register form', () => {
		expect(container.find('form')).toHaveLength(1);
		expect(container.find('h2')).toHaveLength(1);
		expect(container.find('input')).toHaveLength(2);
		expect(container.find('button')).toHaveLength(2);
	});

	it('should have all the input fields', () => {
		expect(container.find('input[type="text"]').length).toEqual(1);
		expect(container.find('input[type="file"]').length).toEqual(1);
	});
});
