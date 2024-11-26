import { useEffect, useState } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'react-bootstrap';

const DetailQuiz = (props) => {
  const { t } = useTranslation();

  const params = useParams();

  const location = useLocation();

  const quizId = params.id;
  //state data
  const [dataQuiz, setDataQuiz] = useState([]);
  //which question is being displayed
  const [index, setIndex] = useState(0);
  //next index + 1, prev index - 1

  const [isShowResult, setIsShowResult] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  //get data quiz, parent component hold state data, later pass to child component (each question)
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  //clean data quiz
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);

    if (res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy('id')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            // get question description and image from the first element
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            // add isSelected prop to each answer and push to answers array
            item.answers.isSelected = false;
            item.answers.isCorrect = false;

            answers.push(item.answers);
          });
          //lodash order id in ascending
          answers = _.orderBy(answers, ['id'], ['asc']);
          // console.log('value', value, 'key', key);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
      // console.log('data', data);
    }
  };

  const handlePrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (index === dataQuiz.length - 1) return;
    setIndex(index + 1);
  };

  // update state id selected
  const handleAnswerSelection = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); //react hook does not allow to mutate state directly
    let question = dataQuizClone.find(
      //find question by id from child component
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      //find answer by id from child component
      question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected; //toggle isSelected
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    ); //find index of question
    if (index > -1) {
      dataQuizClone[index] = question; //update question
      console.log(dataQuizClone);
      setDataQuiz(dataQuizClone); //update state
    }
  };

  const handleFinishQuiz = async () => {
    console.log('>>>check data before submit: ', dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        //get questionID and answerID
        let questionId = +item.questionId;
        let userAnswerId = [];

        //todo: userAnswerId
        item.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(+answer.id);
          }
        });
        answers.push({ questionId, userAnswerId });
      });
      payload.answers = answers;
      //submit api
      let res = await postSubmitQuiz(payload);
      console.log('>>>check res: ', res);
      if (res.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModal({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowResult(true);
      }

      //update DataQuiz with correct answer
      if (res.DT && res.DT.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let quizData = res.DT.quizData;

        for (let q of quizData) {
          // Find the matching question in dataQuizClone
          let question = dataQuizClone.find(
            (item) => +item.questionId === +q.questionId
          );

          if (question) {
            // Update the answers for the matching question
            for (let answer of question.answers) {
              // Check if the current answer matches a correct system answer
              let correctAnswer = q.systemAnswers.find(
                (systemAnswer) => +systemAnswer.id === +answer.id
              );

              if (correctAnswer) {
                answer.isCorrect = true; // Mark as correct if it matches
              }
            }
          }
        }
        setDataQuiz(dataQuizClone);
      } else {
        alert('Submit quiz failed');
      }
    }
  };
  const handleShowAnswer = () => {
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
  };
  return (
    <>
      <Breadcrumb className='quiz-detail-new-header'>
        <NavLink to='/' className='breadcrumb-item'>
          {t('header.home')}
        </NavLink>

        <NavLink to='/users' className='breadcrumb-item'>
          {t('header.user')}
        </NavLink>

        <Breadcrumb.Item active> {t('header.quiz')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='detail-quiz-container'>
        <div className='left-content'>
          <div className='title'>
            {t('quiz.detailQuiz.title')} {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className='q-body'>
            <img src='' alt='' />
          </div>
          {/* child componet */}
          <div className='q-content'>
            <Question
              index={index}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
              handleAnswerSelection={handleAnswerSelection}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>

          <div className='footer'>
            <button className='btn btn-secondary' onClick={() => handlePrev()}>
              {t('quiz.detailQuiz.buttons.previous')}
            </button>

            <button className='btn btn-primary' onClick={() => handleNext()}>
              {t('quiz.detailQuiz.buttons.next')}
            </button>
            <button
              disabled={isSubmitQuiz}
              className='btn btn-warning'
              onClick={() => handleFinishQuiz()}
            >
              {t('quiz.detailQuiz.buttons.submit')}
            </button>
          </div>
        </div>
        <div className='right-content'>
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
          />
        </div>

        <ModalResult
          show={isShowResult}
          setShow={setIsShowResult}
          dataModal={dataModal}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
