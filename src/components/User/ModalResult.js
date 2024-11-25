import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalResult = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataModal } = props;
  //   console.log('>>>check dataModalResult: ', dataModal);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>{t('quiz.modalResult.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t('quiz.modalResult.body.question')}
            <b>{dataModal.countTotal}</b>
          </div>
          <div>
            {t('quiz.modalResult.body.correctAnswer')}{' '}
            <b>{dataModal.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            {t('quiz.modalResult.buttons.show')}
          </Button>
          <Button variant='primary' onClick={handleClose}>
            {t('quiz.modalResult.buttons.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
