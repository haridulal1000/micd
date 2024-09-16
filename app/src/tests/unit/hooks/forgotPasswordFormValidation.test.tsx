import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useForgotPasswordFormValidator from '../../../core/utilities/formValidation/useForgotPasswordFormValidation';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useForgotPasswordFormValidator', () => {
	const Component = () => {
		const props = useForgotPasswordFormValidator();
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
			email: '',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with invalid email', () => {
		const errors = container.prop('runValidation')({
			email: 'test.com',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			email: 'test@test.com',
		});
		expect(errors).toBe(0);
	});
});
