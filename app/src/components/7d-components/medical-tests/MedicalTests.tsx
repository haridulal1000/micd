import React from 'react';
import { PencilLine, PlusCircle, Trash2Icon } from 'lucide-react';
import { useSelector } from 'react-redux';
import Divider from '../../ui/divider';
import DateTimeRainbowPill from '../../date-time-rainbow-pill';
import AddMedicalTestsDialog from './AddMedicalTestsDialog';
import { MedicalTestsResponse } from '../../../core/interfaces/medicalTests.interface';
import MedicalTestsService from '../../../core/services/medical-tests-service';
import { RootState } from '../../../core/redux/store/store';

const MedicalTests: React.FC<{
	tests: MedicalTestsResponse[];
	revalidate: () => void;
}> = ({ tests, revalidate }) => {
	const [showAddMedicalTestsDialog, setShowAddMedicalTestsDialog] =
		React.useState(false);
	const [selectedTest, setSelectedTest] = React.useState<
		MedicalTestsResponse | undefined
	>();
	const slug = useSelector(
		(state: RootState) => state.workspace.workspaceInfo?.slug || '',
	);
	const [isDeletingIndex, setIsDeletingIndex] = React.useState<{
		[key: number]: boolean;
	}>({});

	const handleDeleteMedicalTest = async (id: number) => {
		setIsDeletingIndex((prev) => ({ ...prev, [id]: true }));
		await MedicalTestsService.deleteMedicalTestsForPatient(id, slug);
		revalidate();
		setSelectedTest(undefined);
		setIsDeletingIndex((prev) => ({ ...prev, [id]: false }));
	};

	return (
		<div className={'my-4'}>
			<h6 className={'text-xl font-semibold'}>Medical Tests</h6>
			<Divider />
			{tests?.length < 1 && (
				<span className="italic">No medical tests found</span>
			)}
			<table className={'w-full'}>
				<tbody>
					{tests.map((test, index) => (
						<tr key={index}>
							<td className={'px-1 py-2 w-[300px]'}>
								{test.medical_test_name}
							</td>
							<td className={'px-1 py-2 '}>{test.value}</td>
							<td className={'px-1 py-2'}>
								<DateTimeRainbowPill value={test.test_date} />
							</td>
							<td>
								<div
									className={
										'flex items-center justify-center gap-2'
									}
								>
									<div
										className={
											'flex items-center gap-1 text-primary cursor-pointer'
										}
										onClick={() => {
											setSelectedTest(test);
											setShowAddMedicalTestsDialog(true);
										}}
									>
										<PencilLine className={'w-5 h-5'} />
										<p className={'uppercase text-sm'}>
											Edit
										</p>
									</div>
									<div
										className={
											'flex items-center gap-1 text-red-500 cursor-pointer'
										}
										onClick={() =>
											handleDeleteMedicalTest(test.id)
										}
									>
										<Trash2Icon className={'w-5 h-5'} />
										<p className={'uppercase text-sm'}>
											{isDeletingIndex[test.id]
												? 'Deleting'
												: 'Delete'}
										</p>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button
					onClick={() => setShowAddMedicalTestsDialog(true)}
					className={'text-primary  flex gap-2 items-center my-8'}
				>
					<PlusCircle className={'w-5 h-5'} />
					<p className={'uppercase text-sm'}>Add more medical test</p>
				</button>
			</div>

			{showAddMedicalTestsDialog && (
				<AddMedicalTestsDialog
					revalidate={revalidate}
					test={selectedTest}
					open={showAddMedicalTestsDialog}
					setOpen={() => {
						setShowAddMedicalTestsDialog(false);
						setSelectedTest(undefined);
					}}
				/>
			)}
		</div>
	);
};

export default MedicalTests;
