import React from 'react';
import CreateWorkspaceForm from '../createWorkspaceForm';
import Header from '../../../components/header';

const CreateWorkspace = () => (
	<>
		<div className="bg-cover w-full pt-0 relative min-h-screen">
			<img
				src="/register-bg.svg"
				alt=""
				className="absolute z-[1] w-1/2"
			/>
			<img
				src="/register-bg-2.svg"
				alt=""
				className="absolute right-0 bottom-0 z-[1] w-1/2"
			/>
			<div className="p-12 pt-0">
				<Header withLogin={true} />
				<div className="flex sm:w-full  md:w-full lg:w-1/2 m-auto">
					<CreateWorkspaceForm
						handleHideCreateWorkspace={() => {
							/* implementation not needed */
						}}
					/>
				</div>
				<div className="h-14"></div>
			</div>
		</div>
	</>
);

export default CreateWorkspace;
