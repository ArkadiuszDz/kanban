import { RootStore } from '../root-store';
import { ModalDataStore } from './store';

export const getModalData = (state: RootStore): ModalDataStore['taskItem'] => state.modalData.taskItem;