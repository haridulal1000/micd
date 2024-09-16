import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../core/interfaces/patient.interface';
import { getFullName } from '../core/utilities/name';

interface IBreadcrumbProps {
	page: string;
	individual: string;
	individualIdentifier?: string;
	item?: string;
	workspaceSlug: string;
	selectedPatient: IPatient | null;
}

export const Breadcrumb = (props: IBreadcrumbProps) => {
	const navigate = useNavigate();

	return (
		<div className="p-4 flex gap-3 text-breadcrum">
			<span
				className="cursor-pointer"
				onClick={() =>
					navigate(`/workspace/${props.workspaceSlug}/patients`)
				}
			>
				{props.page}
			</span>
			<span className="font-semibold">{' > '}</span>
			<span
				className="cursor-pointer"
				onClick={() =>
					navigate(
						`/workspace/${props.workspaceSlug}/patients/${props?.selectedPatient?.id}`,
					)
				}
			>
				{props.selectedPatient &&
					getFullName(
						props.selectedPatient?.first_name,
						props.selectedPatient?.last_name,
					)}
			</span>
			<span className="font-semibold">{' > '}</span>
			<span className="text-primary font-bold">{props.item}</span>
		</div>
	);
};

export default Breadcrumb;
