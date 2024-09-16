import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import CommentCard from '../../../../components/shared/canvas/carousel-comment/CommentCard';

configure({ adapter: new Adapter() });
describe('Comment Card', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CommentCard bookmarkId={1} />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render the bookmark icon properly', () => {
		expect(container.find('input')).toHaveLength(0);
		expect(container.find('div')).toHaveLength(1);
	});
});
