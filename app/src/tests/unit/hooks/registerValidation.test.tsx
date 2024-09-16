import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useRegisterFormValidator from '../../../core/utilities/hooks/useRegisterFormValidator';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useRegisterFormValidator', () => {
	const Component = () => {
		const props = useRegisterFormValidator();
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
			email: '',
			password: '',
			repeatPassword: '',
		});
		expect(errors).toBe(4);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			email: 'test@test.com',
			password: 'password123',
			repeatPassword: 'password123',
		});
		expect(errors).toBe(0);
	});
});
