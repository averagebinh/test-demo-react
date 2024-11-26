import _ from 'lodash';
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import { useTranslation } from 'react-i18next';
import { IoIosClose, IoIosCheckmark } from 'react-icons/io';

const Question = (props) => {
  const { t } = useTranslation();
  const { data, index, isShowAnswer } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) return <></>;

  //id answer-question-id aId, qId
  // let parent process data
  const handleCheckbox = (e, aId, qId) => {
    props.handleAnswerSelection(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className='q-image'>
          <img
            style={{ cursor: 'pointer' }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt=''
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={'Question Image'}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className='q-image'></div>
      )}
      <div className='question'>
        {t('quiz.detailQuiz.question')} {index + 1}: {data.questionDescription}?
      </div>
      <div className='answer'>
        {data.answers &&
          data.answers.length &&
          data.answers.map((answer, i) => {
            return (
              <div key={`${i}-answer`} className='a-child'>
                <div className='form-check'>
                  <input
                    id={`${index}-${i}`}
                    className='form-check-input'
                    type='checkbox'
                    checked={answer.isSelected}
                    disabled={props.isSubmitQuiz}
                    onChange={(e) =>
                      handleCheckbox(e, answer.id, data.questionId)
                    }
                  />
                  <label htmlFor={`${index}-${i}`} className='form-check-label'>
                    {answer.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {answer.isSelected && !answer.isCorrect && (
                        <IoIosClose className='incorrect' />
                      )}

                      {answer.isCorrect === true && (
                        <IoIosCheckmark className='correct' />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
