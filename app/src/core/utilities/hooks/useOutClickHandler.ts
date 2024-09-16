import React, { SyntheticEvent, useRef } from 'react';

type OutClickCallback = (event: SyntheticEvent) => void;

const useOutClickHandler = (callback: OutClickCallback, _ref?: any) => {
	const ref = useRef<any>(null);

	React.useEffect(() => {
		const handleClick = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(event);
			}
		};

		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, [ref]);

	return ref;
};

export default useOutClickHandler;
