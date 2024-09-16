import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useCodeSubmission from '../../../core/utilities/hooks/useCodeSubmission';
import HooksTestingComponent from './HooksTestingComponent';

configure({ adapter: new Adapter() });
describe('useRegisterFormValidator', () => {
	const Component = () => {
		const props = useCodeSubmission();
		return <HooksTestingComponent {...props} />;
	};

	const container = shallow(<Component />);

	it('should have proper props', () => {
		expect(container.prop('codeValues')).toBeDefined();
		expect(container.prop('checkValues')).toBeDefined();
		expect(container.prop('changeValues')).toBeDefined();
	});

	it('should have the initial state as empty strings', () => {
		let initalCodeValues = {
			first: '',
			second: '',
			third: '',
			forth: '',
			fifth: '',
			sixth: '',
		};

		expect(container.prop('codeValues')).toStrictEqual(initalCodeValues);
	});

	it('return false if all the code values are not filled', () => {
		const returnVal = container.prop('checkValues')(null);
		expect(returnVal).toBe(false);
	});

	it('should return true when the length of value is 6', () => {
		const value = '123456';
		const returnVal = container.prop('checkValues')(value);

		expect(returnVal).toBe(true);
	});

	it('should change the value on change', () => {
		const value = '1';

		container.prop('changeValues')('first', value);
		expect(container.prop('codeValues').first).toBe('1');

		container.prop('changeValues')('second', value);
		expect(container.prop('codeValues').second).toBe('1');

		container.prop('changeValues')('third', value);
		expect(container.prop('codeValues').third).toBe('1');

		container.prop('changeValues')('forth', value);
		expect(container.prop('codeValues').forth).toBe('1');

		container.prop('changeValues')('fifth', value);
		expect(container.prop('codeValues').fifth).toBe('1');

		container.prop('changeValues')('sixth', value);
		expect(container.prop('codeValues').sixth).toBe('1');
	});

	it('return true if all the code values are filled', () => {
		const returnVal = container.prop('checkValues')(null);
		expect(returnVal).toBe(true);
	});
});
