import React from 'react';
import { XIcon } from 'lucide-react';
import Modal from '../ui/modal';
import { FormFieldSavedResponse } from '../../core/services/dentist-forms-service';
import CssUtils from '../../core/utilities/css-utils';

const MonthlyEvaluationDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	data: FormFieldSavedResponse<'monthly_evaluation'>;
}> = ({ onClose, open, data }) => (
	<Modal
		open={open}
		className={
			'bg-white shadow-2xl rounded-lg p-4 focus-visible:outline-none  sm:w-[846px] lg:w-[846px] xl:w-[846px] 2xl:w-[846px]'
		}
	>
		<div className={'flex items-center justify-between mb-4'}>
			<h1 className="text-zinc-800 text-xl font-medium leading-9 text-center">
				Monthly Evaluation
			</h1>

			<div onClick={onClose} className={'cursor-pointer'}>
				<XIcon className={'h-5 w-5 text-grayText'} />
			</div>
		</div>

		<div className={'flex flex-col space-y-2 text-sm'}>
			{data.fields.map((field, index) => {
				const isLastIndex = index === data.fields.length - 1;
				return (
					<div
						className={CssUtils.cn(
							isLastIndex ? '' : 'border-b-2 pb-2',
							'flex flex-row justify-between',
						)}
					>
						<div className={'w-[270px] '}>{field.text}:</div>
						<div className={'w-[115px]'}>{field.value}</div>
					</div>
				);
			})}
		</div>
	</Modal>
);

export default MonthlyEvaluationDialog;
