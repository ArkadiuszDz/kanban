import { RootStore } from '../root-store';
import { BoardDataStore } from './store';

export const getColumnsData = (state: RootStore): BoardDataStore['columns'] => state.boardData.columns;
export const getTasksData = (state: RootStore): BoardDataStore['tasks'] => state.boardData.tasks;