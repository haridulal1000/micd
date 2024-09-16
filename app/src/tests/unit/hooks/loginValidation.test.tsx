import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useLoginFormValidator from '../../../core/utilities/hooks/useLoginFormValidation';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useLoginFormValidator', () => {
	const Component = () => {
		const props = useLoginFormValidator();
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
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			email: 'test@test.com',
			password: 'password123',
		});
		expect(errors).toBe(0);
	});
});
