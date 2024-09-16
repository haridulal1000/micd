import React from 'react';
import { IGetAllWorkspacesResponse } from '../../../core/interfaces/workspace.interface';
import WorkspaceCard, { WorkspaceEmptyCard } from '../workspaceCard';

interface IListWorkspaceProps {
	allWorkspaces: IGetAllWorkspacesResponse[];
	handleToggleWorkspaceModal?: () => void;
}

const ListWorkspace = (props: IListWorkspaceProps) => (
	<>
		{props.allWorkspaces.length > 0 ? (
			<div className="flex flex-wrap gap-5 pt-2">
				{props.allWorkspaces.map((workspace, index) => (
					<WorkspaceCard workspace={workspace} key={index} />
				))}
			</div>
		) : (
			<div>
				<WorkspaceEmptyCard
					handleToggleWorkspaceModal={
						props.handleToggleWorkspaceModal
					}
				/>
			</div>
		)}
	</>
);

export default ListWorkspace;
