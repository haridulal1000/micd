import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseStage } from '../../services/case-service';

export interface UIState {
	currentStage: CaseStage;
	selectedImageId: number;
}

const initialState: UIState = {
	currentStage: CaseStage.DOCUMENT,
	selectedImageId: 0,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setCurrentStage: (
			state: UIState,
			action: PayloadAction<{ stage: CaseStage }>,
		) => {
			state.currentStage = action.payload.stage;
		},
		setSelectedImageId: (
			state: UIState,
			action: PayloadAction<{ id: number }>,
		) => {
			state.selectedImageId = action.payload.id;
		},
	},
});

export const UIActions = uiSlice.actions;

export default uiSlice.reducer;
