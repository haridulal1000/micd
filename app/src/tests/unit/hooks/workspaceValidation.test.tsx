import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useWorkspaceFormValidator from '../../../core/utilities/hooks/useWorkspaceFormValidation';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useWorkspaceFormValidation', () => {
	const Component = () => {
		const props = useWorkspaceFormValidator();
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
			name: '',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			name: 'testing',
		});
		expect(errors).toBe(0);
	});
});
