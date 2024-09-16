import React, { Component } from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import CommentBookmark from '../../../../components/shared/canvas/carousel-comment/CommentBookmark';

configure({ adapter: new Adapter() });
describe('Comment Bookmark', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<CommentBookmark
						bookmarkId={1}
						xCoordinate={1}
						yCoordinate={1}
					/>
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render the bookmark icon properly', () => {
		expect(container.find('img')).toHaveLength(1);
		expect(container.find('div')).toHaveLength(1);
	});
});
