import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';

import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../services/apiServices';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdateQuiz, setDataUpdateQuiz } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      //update state
      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setDifficulty(dataUpdateQuiz.difficulty);
      dataUpdateQuiz.image &&
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
    }
  }, [dataUpdateQuiz]);

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setDifficulty('');
    setImage('');
    setPreviewImage('');
    setDataUpdateQuiz({});
  };

  const handleUploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    // validate;
    if (!name) {
      toast.error('Invalid name');
      return;
    }

    if (!description) {
      toast.error('Invalid description');
      return;
    }

    let data = await putUpdateQuiz(
      dataUpdateQuiz.id,
      description,
      name,
      difficulty,
      image
    );
    //EM err message

    if (data && data.EC === 0) {
      toast.success(data.EM);

      await props.fetchQuiz();
      handleClose();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Name</label>
              <input
                type='text'
                className='form-control'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>description</label>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className='col-md-4'>
              <label className='form-label'>Difficulty</label>

              <select
                className='form-select'
                onChange={(event) => setDifficulty(event.target.value)}
                value={difficulty}
              >
                <option value='EASY'>EASY</option>
                <option value='MEDIUM'>MEDIUM</option>
                <option value='HARD'>HARD</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus />
                Upload File Image
              </label>
              <input
                type='file'
                className='form-control'
                id='labelUpload'
                onChange={(event) => handleUploadImage(event)}
                hidden
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span className=''>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
