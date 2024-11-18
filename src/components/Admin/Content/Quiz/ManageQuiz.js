import './ManageQuiz.scss';
import { useState } from 'react';
import Select from 'react-select';
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quizType, setQuizType] = useState('EASY');
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {
    if (event.target.files.length !== 0) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error('Name and description are required');
      return;
    }
    let res = await postCreateNewQuiz(description, name, quizType.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName('');
      setDescription('');
      setQuizType('EASY');
      setImage(null);
      await getAllQuizForAdmin();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className='quiz-container'>
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className='add-new'>
              <fieldset className='border rounded-3 p-3'>
                <legend className='float-none w-auto px-3'>
                  Add New Quiz:
                </legend>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='your quiz name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name </label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='your description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className='my-3'>
                  <Select
                    defaultValue={quizType}
                    onChange={setQuizType}
                    options={options}
                    placeholder={'Quiz type...'}
                  />
                </div>
                <div className='more-action form-group '>
                  <label className='mb-1'>Upload Image</label>
                  <input
                    type='file'
                    className='form-control'
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>

                <div className='mt-3'>
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className='btn btn-warning'
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className='list-detail'>
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* item2  */}
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey='2'>
          <Accordion.Header>Assign to Users </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
