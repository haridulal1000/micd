import React, { useMemo } from 'react';
import { PageInfo } from '../../../core/interfaces/page.interface';

const Pagination = (props: { pageInfo: PageInfo; handlePageOnClick: any }) => {
	const currentPage = useMemo(() => {
		if (props.pageInfo.prev === null) {
			return 1;
		}
		if (props.pageInfo.next === null) {
			return Number(props.pageInfo.prev?.split('page=')[1]) + 1;
		}
		return Number(props.pageInfo.next?.split('page=')[1]) - 1;
	}, [props.pageInfo.prev, props.pageInfo.next]);

	return (
		<div>
			<ul className="inline-flex items-center -space-x-px">
				<span className="text-sm test-current-page px-5">
					Showing page {currentPage} of {props.pageInfo.pages}
					{' : '}
				</span>

				{/* Previous button */}
				{props.pageInfo.prev !== null && (
					<li
						key="prev"
						className="test-prev"
						aria-disabled={true}
						onClick={() =>
							props.handlePageOnClick({ page: currentPage - 1 })
						}
					>
						<a
							href="#"
							className="block px-3 py-2 ml-0 leading-tight text-gray hover:text-darkGray hover:bg-white"
						>
							<span className="sr-only">Previous</span>
							<svg
								aria-hidden="false"
								className="w-5 h-5"
								fill="gray"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
							</svg>
						</a>
					</li>
				)}

				{/* Page buttons */}
				{[...Array(props.pageInfo.pages)].map((_, i) => (
					<li key={i} className="px-1">
						<button
							onClick={() =>
								props.handlePageOnClick({ page: i + 1 })
							}
							className={`px-3 py-2 ${
								currentPage === i + 1
									? 'text-white bg-primary'
									: 'text-black bg-gray'
							}`}
						>
							{i + 1}
						</button>
					</li>
				))}

				{/* Next button */}
				{props.pageInfo.next !== null && (
					<li
						key="next"
						className="test-next"
						onClick={() =>
							props.handlePageOnClick({ page: currentPage + 1 })
						}
					>
						<div className="block px-3 py-2 leading-tight text-gray hover:text-darkGray hover:bg-white">
							<span className="sr-only">Next</span>
							<svg
								aria-hidden="false"
								className="w-5 h-5"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
							</svg>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Pagination;
