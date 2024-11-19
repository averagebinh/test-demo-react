import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai';

import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
const Questions = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  // Fake data
  const [questions, setQuestions] = useState([
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
  ]);

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

  const handleOnchange = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      if (type === 'QUESTION') {
        questionsClone[index].description = value;
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

  const handleSubmitQuestionForQuiz = () => {
    console.log('questions ', questions);
  };

  console.log('qustions ', questions);

  return (
    <div className='questions-container'>
      <div className='title'>Manage Questions</div>
      <hr />

      <div className='add-new-question'>
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
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
                        handleOnchange(
                          'QUESTION',
                          question.id,
                          event.target.value
                        )
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
                      {question.imageName
                        ? question.imageName
                        : '0 file is uploaded'}
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
                            handleOnchange(
                              'CHECKBOX',
                              question.id,
                              answer.id,
                              event.target.checked
                            )
                          }
                        />

                        <div className='form-floating answer-name'>
                          <input
                            value={answer.description}
                            onChange={(event) =>
                              handleOnchange(
                                'ANSWER',
                                question.id,
                                answer.id,
                                event.target.value
                              )
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
      </div>
    </div>
  );
};

export default Questions;
