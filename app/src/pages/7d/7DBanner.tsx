import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentD } from '../../core/redux/reducers/DSlice';
import { RootState } from '../../core/redux/store/store';
import DButton from '../../components/d-button';

const Ds = [
	{
		buttonIconSrc: '/d-icon-document.svg',
		buttonActiveIconSrc: '/d-icon-document-active.svg',
		buttonText: 'Document',
	},
	{
		buttonIconSrc: '/d-icon-detect.svg',
		buttonActiveIconSrc: '/d-icon-detect-active.svg',
		buttonText: 'Detect',
	},
	{
		buttonIconSrc: '/d-icon-discuss.svg',
		buttonActiveIconSrc: '/d-icon-discuss-active.svg',
		buttonText: 'Discuss',
	},
	{
		buttonIconSrc: '/d-icon-design.svg',
		buttonActiveIconSrc: '/d-icon-design-active.svg',
		buttonText: 'Design',
	},
	{
		buttonIconSrc: '/d-icon-display.svg',
		buttonActiveIconSrc: '/d-icon-display-active.svg',
		buttonText: 'Display',
	},
	{
		buttonIconSrc: '/d-icon-decide.svg',
		buttonActiveIconSrc: '/d-icon-decide-active.svg',
		buttonText: 'Decide',
	},
	{
		buttonIconSrc: '/d-icon-deliver.svg',
		buttonActiveIconSrc: '/d-icon-deliver-active.svg',
		buttonText: 'Deliver',
	},
];

const SevenDBanner = (props: { caseId: number; workspaceSlug: string }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentD } = useSelector((state: RootState) => state.dButtons);
	const handleBtnClick = (btnIndex: number) => {
		dispatch(setCurrentD(btnIndex));
		navigate(
			`/workspace/${props.workspaceSlug}/patients/case-libray/${props.caseId}/7d/${btnIndex}`,
		);
	};

	return (
		<div className="flex md:flex-wrap lg:flex-nowrap gap-3 justify-items-stretch py-4">
			{Ds.map((D, index) => (
				<div key={index} className="flex-grow">
					<DButton
						currentIndex={index}
						activeIndex={currentD}
						buttonIconSrc={D.buttonIconSrc}
						buttonActiveIconSrc={D.buttonActiveIconSrc}
						buttonText={D.buttonText}
						classes={`bg-white p-4
						${currentD === index ? 'active-d-btn' : ''} xl:min-h-[80px] xl:min-w-[120px]`}
						onClickCallback={handleBtnClick}
					/>
				</div>
			))}
		</div>
	);
};

export default SevenDBanner;
