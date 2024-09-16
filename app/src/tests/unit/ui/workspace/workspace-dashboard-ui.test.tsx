import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from '../../../../core/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import WorkspaceDashboard from '../../../../pages/workspace/workspaceDashboard';

configure({ adapter: new Adapter() });
describe('EMpty Workspace dashboard component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<WorkspaceDashboard />
					</PersistGate>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('renders empty workspace dashboard card', () => {
		expect(container.find('.test-appointment-card')).toHaveLength(1);
		expect(container.find('img')).toHaveLength(12);
		expect(container.find('p')).toHaveLength(8);
		expect(container.find('.test-unit-checklist')).toHaveLength(1);
		expect(container.find('.test-recent-patients')).toHaveLength(1);
	});
});
