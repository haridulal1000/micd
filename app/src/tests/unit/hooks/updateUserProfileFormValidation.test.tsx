import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HooksTestingComponent from './HooksTestingComponent';
import useUpdateUserProfileFormValidator from '../../../core/utilities/hooks/useUpdateUserProfileFormValidator';

configure({ adapter: new Adapter() });
describe('useUpdateUserProfileFormValidator', () => {
	const Component = () => {
		const props = useUpdateUserProfileFormValidator();
		return <HooksTestingComponent {...props} />;
	};

	const container = shallow(<Component />);

	it('should have proper props', () => {
		expect(container.prop('formErrors')).toBeDefined();
		expect(container.prop('runValidation')).toBeDefined();
		expect(container.prop('clearState')).toBeDefined();
	});

	it('validation should run correctly with empty data', () => {
		const errors = container.prop('runValidation')({
			firstName: '',
			lastName: '',
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			firstName: 'shyam',
			lastName: 'bc',
		});
		expect(errors).toBe(0);
	});
});
