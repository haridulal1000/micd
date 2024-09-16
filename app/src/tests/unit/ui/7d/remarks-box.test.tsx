import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import RemarksBox from '../../../../pages/7d/remarks-box';

configure({ adapter: new Adapter() });
describe('remarks-box', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		const mockData = [
			{
				remark: 'This is short',
				dateAdded: '22/11/2022',
			},
			{
				remark: 'This comment should span across multiple lines, thereby increasing the height of remarks box.',
				dateAdded: '22/11/2022',
			},
		];
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<RemarksBox
						title={''}
						handleSave={() => {}}
						remarks={mockData}
					/>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render four <p> tags, 2 for remarks, 2 for dates', () => {
		expect(container.find('p').length).toBe(4);
		expect(container.find('p.text-grayedLabel').length).toBe(2);
	});

	it('should render a textarea input and a button to save remark', () => {
		expect(container.find('textarea').length).toBe(1);
		expect(container.find('button').length).toBe(1);
	});
});
