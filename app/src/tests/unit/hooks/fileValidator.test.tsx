import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
	FileType,
	useFileValidation,
} from '../../../core/utilities/hooks/useFileValidation';
import HooksTestingComponent from './HooksTestingComponent';

class MockFile {
	mockFile: File;
	get = () => this.mockFile;
	constructor(name: string, size: number, fileType: string) {
		let blob = new Blob(['a'.repeat(size)]);
		this.mockFile = new File([blob], name, { type: fileType });
	}
}

configure({ adapter: new Adapter() });
describe('useFileValidation', () => {
	const Component = ({ mockFile, fileType }: any) => {
		const props = useFileValidation(mockFile, fileType);
		return <HooksTestingComponent {...props} />;
	};

	it('should correctly detect invalid filetype', () => {
		const mockFile = new MockFile('file.txt', 1024, 'plain/text');
		const container = shallow(
			<Component
				mockFile={mockFile.get()}
				fileType={FileType.USER_AVATAR_IMAGE}
			/>,
		);
		const validationResult = container.props();
		expect(validationResult.error).toBeTruthy();
		expect(validationResult.messages.length).toBe(1);
		expect(validationResult.messages[0]).toBe(
			'Only PNG and JPEG files are supported',
		);
	});

	it('should correctly detect large filesizes', () => {
		const mockFile = new MockFile('file.png', 10000024, 'image/png');
		const container = shallow(
			<Component
				mockFile={mockFile.get()}
				fileType={FileType.USER_AVATAR_IMAGE}
			/>,
		);
		const validationResult = container.props();
		expect(validationResult.error).toBeTruthy();
		expect(validationResult.messages.length).toBe(1);
		expect(validationResult.messages[0]).toBe(
			'User avatar can be no larger than 5 MB',
		);
	});

	it('should correctly detect invalid filetype with large filesizes', () => {
		const mockFile = new MockFile('file.dicom', 10000024, 'image/dicom');
		const container = shallow(
			<Component
				mockFile={mockFile.get()}
				fileType={FileType.USER_AVATAR_IMAGE}
			/>,
		);
		const validationResult = container.props();
		expect(validationResult.error).toBeTruthy();
		expect(validationResult.messages.length).toBe(2);
		expect(validationResult.messages[0]).toBe(
			'Only PNG and JPEG files are supported',
		);
		expect(validationResult.messages[1]).toBe(
			'User avatar can be no larger than 5 MB',
		);
	});

	it('should correctly detect valid filetypes with appropriate size', () => {
		const mockFile = new MockFile('file.png', 1024, 'image/png');
		const container = shallow(
			<Component
				mockFile={mockFile.get()}
				fileType={FileType.USER_AVATAR_IMAGE}
			/>,
		);
		const validationResult = container.props();
		expect(validationResult.error).not.toBeTruthy();
		expect(validationResult.messages.length).toBe(0);
	});
});
