import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';
const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDeleteQuiz } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    console.log('dataDeleteQuiz', dataDeleteQuiz, dataDeleteQuiz.id);
    let data = await deleteQuiz(dataDeleteQuiz.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();

      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz. id:
          <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ''}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
