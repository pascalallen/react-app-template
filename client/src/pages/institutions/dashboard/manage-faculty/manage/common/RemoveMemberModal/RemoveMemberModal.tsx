import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Modal } from 'react-bootstrap';
import { State as UiState } from '@/redux/ui/uiReducer';
import { RootState } from '@/types/redux';

type Props = {
  ui: UiState;
  show: boolean;
  onRemove: () => Promise<void>;
  isRemoving: boolean;
  onClose: () => void;
};

const RemoveMemberModal = (props: Props) => {
  const { ui, show, onRemove, isRemoving, onClose } = props;

  return (
    <Modal
      className={classnames(
        'delete-member-modal',
        ui.showSideMenu ? 'delete-member-modal-side-menu-open' : '',
        'd-flex',
        'justify-content-center',
        'align-items-center'
      )}
      show={show}
      onHide={onClose}>
      <Modal.Body className="text-center d-flex flex-column align-items-center">
        <p className="modal-body-caption font-size-sm">Are you sure you want to remove this team member?</p>
        <button
          id="delete-member-modal-remove-button"
          type="button"
          className="delete-member-modal-remove-button btn btn-primary font-size-sm font-weight-bold"
          disabled={isRemoving}
          onClick={onRemove}>
          Remove
        </button>
        <button type="button" className="btn btn-link text-primary p-0" onClick={onClose}>
          Cancel
        </button>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state: RootState) => ({
  ui: state.ui
});

export default connect(mapStateToProps)(RemoveMemberModal);
