import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListQuiz = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  //goi 1 lan duy nhat
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();

    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <>
      <div className='list-quiz-container container'>
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((quiz, index) => {
            return (
              <div
                key={`${index}-quiz`}
                className='card'
                style={{ width: '18rem' }}
              >
                <img
                  className='card-img-top'
                  src={`data:image/jpeg;base64,${quiz.image}`}
                  alt='Card image cap'
                />
                <div className='card-body'>
                  <h5 className='card-title'>Quiz {index + 1}</h5>
                  <p className='card-text'>{quiz.description}</p>
                  <button
                    href='#'
                    className='btn btn-primary'
                    onClick={() =>
                      navigate(`/quiz/${quiz.id}`, {
                        state: { quizTitle: quiz.description },
                      })
                    }
                  >
                    {t('quiz.listQuiz.button')}
                  </button>
                </div>
              </div>
            );
          })}

        {arrQuiz && arrQuiz.length === 0 && (
          <div>You don't have any quiz now...</div>
        )}
      </div>
    </>
  );
};

export default ListQuiz;
