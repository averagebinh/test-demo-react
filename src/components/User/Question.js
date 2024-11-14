import _ from 'lodash';
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) return <></>;

  //id answer-question-id aId, qId
  // let parent process data
  const handleCheckbox = (e, aId, qId) => {
    console.log('data props', aId, qId);
    props.handleAnswerSelection(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className='q-image'>
          <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
        </div>
      ) : (
        <div className='q-image'></div>
      )}
      <div className='question'>
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className='answer'>
        {data.answers &&
          data.answers.length &&
          data.answers.map((answer, index) => {
            return (
              <div key={`${index}-answer`} className='a-child'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={answer.isSelected}
                    onChange={(e) =>
                      handleCheckbox(e, answer.id, data.questionId)
                    }
                  />
                  <label className='form-check-label'>
                    {answer.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
