import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createPatient,
	getAllPatients,
} from '../../../core/redux/actions/patientActions';
import { AppDispatch, RootState } from '../../../core/redux/store/store';
import { SidebarFullBtn } from '../../../components/shared/form/btn';
import InputField from '../../../components/shared/form/input';
import useCreatePatientFormValidation from '../../../core/utilities/hooks/useCreatePatientFormValidation';
import RadioInput from '../../../components/shared/form/radio';

type HideModalCallback = () => void;

interface IAddPatientProps {
	hideModal: HideModalCallback;
}

const AddPatient = (props: IAddPatientProps) => {
	const { loading } = useSelector((state: RootState) => state.patient);
	const dispatch: AppDispatch = useDispatch();
	const { formErrors, clearState, runValidation } =
		useCreatePatientFormValidation();
	const [firstLoad, setFirstLoad] = useState(true);
	const [requestPatientListRefresh, setRequestPatientListRefresh] =
		useState(false);
	const { workspaceInfo } = useSelector(
		(state: RootState) => state.workspace,
	);
	const workspace_slug = workspaceInfo ? workspaceInfo.slug : '';

	useEffect(() => {
		dispatch(getAllPatients({ workspace: workspace_slug }));
	}, [requestPatientListRefresh]);

	const handleAddPatient = async (
		e: SyntheticEvent,
		fromOnChange?: boolean | false,
	) => {
		if (!fromOnChange) {
			setFirstLoad(false);
			clearState();
		}
		const target = e.target as typeof e.target & {
			firstName?: { value: string };
			lastName?: { value: string };
			age?: { value: number };
			sex?: { value: string };
			contactNumber?: { value: string };
			emergencyContact?: { value: string };
			address?: { value: string };
			value?: string;
			name?: string;
		};

		const targetElement = target as HTMLElement;
		if (!(targetElement.getAttribute('type') === 'radio'))
			e.preventDefault();

		let firstName: string | undefined = target.firstName?.value; // type-checks!
		let lastName: string | undefined = target.lastName?.value; // type-checks!
		let age: number | undefined = target.age?.value; // type-checks!
		let sex: string | undefined = target.sex?.value; // type-checks!
		let contactNumber: string | undefined = target.contactNumber?.value; // type-checks!
		let emergencyContact: string | undefined =
			target.emergencyContact?.value; // type-checks!
		let address: string | undefined = target.address?.value; // type-checks!

		if (fromOnChange) {
			if (firstLoad) return;
			switch (target.name) {
				case 'firstName':
					firstName = target.value;
					runValidation({ firstName });
					break;
				case 'lastName':
					lastName = target.value;
					runValidation({ lastName });
					break;
				case 'age':
					age = target.value ? parseInt(target.value, 10) : 0; // lint fails without radix arg :(
					runValidation({ age });
					break;
				case 'sex':
					sex = target.value;
					runValidation({ sex });
					break;
				case 'contactNumber':
					contactNumber = target.value;
					runValidation({ contactNumber });
					break;
				case 'emergencyContact':
					emergencyContact = target.value;
					runValidation({ emergencyContact });
					break;
				case 'address':
					address = target.value;
					runValidation({ address });
					break;
				default:
					break;
			}
		}

		let numErrors: number;
		if (!fromOnChange) {
			numErrors = runValidation({
				firstName,
				lastName,
				age,
				sex,
				contactNumber,
				emergencyContact,
				address,
			});
		} else {
			return;
		}

		if (numErrors > 0) return;

		if (
			firstName &&
			lastName &&
			age &&
			sex &&
			contactNumber &&
			emergencyContact &&
			address
		) {
			const response = await dispatch(
				createPatient({
					first_name: firstName,
					last_name: lastName,
					age,
					sex,
					contact_number: contactNumber,
					emergency_contact: emergencyContact,
					address,
					workspace_slug,
				}),
			);

			if (!response.type.includes('rejected')) {
				setRequestPatientListRefresh(true);
				props.hideModal();
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleAddPatient(e, true);
	};

	const handleRadioChange = (e: SyntheticEvent) => {
		handleAddPatient(e, true);
	};

	return (
		<div className="max-w-full rounded-tl-3xl overflow-hidden shadow-2xl md:float-right xl:float-right 2xl:float-right sm:m-auto z-50">
			<form
				onSubmit={handleAddPatient}
				className="primary-card-non-rounded bg-white flex flex-col"
				data-testid="form"
			>
				<div className="p-8">
					<h2 className="font-normal leading-10 text-left border-b-saphireLight border-b-2 mb-8 mt-8">
						Add new patient
					</h2>
					<div className="flex items-center flex-wrap w-full gap-2">
						<div className="w-full">
							<InputField
								name={'firstName'}
								type={'text'}
								label={'First Name'}
								errors={formErrors.first_name}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<InputField
								name={'lastName'}
								type={'text'}
								label={'Last Name'}
								errors={formErrors.last_name}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-wrap md:flex-nowrap gap-2">
							<div className="w-full md:w-1/2">
								<InputField
									name={'age'}
									type={'number'}
									label={'Age'}
									errors={formErrors.age}
									onChange={handleChange}
								/>
							</div>
							<div className="w-full md:w-1/2 flex justify-left content-left">
								<RadioInput
									name={'sex'}
									label={'Sex'}
									values={['male', 'female', 'other']}
									displayValues={['M', 'F', 'Other']}
									setValueCallback={handleRadioChange}
									errors={formErrors.sex}
								/>
							</div>
						</div>
						<div className="w-full">
							<InputField
								name={'address'}
								type={'text'}
								label={'Address'}
								errors={formErrors.address}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex gap-2">
							<div className="w-1/2">
								<InputField
									name={'contactNumber'}
									type={'text'}
									label={'Contact No.'}
									errors={formErrors.contact_number}
									onChange={handleChange}
								/>
							</div>
							<div className="w-1/2">
								<InputField
									name={'emergencyContact'}
									type={'text'}
									label={'Emergency Contact No.'}
									errors={formErrors.emergency_contact}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<SidebarFullBtn disabled={loading} type={'submit'}>
					{loading ? 'loading...' : 'SAVE'}
				</SidebarFullBtn>
			</form>
		</div>
	);
};

export default AddPatient;
