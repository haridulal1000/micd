import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HooksTestingComponent from './HooksTestingComponent';
import useChangeCurrentPasswordFormValidator from '../../../core/utilities/hooks/useChangeCurrentPasswordFormValidator';

configure({ adapter: new Adapter() });
describe('useChangeCurrentPasswordFormValidator', () => {
	const Component = () => {
		const props = useChangeCurrentPasswordFormValidator();
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
			currentPassword: '',
			password: '',
			repeatPassword: '',
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			currentPassword: 'test1234',
			password: 'mega1234',
			repeatPassword: 'mega1234',
		});
		expect(errors).toBe(0);
	});

	it('validation should run correctly with different repeat password', () => {
		const errors = container.prop('runValidation')({
			currentPassword: 'test1234',
			password: 'mega1234',
			repeatPassword: 'bela1234',
		});
		expect(errors).toBe(2);
	});

	it('validation should run correctly with short passwords', () => {
		const errors = container.prop('runValidation')({
			currentPassword: 'test1234',
			password: 'pas',
			repeatPassword: 'pas',
		});
		expect(errors).toBe(1);
	});
});
