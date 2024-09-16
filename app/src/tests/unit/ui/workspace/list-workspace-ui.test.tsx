import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from '../../../../core/redux/store/store';
import ListWorkspace from '../../../../pages/workspace/list';
import { PersistGate } from 'redux-persist/integration/react';

configure({ adapter: new Adapter() });
describe('List Workspaces component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const dummyAllWorkspaces = [
		{
			name: 'My workspace',
			status: 'pending',
			slug: 'fdbshsbdhsbrekrkjerur',
			type: 'personal',
			appointments: 4,
			cases: [],
		},
	];
	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<ListWorkspace allWorkspaces={dummyAllWorkspaces} />
					</PersistGate>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('renders one workspace card', () => {
		expect(container.find('.test-workspace-card')).toHaveLength(1);
	});
	it('renders one workspace card', () => {
		expect(container.find('.test-workspace-bg')).toHaveLength(1);
	});
});
