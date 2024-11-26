import { useState } from 'react';
import './ManageQuiz.scss';
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
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
  const { t } = useTranslation();

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
      <Tabs
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
        className='mb-3'
        justify
      >
        <Tab
          className='p-3 pt-0'
          eventKey='create quiz'
          title={t('admin.manageQuiz.header-1')}
        >
          <div className='add-new'>
            <fieldset className='border rounded-3 p-3'>
              <legend className='float-none w-auto px-3'>
                {t('admin.manageQuiz.add-new')}
              </legend>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='your quiz name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>{t('admin.manageQuiz.label-1')} </label>
              </div>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='your description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>{t('admin.manageQuiz.label-2')}</label>
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
                <label className='mb-1'>{t('admin.manageQuiz.upload')}</label>
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
                  {t('admin.manageQuiz.button')}
                </button>
              </div>
            </fieldset>
          </div>
          <div className='list-detail'>
            <TableQuiz />
          </div>
        </Tab>
        <Tab
          className='p-3 pt-0'
          eventKey='update quiz'
          title={t('admin.manageQuiz.header-2')}
        >
          <QuizQA />
        </Tab>
        <Tab
          className='p-3 pt-0'
          eventKey='assign quiz'
          title={t('admin.manageQuiz.header-3')}
        >
          <AssignQuiz />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ManageQuiz;
