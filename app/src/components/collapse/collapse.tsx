import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { IFieldValue } from '../../core/interfaces/teeth.interface';
import { updateToothExaminationFieldService } from '../../core/services/teeth.service';
import { RootState } from '../../core/redux/store/store';
import { notifySuccess } from '../shared/form/toast';

function CollapseComponent(props: {
	children: React.ReactNode;
	name: string;
	fieldValue: IFieldValue;
}) {
	const [openState, setOpenState] = useState<boolean>(false);
	useEffect(() => {
		setOpenState(!!props?.fieldValue?.value_bool);
	}, [props?.fieldValue?.value_bool]);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	useEffect(() => {
		if (props?.fieldValue) setOpenState(props?.fieldValue?.value_bool);
	}, [props?.fieldValue?.value_bool]);
	const handleFieldCheck = (e: React.SyntheticEvent): void => {
		updateToothExaminationFieldService(
			props?.fieldValue.id,
			{
				value_bool: !openState,
			},
			workspaceInfo?.slug || 'null',
		).then((response: AxiosResponse<IFieldValue>) => {
			notifySuccess('Field Updated Successfully');
			setOpenState(!openState);
		});
	};
	return (
		<div className="my-6">
			<div
				className="flex gap-2 items-start w-full"
				onClick={(e) => {
					handleFieldCheck(e);
				}}
			>
				<i
					className={`${
						openState
							? 'checked-square-icon'
							: 'unchecked-square-icon'
					} block cursor-pointer`}
				></i>
				<button className="bg-transparent block w-fit">
					{props.name}
				</button>
				<i className="down-arrow-icon"></i>
			</div>
			{openState && (
				<div className="ml-4 border-l-2 px-4 border-l-primary my-4">
					{props.children}
				</div>
			)}
		</div>
	);
}

export default CollapseComponent;
