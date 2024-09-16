import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentD } from '../../core/redux/reducers/DSlice';
import { RootState } from '../../core/redux/store/store';
import { PrimaryBtn } from '../../components/shared/form/btn';

const Footer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentD } = useSelector((state: RootState) => state.dButtons);
	const isFirstPage: boolean = currentD === 0;
	const isLastPage: boolean = currentD === 6;

	const previousPage = () => (isFirstPage ? currentD : currentD - 1);
	const nextPage = () => (isLastPage ? currentD : currentD + 1);

	return (
		<div className="px-16 h-24 mt-6 bg-footerBlue w-full flex items-center justify-between">
			<div
				className={`flex gap-2 
					${!isFirstPage ? 'cursor-pointer' : 'text-grayedLabel'}`}
				onClick={() => {
					if (isFirstPage) return;
					dispatch(setCurrentD(previousPage()));
					navigate(`/7d/${previousPage()}`);
				}}
			>
				<span className="font-semibold"> {'< '}</span>
				<span>Previous step</span>
			</div>
			<div
				onClick={() => {
					if (isLastPage) return;
					dispatch(setCurrentD(nextPage()));
					navigate(`/7d/${nextPage()}`);
				}}
			>
				<PrimaryBtn
					classes="px-6 py-2 font-light"
					disabled={isLastPage}
				>
					Next Step
				</PrimaryBtn>
			</div>
		</div>
	);
};

export default Footer;
