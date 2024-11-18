import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
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
} from '../../../../services/apiServices';

const Questions = (props) => {
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
      ],
    },
  ]);
  //preview image
  const [isPreview, setIsPreview] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    url: '',
    title: '',
  });

  // save questions
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    fetchQuiz();
  }, []);
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
    }
  };
  console.log('>>>>>List quiz', listQuiz);
  const handleAddRemoveQuestion = (type, id) => {
    console.log(type, id);
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === 'REMOVE') {
      let questionClone = _.cloneDeep(questions);

      questionClone = questionClone.filter((question) => question.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);

    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      };
      // index = answer index
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === 'REMOVE') {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      console.log('check file', event.target.files[0]);
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  //add state to check box and input
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      let answerIndex = questionsClone[index].answers.findIndex(
        (item) => item.id === answerId
      );
      if (answerIndex > -1) {
        if (type === 'CHECKBOX') {
          questionsClone[index].answers[answerIndex].isCorrect = value;
        }
        if (type === 'INPUT') {
          questionsClone[index].answers[answerIndex].description = value;
        }
        setQuestions(questionsClone);
      }
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    console.log('submit', questions);
    //todo
    //validate data

    // submit questions

    await Promise.all(
      questions.map(async (question) => {
        const q = await postCreateNewQuestionForQuiz(
          +selectedQuiz.value,
          question.description,
          question.imageFile
        );
        await Promise.all(
          question.answers.map(async (answer) => {
            await postCreateNewAnswerForQuestion(
              answer.description,
              answer.isCorrect,
              q.DT.id
            );
            console.log(q);
          })
        );
      })
    );

    //submit answers
  };
  //preview image

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setIsPreview(true);
    }
  };
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
            options={listQuiz}
          />
        </div>

        <div className='mt-3 mb-2'> Add questions:</div>
        {/* print each question */}
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
                        handleOnChange(
                          'QUESTION',
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Question {index + 1} 's description </label>
                  </div>
                  <div className='group-upload '>
                    <label htmlFor={`${question.id}`} className='label-upload'>
                      <RiImageAddFill />
                    </label>
                    <input
                      id={`${question.id}`}
                      onChange={(event) =>
                        handleOnChangeFileQuestion(question.id, event)
                      }
                      type={'file'}
                      hidden
                    />
                    <span>
                      {/*  xu ly preview image */}
                      {question.imageName ? (
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => handlePreviewImage(question.id)}
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
                    {questions.length > 1 && (
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
                {/* print each answer */}
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
                            handleAnswerQuestion(
                              'CHECKBOX',
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />

                        <div className='form-floating answer-name'>
                          <input
                            value={answer.description}
                            type='text'
                            className='form-control'
                            placeholder='name@example.com'
                            onChange={(event) =>
                              handleAnswerQuestion(
                                'INPUT',
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Answers {index + 1}</label>
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
          <div className='btn-group'>
            <button
              className='btn btn-warning'
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
        {/* preview image */}
        {isPreview === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreview(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
