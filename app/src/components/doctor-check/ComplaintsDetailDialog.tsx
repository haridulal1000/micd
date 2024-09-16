import React from 'react';
import { XIcon } from 'lucide-react';
import Modal from '../ui/modal';
import { FormFieldSavedResponse } from '../../core/services/dentist-forms-service';
import CssUtils from '../../core/utilities/css-utils';

const ComplaintsDetailDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	data: FormFieldSavedResponse<'complaints'>;
}> = ({ onClose, open, data }) => (
	<Modal
		open={open}
		className={
			'bg-white shadow-2xl rounded-lg p-4 focus-visible:outline-none  sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px] max-h-60 min-h-[600px] overflow-scroll'
		}
	>
		<div className={'flex items-center justify-between mb-4'}>
			<h1 className="text-zinc-800 text-xl font-medium leading-9 text-center">
				Complaints
			</h1>

			<div onClick={onClose} className={'cursor-pointer'}>
				<XIcon className={'h-5 w-5 text-grayText'} />
			</div>
		</div>

		<div className={'flex flex-col space-y-2 text-sm'}>
			{data.data.map((field, index) => {
				const isLastIndex = index === data.data.length - 1;
				return (
					<div
						className={CssUtils.cn(
							isLastIndex ? '' : 'border-b-2 pb-2',
							'flex flex-col justify-between',
						)}
					>
						<div className={'text-sm'}>{field.complaint_type}:</div>
						<div className={'bg-sapphirePale p-1 '}>
							{field.description}
						</div>
					</div>
				);
			})}
		</div>
	</Modal>
);

export default ComplaintsDetailDialog;
