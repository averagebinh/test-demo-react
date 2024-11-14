import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalResult = (props) => {
  const { show, setShow, dataModal } = props;
  //   console.log('>>>check dataModalResult: ', dataModal);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Your Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions:<b>{dataModal.countTotal}</b>
          </div>
          <div>
            Total correct answers: <b>{dataModal.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Show answers
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
