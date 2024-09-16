/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ILabelValue } from '../../../../core/interfaces/common.interface';
import SystemEnum from '../../../../components/shared/teeth/teeth.data';
import TeethChartComponent from '../../../../components/shared/teeth/teeth-chart';
import {
	addToothNoteService,
	deleteToothNoteService,
	deleteTooththImageService,
	getAllTooththImagesService,
	getTeethService,
	getToothExaminationService,
	getToothNotesService,
	updateToothExaminationFieldService,
	uploadTooththImageService,
} from '../../../../core/services/teeth.service';
import { RootState } from '../../../../core/redux/store/store';
import {
	IExaminationResponse,
	IFieldItem,
	IToothGeneralDetails,
} from '../../../../core/interfaces/teeth.interface';
import { ExaminationCodeEnum } from '../../../../core/enums/teeth.enum';
import DentoGingivalChart from './dento-gingival-chart/dento-gingival-chart';
import LargeImagesComponent from './large-images/large-images';
import { ICaseImage, INotes } from '../../../../core/interfaces/case.interface';
import RemarksBox from '../../../7d/remarks-box';
import ModalHeaderComponent from '../../../../components/shared/modal-header/modal-header';
import {
	addPatientNoteService,
	deleteGeneralImageService,
	deletePatientNoteService,
	getAllGeneralImagesService,
	getPatientNotesService,
	uploadGeneralImageService,
} from '../../../../core/services/patient.service';
import { IAddPatientNoteResponse } from '../../../../core/interfaces/patient.interface';
import Spinner, { BigSpinner } from '../../../../components/ui/Spinner';
import Modal from '../../../../components/ui/modal';
import ConfirmationBoxComponent from '../../../../components/ui/confirmation-box';
import {
	notifyError,
	notifySuccess,
} from '../../../../components/shared/form/toast';

