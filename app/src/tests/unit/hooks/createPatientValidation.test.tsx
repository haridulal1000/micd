import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useCreatePatientFormValidation from '../../../core/utilities/hooks/useCreatePatientFormValidation';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useCreatePatientFormValidation', () => {
	const Component = () => {
		const props = useCreatePatientFormValidation();
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
			age: '',
			sex: '',
			contactNumber: '',
			emergencyContact: '',
			address: '',
		});
		expect(errors).toBe(7);
	});

	it('validation should run correctly with correct data', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			age: 23,
			sex: 'male',
			contactNumber: '9841554563',
			emergencyContact: '9824950430',
			address: 'birtamod',
		});
		expect(errors).toBe(0);
	});

	it('validation should run correctly with negetive age', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			age: -23,
			sex: 'other',
			contactNumber: '9841554563',
			emergencyContact: '9824950430',
			address: 'birtamod',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with invalid sex', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			age: 23,
			sex: 'parrot',
			contactNumber: '9841554563',
			emergencyContact: '9824950430',
			address: 'birtamod',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with invalid contact number', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			age: 23,
			sex: 'female',
			contactNumber: '9841554s563',
			emergencyContact: '+9779824950430',
			address: 'birtamod',
		});
		expect(errors).toBe(1);
	});

	it('validation should run correctly with invalid emergency contact', () => {
		const errors = container.prop('runValidation')({
			firstName: 'test',
			lastName: 'testing',
			age: 23,
			sex: 'male',
			contactNumber: '+977 984 155 4563',
			emergencyContact: 'hellohello',
			address: 'birtamod',
		});
		expect(errors).toBe(1);
	});
});
