import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dog from '../../../assets/dog.jpg';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
const ModalCreateUser = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setRole('USER');
    setImage('');
    setPreviewImage('');
  };
  const handleShow = () => {
    setShow(true);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('USER');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleUploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      console.log('Umage');
    }
  };
  // const handleSubmitCreateUser = async () => {
  //   //validate
  //   //call api
  //   // let data = {
  //   //   email: email,
  //   //   password: password,
  //   //   username: username,
  //   //   role: role,
  //   //   userImage: image,
  //   // };
  //   // console.log(data);
  //   const data = new FormData();
  //   data.append('email', email);
  //   data.append('password', password);
  //   data.append('username', username);
  //   data.append('role', role);
  //   data.append('userImage', image);

  //   let res = await axios.post(
  //     'http://localhost:8080/api/v1/participant',
  //     data
  //   );
  //   console.log('>>>>check res', res);
  // };
  const handleSubmitCreateUser = async () => {
    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('username', username);
      data.append('role', role);
      data.append('userImage', image);

      const res = await axios.post(
        'http://localhost:8081/api/v1/participant',
        data
      );
      console.log('Response:', res);

      // Optionally close the modal and reset form after successful submission
      setShow(false);
      setEmail('');
      setPassword('');
      setUsername('');
      setRole('USER');
      setImage('');
      setPreviewImage('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('There was an error creating the user. Please try again.');
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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>Role</label>

              <select
                className='form-select'
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
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
          <Button variant='primary' onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