const HFGeneralExamination = () => {
	const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
	const [confirmFunction, setConfirmFunction] = useState<() => void>(
		() => null,
	);

	const [generalTeethList, setGeneralTeethList] = useState<
		IToothGeneralDetails[]
	>([]);
	const [generalImages, setGeneralImages] = useState<ICaseImage[]>([]);
	const [toothImages, setToothImages] = useState<ICaseImage[]>([]);
	const [toothStatuses, setToothStatuses] = useState<IFieldItem[]>([]);
	const [isGeneralImagesLoading, setIsGeneralImagesLoading] =
		useState<boolean>(false);
	const [isTeethsLoading, setIsTeethsLoading] = useState<boolean>(false);
	const { selectedPatient } = useSelector(
		(state: RootState) => state.patient,
	);
	const [system, setSystem] = useState(SystemEnum.PALMER);
	const [detailedView, setDetailedView] = useState<boolean>(false);
	const [selectedTeethIndex, setSelectedTeethIndex] = useState<number | null>(
		null,
	);
	const [patientNotes, setPatientNotes] = useState<IAddPatientNoteResponse[]>(
		[],
	);
	const [toothNotes, setToothNotes] = useState<IAddPatientNoteResponse[]>([]);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const [teethHasIssues, setTeethHasIssues] = useState<{
		[key: string]: boolean;
	}>({});
	const [missingTeethStatus, setMissingTeethStatus] = useState<{
		[key: string]: boolean;
	}>({});
	const handleConfirm = () => {
		confirmFunction();
		setIsConfirmOpen(false);
		setConfirmFunction(() => null);
	};
	const getGeneralToothExamination = (toothId: number): void => {
		getToothExaminationService(
			toothId,
			ExaminationCodeEnum.TOOTH_SPECIFIC,
			workspaceInfo?.slug || null,
		).then((examinationResponse: AxiosResponse<IExaminationResponse>) => {
			setToothStatuses([]);
			setToothStatuses(examinationResponse.data.fields);
		});
	};
	const mapToothStatus = (teethArray: IToothGeneralDetails[]) => {
		const mappedToothStatus = teethArray.reduce(
			(acc: { [key: string]: boolean }, tooth, currentIndex) => {
				acc[currentIndex + 1] = tooth.tooth_status.length > 0;
				return acc;
			},
			{},
		);

		const missingToothStatus = teethArray.reduce(
			(acc: { [key: string]: boolean }, tooth, currentIndex) => {
				acc[currentIndex + 1] = tooth.tooth_status.some(
					(status) => 'Missing Tooth' in status,
				);
				return acc;
			},
			{},
		);

		setMissingTeethStatus(missingToothStatus);
		setTeethHasIssues(mappedToothStatus);
	};

	useEffect(() => {
		setIsTeethsLoading(true);
		getTeethService(
			selectedPatient?.id || null,
			workspaceInfo?.slug || null,
		)
			.then((response: AxiosResponse<IToothGeneralDetails[]>) => {
				setGeneralTeethList(response.data);
				setIsTeethsLoading(false);
				mapToothStatus(response.data);
			})
			.catch(() => {
				setIsTeethsLoading(false);
			});
		if (selectedPatient?.id) {
			setIsGeneralImagesLoading(true);
			getAllGeneralImagesService(
				selectedPatient?.id || null,
				workspaceInfo?.slug || '',
			)
				.then((response: AxiosResponse<ICaseImage[]>) => {
					const responseImages: ICaseImage[] = [...response.data];
					setGeneralImages(responseImages);
					setIsGeneralImagesLoading(false);
				})
				.catch(() => {
					setIsGeneralImagesLoading(false);
				});
			getPatientNotesService(
				selectedPatient?.id || null,
				workspaceInfo?.slug || '',
			).then((response: AxiosResponse<IAddPatientNoteResponse[]>) => {
				setPatientNotes(response.data);
			});
		}
	}, []);
	useEffect(() => {
		if (selectedTeethIndex || selectedTeethIndex === 0) {
			getGeneralToothExamination(
				generalTeethList[selectedTeethIndex].patient_tooth_id,
			);
			if (
				generalTeethList[selectedTeethIndex].patient_tooth_id === 0 ||
				generalTeethList[selectedTeethIndex].patient_tooth_id
			) {
				getAllTooththImagesService(
					generalTeethList[selectedTeethIndex].patient_tooth_id,
					workspaceInfo?.slug || '',
				).then((response: AxiosResponse<ICaseImage[]>) => {
					const responseImages: ICaseImage[] = [...response.data];
					setToothImages(responseImages);
				});
				getToothNotesService(
					generalTeethList[selectedTeethIndex].patient_tooth_id,
					workspaceInfo?.slug || null,
				).then((response: AxiosResponse<IAddPatientNoteResponse[]>) => {
					setToothNotes(response.data);
				});
			}
		}
	}, [selectedTeethIndex]);

	const teethList: ILabelValue[] = useMemo(
		() =>
			Array.from({ length: 52 }, (_, i: number) => ({
				label: `Teeth-${i + 1}`,
				value: (i + 1).toString(),
			})),
		[],
	);
	const setTeethState = (value: string, teethArray: ILabelValue[]) =>
		teethArray.find((_: ILabelValue) => _.value === value);
	const handleToothSelected = (index: number): void => {
		setSelectedTeethIndex(index - 1);
	};

	function deleteToothImage(imageToBeDeleted: ICaseImage): void {
		deleteTooththImageService(
			imageToBeDeleted.id || null,
			workspaceInfo?.slug || '',
		).then((_response: AxiosResponse<ICaseImage>) => {
			const newImages: ICaseImage[] = toothImages.filter(
				(image: ICaseImage) => image.id !== imageToBeDeleted.id,
			);
			notifySuccess('Image deleted successfully');
			setToothImages(newImages);
		});
	}

	function deleteGeneralImage(imageToBeDeleted: ICaseImage): void {
		deleteGeneralImageService(
			imageToBeDeleted.id || null,
			workspaceInfo?.slug || '',
		).then(() => {
			const newImages: ICaseImage[] = generalImages.filter(
				(image: ICaseImage) => image.id !== imageToBeDeleted.id,
			);
			notifySuccess('Image deleted successfully');
			setGeneralImages(newImages);
		});
	}

	function handleUploadToothImage(
		uploadImage: string,
		uploadImageDescription: string,
		uploadImageName: string,
	) {
		if (uploadImage && selectedTeethIndex) {
			uploadTooththImageService(
				generalTeethList[selectedTeethIndex]?.patient_tooth_id,
				workspaceInfo?.slug || '',
				uploadImage,
				uploadImageDescription,
				uploadImageName,
			)
				.then((imageUploadResponse: AxiosResponse<ICaseImage>) => {
					const responseImage: ICaseImage = imageUploadResponse?.data;
					const imagesArray: ICaseImage[] = [...toothImages];
					imagesArray.push(responseImage);
					setToothImages(imagesArray);
					notifySuccess('Image uploaded successfully');
				})
				.catch((e) => {
					notifyError(e.message);
				});
		}
	}

	function handleUploadGeneralImage(
		uploadImage: string,
		uploadImageDescription: string,
		uploadImageName: string,
	) {
		if (uploadImage) {
			uploadGeneralImageService(
				selectedPatient?.id || null,
				workspaceInfo?.slug || '',
				uploadImage,
				uploadImageDescription,
				uploadImageName,
			)
				.then((imageUploadResponse: AxiosResponse<ICaseImage>) => {
					const responseImage: ICaseImage = imageUploadResponse?.data;
					const imagesArray: ICaseImage[] = [...generalImages];
					imagesArray.push(responseImage);
					setGeneralImages(imagesArray);
					notifySuccess('Image uploaded successfully');
				})
				.catch((e) => {
					notifyError(e.message);
				});
		}
	}

	async function updateToothStatus(
		e: React.SyntheticEvent,
		index: number,
	): Promise<void> {
		const newState = [...toothStatuses];
		newState[index].field_value.value_bool =
			!newState[index].field_value.value_bool;
		setToothStatuses(newState);

		try {
			const res = await updateToothExaminationFieldService(
				toothStatuses[index].field_value.id,
				{
					value_bool: (e.target as HTMLInputElement).checked,
				},
				workspaceInfo?.slug || null,
			);

			const newStatus = [...toothStatuses];
			newStatus[index].field_value = res.data;
			notifySuccess('Field updated successfully');
			setToothStatuses(newStatus);
			getTeethService(
				selectedPatient?.id || null,
				workspaceInfo?.slug || null,
			)
				.then((response: AxiosResponse<IToothGeneralDetails[]>) => {
					setGeneralTeethList(response.data);
					setIsTeethsLoading(false);
					mapToothStatus(response.data);
				})
				.catch(() => {
					setIsTeethsLoading(false);
				});
		} catch (err: any) {
			setTimeout(() => {
				const prevState = [...toothStatuses];
				prevState[index].field_value.value_bool =
					!prevState[index].field_value.value_bool;
				setToothStatuses(prevState);
			}, 0);
		}
	}

	function addPatientNote(text: string): void {
		addPatientNoteService(
			selectedPatient?.id || null,
			workspaceInfo?.slug || '',
			text,
		).then((response: AxiosResponse<IAddPatientNoteResponse>) => {
			notifySuccess('Patient Note Added successfully');
			setPatientNotes([...patientNotes, response.data]);
		});
	}

	function deletePatientNote(commentId: number): void {
		deletePatientNoteService(
			commentId || null,
			workspaceInfo?.slug || '',
		).then((_response: AxiosResponse<IAddPatientNoteResponse>) => {
			notifySuccess('Patient Note Deleted successfully');
			setPatientNotes(
				patientNotes.filter(
					(note: IAddPatientNoteResponse) => note.id !== commentId,
				),
			);
		});
	}
	function addToothNote(text: string): void {
		if (selectedTeethIndex)
			addToothNoteService(
				generalTeethList[selectedTeethIndex].patient_tooth_id || null,
				workspaceInfo?.slug || '',
				text,
			).then((response: AxiosResponse<IAddPatientNoteResponse>) => {
				notifySuccess('Tooth Note Added successfully');
				setToothNotes([...toothNotes, response.data]);
			});
	}
	function deleteToothNote(commentId: number): void {
		deleteToothNoteService(
			commentId || null,
			workspaceInfo?.slug || '',
		).then((_response: AxiosResponse<IAddPatientNoteResponse>) => {
			notifySuccess('Patient Note Deleted successfully');
			setToothNotes(
				toothNotes.filter(
					(note: IAddPatientNoteResponse) => note.id !== commentId,
				),
			);
		});
	}
	return (
		<>
			{!isTeethsLoading && !isGeneralImagesLoading ? (
				<>
					<div className="flex p-4 rounded-lg gap-8">
						<div className=" border-night p-4 flex-[2] bg-white">
							<div className="flex justify-between px-4   items-center">
								<div className="font-bold text-xl">
									General Section
								</div>
							</div>
							<div className="flex">
								<div className="mx-auto my-8 w-fit min-w-[450px]">
									{!isTeethsLoading ? (
										<TeethChartComponent
											system={system}
											onItemSelected={handleToothSelected}
											teethHasIssues={teethHasIssues}
											missingTeethStatus={
												missingTeethStatus
											}
										/>
									) : (
										<Spinner />
									)}
								</div>
								{!!toothStatuses.length && (
									<div className="min-w-[300px]">
										<div className="flex gap-2 mb-4">
											{(selectedTeethIndex === 0 ||
												selectedTeethIndex) && (
												<button
													onClick={() =>
														setDetailedView(true)
													}
													className="max-w-full py-4 px-6 bg-blue-500 text-white rounded-md"
												>
													Tooth Specific Charting
												</button>
											)}
										</div>
										<div className="p-4">
											<div className="text-bold mb-4">
												General Tooth Status
											</div>
											<div>
												{toothStatuses.map(
													(
														statusItem: IFieldItem,
														index: number,
													) => (
														<label
															className="block my-6 cursor-pointer"
															key={statusItem.id}
														>
															<input
																className="mr-2"
																type="checkbox"
																checked={
																	statusItem
																		.field_value
																		.value_bool
																}
																onChange={(
																	e,
																) => {
																	updateToothStatus(
																		e,
																		index,
																	);
																}}
															/>
															{statusItem.text}
														</label>
													),
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex-1">
							<RemarksBox
								title="Notes/Remarks"
								handleSave={(comment: string) => {
									addPatientNote(comment);
								}}
								remarks={patientNotes.map(
									(note: IAddPatientNoteResponse) =>
										({
											id: note.id,
											text: note.text,
											updated_at: new Date(
												Number(note.updated_at),
											),
										} as unknown as INotes),
								)}
								deleteButton={true}
								handleDelete={(commentId: number) => {
									const temp = () =>
										deletePatientNote(commentId);
									setConfirmFunction(() => temp);
									setIsConfirmOpen(true);
								}}
							/>
						</div>
					</div>
					<div className="min-w-[50rem] grow p-4">
						<div className="bg-white">
							{!isGeneralImagesLoading ? (
								<LargeImagesComponent
									minimumSlideShowNumber={3}
									workSpaceSlug={
										workspaceInfo?.slug?.toString() || ''
									}
									itemId={selectedPatient?.id || null}
									onImageDeleted={(
										outputImage: ICaseImage,
									) => {
										const temp = () =>
											deleteGeneralImage(outputImage);
										setConfirmFunction(() => temp);
										setIsConfirmOpen(true);
									}}
									images={generalImages}
									onToothImageAdded={(
										newImageArray: ICaseImage[],
									) => {
										setGeneralImages(newImageArray);
									}}
									onImageUploaded={(
										uploadImage: string,
										uploadImageDescription: string,
										uploadImageName,
									) => {
										handleUploadGeneralImage(
											uploadImage,
											uploadImageDescription,
											uploadImageName,
										);
									}}
								/>
							) : (
								<Spinner />
							)}
						</div>
					</div>
					<Modal
						open={isConfirmOpen}
						className="flex items-center justify-center w-fit"
						onRequestClose={() => setIsConfirmOpen(false)}
					>
						<ConfirmationBoxComponent
							onConfirm={handleConfirm}
							onCancel={() => {
								setIsConfirmOpen(false);
							}}
						/>
					</Modal>
					<div className="bg-red p-3">
						{(selectedTeethIndex || selectedTeethIndex === 0) &&
							toothImages && (
								<div>
									{detailedView && (
										<div className="fixed top-0 pt-[12rem] left-0 w-screen h-screen  z-auto flex items-center justify-center overflow-auto">
											<div
												className="fixed bg-black opacity-75 h-screen w-screen top-0 left-0 z-10"
												onClick={() =>
													setDetailedView(false)
												}
											></div>
											<div className="absolute bg-midnightBlue rounded-lg w-[80%] z-20 p-4">
												<div className="text-bold py-4">
													<ModalHeaderComponent
														text="Detail Dental Examination"
														exitButton={true}
														optionsButton={true}
														onExit={() => {
															setDetailedView(
																false,
															);
														}}
													/>
												</div>
												<div className="flex gap-2 p-8 bg-white rounded-lg ">
													{(selectedTeethIndex ||
														selectedTeethIndex ===
															0) && (
														<div className="flex-[3] min-h-[35rem] overflow-auto">
															<div>
																<span className="mr-2">
																	Selected
																	Tooth:
																</span>
																{
																	generalTeethList[
																		selectedTeethIndex
																	].name
																}
															</div>
															<div className="relative w-full mx-auto flex flex-col justify-between py-[5rem] ">
																<img
																	className="block w-fit mx-auto"
																	src="/teeth-top-view.png"
																/>
															</div>
															<div>
																<LargeImagesComponent
																	slideShowNumber={
																		1
																	}
																	minimumSlideShowNumber={
																		1
																	}
																	workSpaceSlug={
																		workspaceInfo?.slug?.toString() ||
																		''
																	}
																	itemId={
																		generalTeethList[
																			selectedTeethIndex
																		]
																			?.patient_tooth_id
																	}
																	onImageDeleted={(
																		outputImage: ICaseImage,
																	) => {
																		const temp =
																			() =>
																				deleteToothImage(
																					outputImage,
																				);
																		setConfirmFunction(
																			() =>
																				temp,
																		);
																		setIsConfirmOpen(
																			true,
																		);
																	}}
																	images={
																		toothImages
																	}
																	onToothImageAdded={(
																		newImageArray: ICaseImage[],
																	) => {
																		setToothImages(
																			newImageArray,
																		);
																	}}
																	onImageUploaded={(
																		uploadImage: string,
																		uploadImageDescription: string,
																		uploadImageName: string,
																	) => {
																		handleUploadToothImage(
																			uploadImage,
																			uploadImageDescription,
																			uploadImageName,
																		);
																	}}
																/>
															</div>
															<div className="bg-white">
																<RemarksBox
																	title="Notes/Remarks"
																	handleSave={(
																		comment: string,
																	) => {
																		addToothNote(
																			comment,
																		);
																	}}
																	remarks={toothNotes.map(
																		(
																			note: IAddPatientNoteResponse,
																		) =>
																			({
																				id: note.id,
																				text: note.text,
																				updated_at:
																					new Date(
																						Number(
																							note.updated_at,
																						),
																					),
																			} as unknown as INotes),
																	)}
																	deleteButton={
																		true
																	}
																	handleDelete={(
																		commentId: number,
																	) => {
																		const temp =
																			() =>
																				deleteToothNote(
																					commentId,
																				);
																		setConfirmFunction(
																			() =>
																				temp,
																		);
																		setIsConfirmOpen(
																			true,
																		);
																	}}
																/>
															</div>
														</div>
													)}
													<div className="flex-[2]">
														{selectedTeethIndex &&
															generalTeethList[
																selectedTeethIndex
															]
																?.patient_tooth_id && (
																<DentoGingivalChart
																	images={
																		toothImages
																	}
																	onToothImageAdded={(
																		images: ICaseImage[],
																	) => {
																		setToothImages(
																			images,
																		);
																	}}
																	toothId={
																		generalTeethList[
																			selectedTeethIndex
																		]
																			?.patient_tooth_id
																	}
																	workspace={
																		workspaceInfo
																	}
																/>
															)}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
					</div>
				</>
			) : (
				<div className="w-full  flex items-center justify-center h-[25rem]">
					<BigSpinner />
				</div>
			)}
		</>
	);
};

export default HFGeneralExamination;
