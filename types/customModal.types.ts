/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

//Modal views type
export type TModalView =
  | 'DELETE_CONFIRM'
  | 'SUSPEND_USER'
  | 'NEW_ALERT'
  | 'EDIT_ALERT'
  | 'USER_PROFILE_DETAILS'
  | 'USER_EDIT_PLAN'
  | 'ADD_FEATURE_FORM'
  | 'TICKET_DETAILS'
  | 'CREATE_TICKET'
  | 'SEND_MESSAGE'
  | 'INVITE_MEMBER'
  | 'Tag_Manage_Form'
  | 'ContentType_Manage_Form'
  | 'Content_Category_Manage_Form'
  | 'Sync_Form'
  | 'Content_Watch_Now'
  | 'USER_ENGAGEMENT_TRAIL'
  | 'NONE';

//Open Modal Props
export interface IOpenModalProps {
  view: TModalView;
  data?: any;
  title?: string;
  description?: string;
}

//Modal state interface
export interface IModalState {
  isOpen: boolean;
  view: TModalView;
  data: any;
  title: string;
  description: string;
}

//Action types
export type TModalAction =
  | {
      type: 'OPEN_MODAL';
      payload: IOpenModalProps;
    }
  | { type: 'CLOSE_MODAL' };

export interface IModalContextType extends IModalState {
  openModal: (props: IOpenModalProps) => void;
  closeModal: () => void;
}
