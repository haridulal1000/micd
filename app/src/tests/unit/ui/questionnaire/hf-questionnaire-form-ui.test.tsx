import React, { Component } from 'react';
import { configure, mount, ReactWrapper, render } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../core/redux/store/store';
import HFQuestionnaireForm from '../../../../pages/patient/health-forms/formComponents/HFQuestionnaireForm';

configure({ adapter: new Adapter() });
describe('Questionnaire form component', () => {
	let container: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

	const mockData = {
		title: 'Lifestyle Screening',
		description: 'Lifestyle screening description.',
		sections: [
			{
				title: 'Living Habits',
				description: 'Living Habits description',
				questions: [
					{
						question_id: 123,
						text: 'Smoking',
						type: 'bool',
						answer: {
							id: 1122,
							value: true,
						},
						comments: [
							{
								id: 321,
								comment: '',
								updated_at: '',
							},
						],
					},
				],
			},
		],
	};

	beforeEach(() => {
		container = mount(
			<BrowserRouter>
				<Provider store={store}>
					<HFQuestionnaireForm questionnaireInfo={mockData} />
				</Provider>
			</BrowserRouter>,
		);
	});

	it('should render form title', () => {
		expect(container.find('.test-title')).toHaveLength(1);
	});

	it('should render form description', () => {
		expect(container.find('.test-description')).toHaveLength(1);
	});

	it('should render section title', () => {
		expect(container.find('.test-section-title')).toHaveLength(1);
	});

	it('should render section title description', () => {
		expect(container.find('.test-section-description')).toHaveLength(1);
	});

	it('should render answer', () => {
		expect(container.find('.test-answer')).toHaveLength(1);
	});

	it('should render comment', () => {
		expect(container.find('.test-comment')).toHaveLength(1);
	});

	it('should render total p elements', () => {
		expect(container.find('p')).toHaveLength(5);
	});
});
