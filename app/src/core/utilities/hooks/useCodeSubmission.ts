import { useState } from 'react';
import { ICodeFormat } from '../../interfaces/common.interface';

function useCodeSubmission() {
	const [codeValues, setCodeValues] = useState<ICodeFormat>({
		first: '',
		second: '',
		third: '',
		forth: '',
		fifth: '',
		sixth: '',
	});

	const checkValues = (value: string | null): boolean => {
		if (typeof value === 'string' && value.length === 6) {
			const newCode = {
				first: value[0],
				second: value[1],
				third: value[2],
				forth: value[3],
				fifth: value[4],
				sixth: value[5],
			};
			setCodeValues(newCode);
			return true;
		}
		if (value === null) {
			const checkedVal = Object.values(codeValues).filter(
				(a) => a === '',
			);
			if (checkedVal.length > 0) return false;
			return true;
		}
		return false;
	};

	const changeValues = (id: string, value: string) => {
		const newCode = {
			[id]: value,
		};
		setCodeValues((prev) => ({ ...prev, ...newCode }));
	};

	return {
		codeValues,
		checkValues,
		changeValues,
	};
}

export default useCodeSubmission;
