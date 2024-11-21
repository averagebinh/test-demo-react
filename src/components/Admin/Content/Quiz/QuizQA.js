import { useEffect, useState } from 'react';

import Select from 'react-select';
import './QuizQA.scss';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getQuizQA,
} from '../../../../services/apiServices';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
  // Fake data
  const initQuestions = [
    {
      id: uuidv4(),
      description: '',
      imageName: '',
      imageFile: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const [dataImagePreview, setdataImagePreview] = useState({
    title: '',
    url: '',
  });
  // get all quiz
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQa();
    }
  }, [selectedQuiz]);

  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith('data:')) {
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);

      // console.log('List quiz', res.DT);
    }
  };
  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith('data:')) {
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQa = async () => {
    let res = await getQuizQA(+selectedQuiz.value);
    if (res && res.EC === 0) {
      //convert string 64 to blob
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            'text/plain'
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    console.log('>>>check: ', type, id);
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        image: '',
        imageFile: '',
        answers: [
          {
            id: uuidv4(),
            description: ' ',
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions);

      questionsClone = questionsClone.filter((question) => question.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    console.log('check answer ', type, questionId, answerId);
    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === 'REMOVE') {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnchange = ({ type, questionId, answerId, value }) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      if (type === 'QUESTION') {
        questionsClone[index].description = value || '';
      } else if (type === 'ANSWER') {
        let answerIndex = questionsClone[index].answers.findIndex(
          (item) => item.id === answerId
        );
        if (answerIndex > -1) {
          questionsClone[index].answers[answerIndex].description = value;
        }
      } else if (type === 'CHECKBOX') {
        let answerIndex = questionsClone[index].answers.findIndex(
          (item) => item.id === answerId
        );
        if (answerIndex > -1) {
          questionsClone[index].answers[answerIndex].isCorrect = value;
        }
      }
      setQuestions(questionsClone);
      console.log(questions);
    }
  };

  const handleOnchangeFile = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index !== -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);

    const currentImageIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (currentImageIndex > -1) {
      setdataImagePreview({
        title: questionsClone[currentImageIndex].imageName,
        url: URL.createObjectURL(questionsClone[currentImageIndex].imageFile),
      });
      setIsPreviewImage(true);
    }
    setQuestions(questionsClone);
  };

  const handleSubmitQuestionForQuiz = async () => {
    console.log('questions ', questions, selectedQuiz);
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please select a quiz!');
      return;
    }
    //validate answer
    for (const question of questions) {
      for (const answer of question.answers) {
        if (!answer.description.trim()) {
          toast.error('answer description cant be empty');
          return;
        }
      }
    }

    //validate questions
    for (const question of questions) {
      if (!question.description.trim()) {
        toast.error('question description cant be empty');
        return;
      }
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success('Create QA succeed!');
    setQuestions(initQuestions);
  };
  console.log('>>check questions', questions);
  return (
    <div className='questions-container'>
      <div className='add-new-question'>
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>

        <div className='mt-3 mb-2'> Add questions:</div>
        {/* create QA form fake data */}
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className='q-main mb-4'>
                <div className='questions-content'>
                  <div className='form-floating description'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='name@example.com'
                      value={question.description}
                      onChange={(event) =>
                        handleOnchange({
                          type: 'QUESTION',
                          questionId: question.id,
                          answerId: null,
                          value: event.target.value,
                        })
                      }
                    />
                    <label>Question {index + 1}'s description </label>
                  </div>
                  <div className='group-upload '>
                    <label htmlFor={`${question.id}`} className='label-upload'>
                      <RiImageAddFill />
                    </label>
                    <input
                      id={`${question.id}`}
                      onChange={(event) =>
                        handleOnchangeFile(question.id, event)
                      }
                      type={'file'}
                      hidden
                    />

                    <span>
                      {question.imageName ? (
                        <span
                          onClick={() => handlePreviewImage(question.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        '0 file is uploaded'
                      )}
                    </span>
                  </div>
                  <div className='btn-add'>
                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                      <BsFillPatchPlusFill className='icon-add' />
                    </span>
                    {questions && questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion('REMOVE', question.id)
                        }
                      >
                        <BsFillPatchMinusFill className='icon-remove' />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className='answers-content'>
                        <input
                          className='form-check-input isCorrect'
                          type='checkbox'
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleOnchange({
                              type: 'CHECKBOX',
                              questionId: question.id,
                              answerId: answer.id,
                              value: event.target.checked,
                            })
                          }
                        />

                        <div className='form-floating answer-name'>
                          <input
                            value={answer.description}
                            onChange={(event) =>
                              handleOnchange({
                                type: 'ANSWER',
                                questionId: question.id,
                                answerId: answer.id,
                                value: event.target.value,
                              })
                            }
                            type='text'
                            className='form-control'
                            placeholder='name@example.com'
                          />
                          <label>answers {index + 1}</label>
                        </div>
                        <div className='btn-group'>
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer('ADD', question.id)
                            }
                          >
                            <AiFillPlusSquare className='icon-add' />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  'REMOVE',
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-warning'
            >
              Save Questions
            </button>
          </div>
        )}

        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
