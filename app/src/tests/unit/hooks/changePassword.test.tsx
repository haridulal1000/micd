import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useChangePasswordFormValidation from '../../../core/utilities/hooks/useChangePasswordFormValidation';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useChangePasswordFormValidation', () => {
	const Component = () => {
		const props = useChangePasswordFormValidation();
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
			password: '',
			repeatPassword: '',
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			email: 'test@test.com',
			password: 'password123',
			repeatPassword: 'password123',
		});
		expect(errors).toBe(0);
	});

	it('validation should run correctly with different repeat password', () => {
		const errors = container.prop('runValidation')({
			email: 'test@test.com',
			password: 'password123',
			repeatPassword: 'password321',
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with short passwords', () => {
		const errors = container.prop('runValidation')({
			email: 'test@test.com',
			password: 'pass',
			repeatPassword: 'pass',
		});
		expect(errors).toBe(1);
	});
});
