import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';
const DetailQuiz = (props) => {
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
            answers.push(item.answers);
          });
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
        setDataModal({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowResult(true);
      } else {
        alert('Submit quiz failed');
      }
    }
  };

  return (
    <div className='detail-quiz-container'>
      <div className='left-content'>
        <div className='title'>
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className='q-body'>
          <img src='' alt='' />
        </div>
        {/* child componet */}
        <div className='q-content'>
          <Question
            index={index}
            handleAnswerSelection={handleAnswerSelection}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>

        <div className='footer'>
          <button className='btn btn-secondary' onClick={() => handlePrev()}>
            Prev
          </button>

          <button className='btn btn-primary' onClick={() => handleNext()}>
            Next
          </button>
          <button
            className='btn btn-warning'
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className='right-content'>
        <RightContent dataQuiz={dataQuiz} />
      </div>
      <ModalResult
        show={isShowResult}
        setShow={setIsShowResult}
        dataModal={dataModal}
      />
    </div>
  );
};

export default DetailQuiz;
