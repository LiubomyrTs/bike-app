import { MODAL_MODE } from '../enums/modalMode';
import { Modal } from './modal';

export interface ModalWithModes extends Modal {
  modalMode: MODAL_MODE;
  switchMode: () => void;
}