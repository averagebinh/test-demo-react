import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss';
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const quizId = params.id;
  //get data quiz
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  //clean data quiz
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log('check questions', res);
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
            answers.push(item.answers);
          });
          // console.log('value', value, 'key', key);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      // console.log('data', data);
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

        <div className='q-content'>
          <div className='question'>Question 1: How are you doing?</div>
          <div className='answer'>
            <div className='a-child'>A.Asfsda</div>
            <div className='a-child'>B.Asfsda</div>
            <div className='a-child'>C.Asfsda</div>
          </div>
        </div>
        <div className='footer'>
          <button className='btn btn-secondary'>Prev</button>

          <button className='btn btn-primary'>Next</button>
        </div>
      </div>
      <div className='right-content'>Count down</div>
    </div>
  );
};

export default DetailQuiz;
